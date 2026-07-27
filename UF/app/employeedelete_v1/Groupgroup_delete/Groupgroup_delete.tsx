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
import Dividerdivider_s  from "./Dividerdivider_s";
import Textemployee_code_text  from "./Textemployee_code_text";
import Textemployee_code  from "./Textemployee_code";
import Textfull_name_text  from "./Textfull_name_text";
import Textfull_name  from "./Textfull_name";
import Textwork_email_text  from "./Textwork_email_text";
import Textwork_email  from "./Textwork_email";
import Textemployment_type_text  from "./Textemployment_type_text";
import Textemployment_type  from "./Textemployment_type";
import Textemployee_status_text  from "./Textemployee_status_text";
import Textemployee_status  from "./Textemployee_status";
import Textconfo_text  from "./Textconfo_text";
import Dividerdivider  from "./Dividerdivider";
import Buttoncancel_button  from "./Buttoncancel_button";
import Buttonok_button  from "./Buttonok_button";
import Textemployee_id  from "./Textemployee_id";
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
  const {dfd_employees_v1Props, setdfd_employees_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "delete_heading_text",
      "divider_s",
      "employee_code_text",
      "employee_code",
      "full_name_text",
      "full_name",
      "work_email_text",
      "work_email",
      "employment_type_text",
      "employment_type",
      "employee_status_text",
      "employee_status",
      "confo_text",
      "divider",
      "cancel_button",
      "ok_button",
      "employee_id"
    ],
    "allowedGroups": [
      "canvas",
      "group_delete"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "HR Manager": {
    "allowedControls": [
      "delete_heading_text",
      "divider_s",
      "employee_code_text",
      "employee_code",
      "full_name_text",
      "full_name",
      "work_email_text",
      "work_email",
      "employment_type_text",
      "employment_type",
      "employee_status_text",
      "employee_status",
      "confo_text",
      "divider",
      "cancel_button",
      "ok_button",
      "employee_id"
    ],
    "allowedGroups": [
      "canvas",
      "group_delete"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Info Security Officer": {
    "allowedControls": [
      "delete_heading_text",
      "divider_s",
      "employee_code_text",
      "employee_code",
      "full_name_text",
      "full_name",
      "work_email_text",
      "work_email",
      "employment_type_text",
      "employment_type",
      "employee_status_text",
      "employee_status",
      "confo_text",
      "divider",
      "cancel_button",
      "ok_button",
      "employee_id"
    ],
    "allowedGroups": [
      "canvas",
      "group_delete"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Employee": {
    "allowedControls": [
      "delete_heading_text",
      "divider_s",
      "employee_code_text",
      "employee_code",
      "full_name_text",
      "full_name",
      "work_email_text",
      "work_email",
      "employment_type_text",
      "employment_type",
      "employee_status_text",
      "employee_status",
      "confo_text",
      "divider",
      "cancel_button",
      "ok_button",
      "employee_id"
    ],
    "allowedGroups": [
      "canvas",
      "group_delete"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "IT Manager": {
    "allowedControls": [
      "delete_heading_text",
      "divider_s",
      "employee_code_text",
      "employee_code",
      "full_name_text",
      "full_name",
      "work_email_text",
      "work_email",
      "employment_type_text",
      "employment_type",
      "employee_status_text",
      "employee_status",
      "confo_text",
      "divider",
      "cancel_button",
      "ok_button",
      "employee_id"
    ],
    "allowedGroups": [
      "canvas",
      "group_delete"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operation Staff": {
    "allowedControls": [
      "delete_heading_text",
      "divider_s",
      "employee_code_text",
      "employee_code",
      "full_name_text",
      "full_name",
      "work_email_text",
      "work_email",
      "employment_type_text",
      "employment_type",
      "employee_status_text",
      "employee_status",
      "confo_text",
      "divider",
      "cancel_button",
      "ok_button",
      "employee_id"
    ],
    "allowedGroups": [
      "canvas",
      "group_delete"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "delete_heading_text",
      "divider_s",
      "employee_code_text",
      "employee_code",
      "full_name_text",
      "full_name",
      "work_email_text",
      "work_email",
      "employment_type_text",
      "employment_type",
      "employee_status_text",
      "employee_status",
      "confo_text",
      "divider",
      "cancel_button",
      "ok_button",
      "employee_id"
    ],
    "allowedGroups": [
      "canvas",
      "group_delete"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operation Manager": {
    "allowedControls": [
      "delete_heading_text",
      "divider_s",
      "employee_code_text",
      "employee_code",
      "full_name_text",
      "full_name",
      "work_email_text",
      "work_email",
      "employment_type_text",
      "employment_type",
      "employee_status_text",
      "employee_status",
      "confo_text",
      "divider",
      "cancel_button",
      "ok_button",
      "employee_id"
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
  const {group_delete68104, setgroup_delete68104}= useContext(TotalContext) as TotalContextProps;
  const {group_delete68104Props, setgroup_delete68104Props}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_textf472f, setdelete_heading_textf472f}= useContext(TotalContext) as TotalContextProps;
  const {divider_se84d1, setdivider_se84d1}= useContext(TotalContext) as TotalContextProps;
  const {employee_code_textd7eed, setemployee_code_textd7eed}= useContext(TotalContext) as TotalContextProps;
  const {employee_code89740, setemployee_code89740}= useContext(TotalContext) as TotalContextProps;
  const {full_name_text4a492, setfull_name_text4a492}= useContext(TotalContext) as TotalContextProps;
  const {full_name89c4f, setfull_name89c4f}= useContext(TotalContext) as TotalContextProps;
  const {work_email_text10688, setwork_email_text10688}= useContext(TotalContext) as TotalContextProps;
  const {work_email16f90, setwork_email16f90}= useContext(TotalContext) as TotalContextProps;
  const {employment_type_textc33f9, setemployment_type_textc33f9}= useContext(TotalContext) as TotalContextProps;
  const {employment_type48765, setemployment_type48765}= useContext(TotalContext) as TotalContextProps;
  const {employee_status_textef64f, setemployee_status_textef64f}= useContext(TotalContext) as TotalContextProps;
  const {employee_status8c982, setemployee_status8c982}= useContext(TotalContext) as TotalContextProps;
  const {confo_text730b1, setconfo_text730b1}= useContext(TotalContext) as TotalContextProps;
  const {divider0b449, setdivider0b449}= useContext(TotalContext) as TotalContextProps;
  const {cancel_buttonccddf, setcancel_buttonccddf}= useContext(TotalContext) as TotalContextProps;
  const {ok_button3d34b, setok_button3d34b}= useContext(TotalContext) as TotalContextProps;
  const {employee_id7e621, setemployee_id7e621}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {employeedelete_v1, setemployeedelete_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:employeeDelete:AFVK:v1',
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "0ec1c18b873f7c0c40220bce6a068104");
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
    setgroup_delete68104Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("delete_heading_text")){
        setdelete_heading_textf472f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(delete_heading_textf472f?.isDisabled==null)
      {
        setdelete_heading_textf472f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("divider_s")){
        setdivider_se84d1((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(divider_se84d1?.isDisabled==null)
      {
        setdivider_se84d1((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("employee_code_text")){
        setemployee_code_textd7eed((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(employee_code_textd7eed?.isDisabled==null)
      {
        setemployee_code_textd7eed((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("employee_code")){
        setemployee_code89740((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(employee_code89740?.isDisabled==null)
      {
        setemployee_code89740((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("full_name_text")){
        setfull_name_text4a492((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(full_name_text4a492?.isDisabled==null)
      {
        setfull_name_text4a492((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("full_name")){
        setfull_name89c4f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(full_name89c4f?.isDisabled==null)
      {
        setfull_name89c4f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("work_email_text")){
        setwork_email_text10688((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(work_email_text10688?.isDisabled==null)
      {
        setwork_email_text10688((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("work_email")){
        setwork_email16f90((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(work_email16f90?.isDisabled==null)
      {
        setwork_email16f90((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("employment_type_text")){
        setemployment_type_textc33f9((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(employment_type_textc33f9?.isDisabled==null)
      {
        setemployment_type_textc33f9((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("employment_type")){
        setemployment_type48765((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(employment_type48765?.isDisabled==null)
      {
        setemployment_type48765((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("employee_status_text")){
        setemployee_status_textef64f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(employee_status_textef64f?.isDisabled==null)
      {
        setemployee_status_textef64f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("employee_status")){
        setemployee_status8c982((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(employee_status8c982?.isDisabled==null)
      {
        setemployee_status8c982((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("confo_text")){
        setconfo_text730b1((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(confo_text730b1?.isDisabled==null)
      {
        setconfo_text730b1((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("divider")){
        setdivider0b449((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(divider0b449?.isDisabled==null)
      {
        setdivider0b449((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cancel_button")){
        setcancel_buttonccddf((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(cancel_buttonccddf?.isDisabled==null)
      {
        setcancel_buttonccddf((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("ok_button")){
        setok_button3d34b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(ok_button3d34b?.isDisabled==null)
      {
        setok_button3d34b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("employee_id")){
        setemployee_id7e621((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(employee_id7e621?.isDisabled==null)
      {
        setemployee_id7e621((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['group_delete'] = group_delete68104,
        codeStates['setgroup_delete'] = setgroup_delete68104,
        codeStates['group_delete68104'] = group_delete68104Props,
        codeStates['setgroup_delete68104'] = setgroup_delete68104Props,
        codeStates['delete_heading_text'] = delete_heading_textf472f,
        codeStates['setdelete_heading_text'] = setdelete_heading_textf472f,
        codeStates['divider_s'] = divider_se84d1,
        codeStates['setdivider_s'] = setdivider_se84d1,
        codeStates['employee_code_text'] = employee_code_textd7eed,
        codeStates['setemployee_code_text'] = setemployee_code_textd7eed,
        codeStates['employee_code'] = employee_code89740,
        codeStates['setemployee_code'] = setemployee_code89740,
        codeStates['full_name_text'] = full_name_text4a492,
        codeStates['setfull_name_text'] = setfull_name_text4a492,
        codeStates['full_name'] = full_name89c4f,
        codeStates['setfull_name'] = setfull_name89c4f,
        codeStates['work_email_text'] = work_email_text10688,
        codeStates['setwork_email_text'] = setwork_email_text10688,
        codeStates['work_email'] = work_email16f90,
        codeStates['setwork_email'] = setwork_email16f90,
        codeStates['employment_type_text'] = employment_type_textc33f9,
        codeStates['setemployment_type_text'] = setemployment_type_textc33f9,
        codeStates['employment_type'] = employment_type48765,
        codeStates['setemployment_type'] = setemployment_type48765,
        codeStates['employee_status_text'] = employee_status_textef64f,
        codeStates['setemployee_status_text'] = setemployee_status_textef64f,
        codeStates['employee_status'] = employee_status8c982,
        codeStates['setemployee_status'] = setemployee_status8c982,
        codeStates['confo_text'] = confo_text730b1,
        codeStates['setconfo_text'] = setconfo_text730b1,
        codeStates['divider'] = divider0b449,
        codeStates['setdivider'] = setdivider0b449,
        codeStates['cancel_button'] = cancel_buttonccddf,
        codeStates['setcancel_button'] = setcancel_buttonccddf,
        codeStates['ok_button'] = ok_button3d34b,
        codeStates['setok_button'] = setok_button3d34b,
        codeStates['employee_id'] = employee_id7e621,
        codeStates['setemployee_id'] = setemployee_id7e621,

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
        codeStates['group_delete'] = group_delete68104,
        codeStates['setgroup_delete'] = setgroup_delete68104,
        codeStates['group_delete68104'] = group_delete68104Props,
        codeStates['setgroup_delete68104'] = setgroup_delete68104Props,
        codeStates['delete_heading_text'] = delete_heading_textf472f,
        codeStates['setdelete_heading_text'] = setdelete_heading_textf472f,
        codeStates['divider_s'] = divider_se84d1,
        codeStates['setdivider_s'] = setdivider_se84d1,
        codeStates['employee_code_text'] = employee_code_textd7eed,
        codeStates['setemployee_code_text'] = setemployee_code_textd7eed,
        codeStates['employee_code'] = employee_code89740,
        codeStates['setemployee_code'] = setemployee_code89740,
        codeStates['full_name_text'] = full_name_text4a492,
        codeStates['setfull_name_text'] = setfull_name_text4a492,
        codeStates['full_name'] = full_name89c4f,
        codeStates['setfull_name'] = setfull_name89c4f,
        codeStates['work_email_text'] = work_email_text10688,
        codeStates['setwork_email_text'] = setwork_email_text10688,
        codeStates['work_email'] = work_email16f90,
        codeStates['setwork_email'] = setwork_email16f90,
        codeStates['employment_type_text'] = employment_type_textc33f9,
        codeStates['setemployment_type_text'] = setemployment_type_textc33f9,
        codeStates['employment_type'] = employment_type48765,
        codeStates['setemployment_type'] = setemployment_type48765,
        codeStates['employee_status_text'] = employee_status_textef64f,
        codeStates['setemployee_status_text'] = setemployee_status_textef64f,
        codeStates['employee_status'] = employee_status8c982,
        codeStates['setemployee_status'] = setemployee_status8c982,
        codeStates['confo_text'] = confo_text730b1,
        codeStates['setconfo_text'] = setconfo_text730b1,
        codeStates['divider'] = divider0b449,
        codeStates['setdivider'] = setdivider0b449,
        codeStates['cancel_button'] = cancel_buttonccddf,
        codeStates['setcancel_button'] = setcancel_buttonccddf,
        codeStates['ok_button'] = ok_button3d34b,
        codeStates['setok_button'] = setok_button3d34b,
        codeStates['employee_id'] = employee_id7e621,
        codeStates['setemployee_id'] = setemployee_id7e621,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const group_delete68104Ref = useRef<any>(null);
  const handleClearSearch = () => {
    group_delete68104Ref.current?.setSearchParams();
    group_delete68104Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(group_delete68104) && Object.keys(group_delete68104)?.length>0)
      {
        setgroup_delete68104({})
      }
    }else 
      prevRefreshRef.current= true
  }, [group_delete68104Props?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '1 / 64',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '5px',
        backgroundColor:'#fffff',
        backgroundImage:"url('')",
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
      className={`flex flex-col overflow-auto rounded-md p-3 !pr-3 !pl-3 !rounded-lg ${isDark ? 'text-white' : 'text-black'}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setemployeedelete_v1((pre:any)=>({...pre,_selectedGroup_:"group_delete"}))
        }}
    >
          {allowedControls.includes("delete_heading_text") ?<Textdelete_heading_text   /* f472f */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("divider_s") ?<Dividerdivider_s   /* e84d1 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("employee_code_text") ?<Textemployee_code_text   /* d7eed */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("employee_code") ?<Textemployee_code   /* 89740 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("full_name_text") ?<Textfull_name_text   /* 4a492 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("full_name") ?<Textfull_name   /* 89c4f */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("work_email_text") ?<Textwork_email_text   /* 10688 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("work_email") ?<Textwork_email   /* 16f90 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("employment_type_text") ?<Textemployment_type_text   /* c33f9 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("employment_type") ?<Textemployment_type   /* 48765 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("employee_status_text") ?<Textemployee_status_text   /* ef64f */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("employee_status") ?<Textemployee_status   /* 8c982 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("confo_text") ?<Textconfo_text   /* 730b1 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("divider") ?<Dividerdivider   /* 0b449 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {        ((ruleData?.length>0 && "cancel_button" in ButtonGoRuleData)?ButtonGoRuleData["cancel_button"]:true) && 
          allowedControls.includes("cancel_button")  ?            <Buttoncancel_button tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "ok_button" in ButtonGoRuleData)?ButtonGoRuleData["ok_button"]:true) && 
          allowedControls.includes("ok_button")  ?            <Buttonok_button tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
          {allowedControls.includes("employee_id") ?<Textemployee_id   /* 7e621 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupgroup_delete
