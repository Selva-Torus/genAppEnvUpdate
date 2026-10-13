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
import Textdetails_label  from "./Textdetails_label";
import Dividerdivider_top  from "./Dividerdivider_top";
import Textl_file_name  from "./Textl_file_name";
import Textl_emp_mol  from "./Textl_emp_mol";
import Textfile_name  from "./Textfile_name";
import Textempl_mol  from "./Textempl_mol";
import Textl_fixed_amont  from "./Textl_fixed_amont";
import Textl_variable_amount  from "./Textl_variable_amount";
import Textfixed_amot  from "./Textfixed_amot";
import Textvar_amont  from "./Textvar_amont";
import Textl_charge_amount  from "./Textl_charge_amount";
import Textl_agent_routing_code  from "./Textl_agent_routing_code";
import Textcharge_amnt  from "./Textcharge_amnt";
import Textagent_routng_code  from "./Textagent_routng_code";
import Textl_processing_system  from "./Textl_processing_system";
import Textl_tran_category  from "./Textl_tran_category";
import Textprocess_system  from "./Textprocess_system";
import Texttran_catey  from "./Texttran_catey";
import Dividerdivider_bottom  from "./Dividerdivider_bottom";
import Buttonview_msg_data_btn  from "./Buttonview_msg_data_btn";
import Buttonview_tran_log_btn  from "./Buttonview_tran_log_btn";
import CustomWidgetcustomwidget  from "./CustomWidgetcustomwidget";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupjourney_details_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
  const { token } = useGlobal();
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
  let code:any = `
if("response_data" in journey_details_group && journey_details_group.response_data  !=null && journey_details_group.response_data  !=undefined)
{
    setview_tran_log_btn((pre)=>({
    ...pre,isDisabled:false
    }))
}

if("request_data" in journey_details_group && journey_details_group.request_data  !=null && journey_details_group.request_data  !=undefined)
{
    setview_tran_log_btn((pre)=>({
    ...pre,isDisabled:false
    }))
}
if("message_data" in journey_details_group && journey_details_group.message_data  !=null && journey_details_group.message_data  !=undefined)
{
    setview_msg_data_btn((pre)=>({
    ...pre,isDisabled:false
    }))
}`;
  let idx = "";
  let item = "";
  const { isDark, isHighContrast, bgStyle, textStyle } = useTheme();
  const {dfd_tranjourney_v1Props, setdfd_tranjourney_v1Props} = useContext(TotalContext) as TotalContextProps;
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
  "IT Team": {
    "allowedControls": [
      "details_label",
      "divider_top",
      "l_file_name",
      "l_emp_mol",
      "file_name",
      "empl_mol",
      "l_fixed_amont",
      "l_variable_amount",
      "fixed_amot",
      "var_amont",
      "l_charge_amount",
      "l_agent_routing_code",
      "charge_amnt",
      "agent_routng_code",
      "l_processing_system",
      "l_tran_category",
      "process_system",
      "tran_catey",
      "divider_bottom",
      "view_tran_log_btn",
      "customwidget"
    ],
    "allowedGroups": [
      "canvas",
      "journey_details_group"
    ],
    "blockedControls": [
      "view_msg_data_btn"
    ],
    "readOnlyControls": []
  },
  "Operational Manager": {
    "allowedControls": [
      "details_label",
      "divider_top",
      "l_file_name",
      "l_emp_mol",
      "file_name",
      "empl_mol",
      "l_fixed_amont",
      "l_variable_amount",
      "fixed_amot",
      "var_amont",
      "l_charge_amount",
      "l_agent_routing_code",
      "charge_amnt",
      "agent_routng_code",
      "l_processing_system",
      "l_tran_category",
      "process_system",
      "tran_catey",
      "divider_bottom",
      "view_tran_log_btn",
      "customwidget"
    ],
    "allowedGroups": [
      "canvas",
      "journey_details_group"
    ],
    "blockedControls": [
      "view_msg_data_btn"
    ],
    "readOnlyControls": []
  },
  "Operational Officer": {
    "allowedControls": [
      "details_label",
      "divider_top",
      "l_file_name",
      "l_emp_mol",
      "file_name",
      "empl_mol",
      "l_fixed_amont",
      "l_variable_amount",
      "fixed_amot",
      "var_amont",
      "l_charge_amount",
      "l_agent_routing_code",
      "charge_amnt",
      "agent_routng_code",
      "l_processing_system",
      "l_tran_category",
      "process_system",
      "tran_catey",
      "divider_bottom",
      "view_tran_log_btn",
      "customwidget"
    ],
    "allowedGroups": [
      "canvas",
      "journey_details_group"
    ],
    "blockedControls": [
      "view_msg_data_btn"
    ],
    "readOnlyControls": [
      "view_tran_log_btn"
    ]
  }
};
  const prevRefreshRef = useRef(false);
  const handleOnloadCalledRef = useRef(false);
  const securityCheckPromiseRef = useRef<Promise<any> | null>(null);
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
  const {journey_details_group764b7, setjourney_details_group764b7}= useContext(TotalContext) as TotalContextProps;
  const {journey_details_group764b7Props, setjourney_details_group764b7Props}= useContext(TotalContext) as TotalContextProps;
  const {details_labelaa81c, setdetails_labelaa81c}= useContext(TotalContext) as TotalContextProps;
  const {divider_topb49bf, setdivider_topb49bf}= useContext(TotalContext) as TotalContextProps;
  const {l_file_name7a6bd, setl_file_name7a6bd}= useContext(TotalContext) as TotalContextProps;
  const {l_emp_mol8c2e1, setl_emp_mol8c2e1}= useContext(TotalContext) as TotalContextProps;
  const {file_nameebc26, setfile_nameebc26}= useContext(TotalContext) as TotalContextProps;
  const {empl_mold6666, setempl_mold6666}= useContext(TotalContext) as TotalContextProps;
  const {l_fixed_amont9c6be, setl_fixed_amont9c6be}= useContext(TotalContext) as TotalContextProps;
  const {l_variable_amount98c92, setl_variable_amount98c92}= useContext(TotalContext) as TotalContextProps;
  const {fixed_amot7ca4c, setfixed_amot7ca4c}= useContext(TotalContext) as TotalContextProps;
  const {var_amontdd609, setvar_amontdd609}= useContext(TotalContext) as TotalContextProps;
  const {l_charge_amount53cd9, setl_charge_amount53cd9}= useContext(TotalContext) as TotalContextProps;
  const {l_agent_routing_code9af99, setl_agent_routing_code9af99}= useContext(TotalContext) as TotalContextProps;
  const {charge_amnt64cb4, setcharge_amnt64cb4}= useContext(TotalContext) as TotalContextProps;
  const {agent_routng_codee5a1e, setagent_routng_codee5a1e}= useContext(TotalContext) as TotalContextProps;
  const {l_processing_system553cb, setl_processing_system553cb}= useContext(TotalContext) as TotalContextProps;
  const {l_tran_categoryaa4a1, setl_tran_categoryaa4a1}= useContext(TotalContext) as TotalContextProps;
  const {process_system9b66e, setprocess_system9b66e}= useContext(TotalContext) as TotalContextProps;
  const {tran_catey46647, settran_catey46647}= useContext(TotalContext) as TotalContextProps;
  const {divider_bottom02761, setdivider_bottom02761}= useContext(TotalContext) as TotalContextProps;
  const {view_msg_data_btn2563b, setview_msg_data_btn2563b}= useContext(TotalContext) as TotalContextProps;
  const {view_tran_log_btn00416, setview_tran_log_btn00416}= useContext(TotalContext) as TotalContextProps;
  const {customwidget84bb0, setcustomwidget84bb0}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {wpstranjourneydetails_v1, setwpstranjourneydetails_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:WPS:AFK:wpsTranJourneyDetails:AFVK:v1',
    [user],
    'GroupJourneyDetailsGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "06b44ec51b742cb61bddff7ad1d764b7");
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
    setjourney_details_group764b7Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("details_label")){
        setdetails_labelaa81c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(details_labelaa81c?.isDisabled==null)
      {
        setdetails_labelaa81c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("divider_top")){
        setdivider_topb49bf((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(divider_topb49bf?.isDisabled==null)
      {
        setdivider_topb49bf((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("l_file_name")){
        setl_file_name7a6bd((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(l_file_name7a6bd?.isDisabled==null)
      {
        setl_file_name7a6bd((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("l_emp_mol")){
        setl_emp_mol8c2e1((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(l_emp_mol8c2e1?.isDisabled==null)
      {
        setl_emp_mol8c2e1((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("file_name")){
        setfile_nameebc26((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(file_nameebc26?.isDisabled==null)
      {
        setfile_nameebc26((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("empl_mol")){
        setempl_mold6666((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(empl_mold6666?.isDisabled==null)
      {
        setempl_mold6666((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("l_fixed_amont")){
        setl_fixed_amont9c6be((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(l_fixed_amont9c6be?.isDisabled==null)
      {
        setl_fixed_amont9c6be((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("l_variable_amount")){
        setl_variable_amount98c92((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(l_variable_amount98c92?.isDisabled==null)
      {
        setl_variable_amount98c92((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("fixed_amot")){
        setfixed_amot7ca4c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(fixed_amot7ca4c?.isDisabled==null)
      {
        setfixed_amot7ca4c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("var_amont")){
        setvar_amontdd609((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(var_amontdd609?.isDisabled==null)
      {
        setvar_amontdd609((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("l_charge_amount")){
        setl_charge_amount53cd9((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(l_charge_amount53cd9?.isDisabled==null)
      {
        setl_charge_amount53cd9((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("l_agent_routing_code")){
        setl_agent_routing_code9af99((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(l_agent_routing_code9af99?.isDisabled==null)
      {
        setl_agent_routing_code9af99((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("charge_amnt")){
        setcharge_amnt64cb4((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(charge_amnt64cb4?.isDisabled==null)
      {
        setcharge_amnt64cb4((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("agent_routng_code")){
        setagent_routng_codee5a1e((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(agent_routng_codee5a1e?.isDisabled==null)
      {
        setagent_routng_codee5a1e((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("l_processing_system")){
        setl_processing_system553cb((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(l_processing_system553cb?.isDisabled==null)
      {
        setl_processing_system553cb((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("l_tran_category")){
        setl_tran_categoryaa4a1((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(l_tran_categoryaa4a1?.isDisabled==null)
      {
        setl_tran_categoryaa4a1((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("process_system")){
        setprocess_system9b66e((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(process_system9b66e?.isDisabled==null)
      {
        setprocess_system9b66e((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("tran_catey")){
        settran_catey46647((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(tran_catey46647?.isDisabled==null)
      {
        settran_catey46647((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("divider_bottom")){
        setdivider_bottom02761((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(divider_bottom02761?.isDisabled==null)
      {
        setdivider_bottom02761((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("view_msg_data_btn")){
        setview_msg_data_btn2563b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(view_msg_data_btn2563b?.isDisabled==null)
      {
        setview_msg_data_btn2563b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("view_tran_log_btn")){
        setview_tran_log_btn00416((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(view_tran_log_btn00416?.isDisabled==null)
      {
        setview_tran_log_btn00416((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("customwidget")){
        setcustomwidget84bb0((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(customwidget84bb0?.isDisabled==null)
      {
        setcustomwidget84bb0((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['journey_details_group'] = journey_details_group764b7,
        codeStates['setjourney_details_group'] = setjourney_details_group764b7,
        codeStates['journey_details_group764b7'] = journey_details_group764b7Props,
        codeStates['setjourney_details_group764b7'] = setjourney_details_group764b7Props,
        codeStates['details_label'] = details_labelaa81c,
        codeStates['setdetails_label'] = setdetails_labelaa81c,
        codeStates['divider_top'] = divider_topb49bf,
        codeStates['setdivider_top'] = setdivider_topb49bf,
        codeStates['l_file_name'] = l_file_name7a6bd,
        codeStates['setl_file_name'] = setl_file_name7a6bd,
        codeStates['l_emp_mol'] = l_emp_mol8c2e1,
        codeStates['setl_emp_mol'] = setl_emp_mol8c2e1,
        codeStates['file_name'] = file_nameebc26,
        codeStates['setfile_name'] = setfile_nameebc26,
        codeStates['empl_mol'] = empl_mold6666,
        codeStates['setempl_mol'] = setempl_mold6666,
        codeStates['l_fixed_amont'] = l_fixed_amont9c6be,
        codeStates['setl_fixed_amont'] = setl_fixed_amont9c6be,
        codeStates['l_variable_amount'] = l_variable_amount98c92,
        codeStates['setl_variable_amount'] = setl_variable_amount98c92,
        codeStates['fixed_amot'] = fixed_amot7ca4c,
        codeStates['setfixed_amot'] = setfixed_amot7ca4c,
        codeStates['var_amont'] = var_amontdd609,
        codeStates['setvar_amont'] = setvar_amontdd609,
        codeStates['l_charge_amount'] = l_charge_amount53cd9,
        codeStates['setl_charge_amount'] = setl_charge_amount53cd9,
        codeStates['l_agent_routing_code'] = l_agent_routing_code9af99,
        codeStates['setl_agent_routing_code'] = setl_agent_routing_code9af99,
        codeStates['charge_amnt'] = charge_amnt64cb4,
        codeStates['setcharge_amnt'] = setcharge_amnt64cb4,
        codeStates['agent_routng_code'] = agent_routng_codee5a1e,
        codeStates['setagent_routng_code'] = setagent_routng_codee5a1e,
        codeStates['l_processing_system'] = l_processing_system553cb,
        codeStates['setl_processing_system'] = setl_processing_system553cb,
        codeStates['l_tran_category'] = l_tran_categoryaa4a1,
        codeStates['setl_tran_category'] = setl_tran_categoryaa4a1,
        codeStates['process_system'] = process_system9b66e,
        codeStates['setprocess_system'] = setprocess_system9b66e,
        codeStates['tran_catey'] = tran_catey46647,
        codeStates['settran_catey'] = settran_catey46647,
        codeStates['divider_bottom'] = divider_bottom02761,
        codeStates['setdivider_bottom'] = setdivider_bottom02761,
        codeStates['view_msg_data_btn'] = view_msg_data_btn2563b,
        codeStates['setview_msg_data_btn'] = setview_msg_data_btn2563b,
        codeStates['view_tran_log_btn'] = view_tran_log_btn00416,
        codeStates['setview_tran_log_btn'] = setview_tran_log_btn00416,
        codeStates['customwidget'] = customwidget84bb0,
        codeStates['setcustomwidget'] = setcustomwidget84bb0,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "06b44ec51b742cb61bddff7ad1d764b7");
  if(orchestrationData?.data?.error === true){
    toast(orchestrationData?.data?.errorDetails?.message, 'danger')
    return
  }
  if(orchestrationData?.data?.rule?.nodes?.length > 0){
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
  }


    const handleOnload=()=>{
  }
  const handleOnChange=async ()=>{

  }

  const handleOnClick= async (selectedItem:any, selectedIndex?: number)=>{
    handleCustomCode()
    
  }
  const handleCustomCode=async () => {
    let customCode:any=""
    if (allCode != '') {
      let codeStates: any = {};
        codeStates['journey_details_group'] = journey_details_group764b7,
        codeStates['setjourney_details_group'] = setjourney_details_group764b7,
        codeStates['journey_details_group764b7'] = journey_details_group764b7Props,
        codeStates['setjourney_details_group764b7'] = setjourney_details_group764b7Props,
        codeStates['details_label'] = details_labelaa81c,
        codeStates['setdetails_label'] = setdetails_labelaa81c,
        codeStates['divider_top'] = divider_topb49bf,
        codeStates['setdivider_top'] = setdivider_topb49bf,
        codeStates['l_file_name'] = l_file_name7a6bd,
        codeStates['setl_file_name'] = setl_file_name7a6bd,
        codeStates['l_emp_mol'] = l_emp_mol8c2e1,
        codeStates['setl_emp_mol'] = setl_emp_mol8c2e1,
        codeStates['file_name'] = file_nameebc26,
        codeStates['setfile_name'] = setfile_nameebc26,
        codeStates['empl_mol'] = empl_mold6666,
        codeStates['setempl_mol'] = setempl_mold6666,
        codeStates['l_fixed_amont'] = l_fixed_amont9c6be,
        codeStates['setl_fixed_amont'] = setl_fixed_amont9c6be,
        codeStates['l_variable_amount'] = l_variable_amount98c92,
        codeStates['setl_variable_amount'] = setl_variable_amount98c92,
        codeStates['fixed_amot'] = fixed_amot7ca4c,
        codeStates['setfixed_amot'] = setfixed_amot7ca4c,
        codeStates['var_amont'] = var_amontdd609,
        codeStates['setvar_amont'] = setvar_amontdd609,
        codeStates['l_charge_amount'] = l_charge_amount53cd9,
        codeStates['setl_charge_amount'] = setl_charge_amount53cd9,
        codeStates['l_agent_routing_code'] = l_agent_routing_code9af99,
        codeStates['setl_agent_routing_code'] = setl_agent_routing_code9af99,
        codeStates['charge_amnt'] = charge_amnt64cb4,
        codeStates['setcharge_amnt'] = setcharge_amnt64cb4,
        codeStates['agent_routng_code'] = agent_routng_codee5a1e,
        codeStates['setagent_routng_code'] = setagent_routng_codee5a1e,
        codeStates['l_processing_system'] = l_processing_system553cb,
        codeStates['setl_processing_system'] = setl_processing_system553cb,
        codeStates['l_tran_category'] = l_tran_categoryaa4a1,
        codeStates['setl_tran_category'] = setl_tran_categoryaa4a1,
        codeStates['process_system'] = process_system9b66e,
        codeStates['setprocess_system'] = setprocess_system9b66e,
        codeStates['tran_catey'] = tran_catey46647,
        codeStates['settran_catey'] = settran_catey46647,
        codeStates['divider_bottom'] = divider_bottom02761,
        codeStates['setdivider_bottom'] = setdivider_bottom02761,
        codeStates['view_msg_data_btn'] = view_msg_data_btn2563b,
        codeStates['setview_msg_data_btn'] = setview_msg_data_btn2563b,
        codeStates['view_tran_log_btn'] = view_tran_log_btn00416,
        codeStates['setview_tran_log_btn'] = setview_tran_log_btn00416,
        codeStates['customwidget'] = customwidget84bb0,
        codeStates['setcustomwidget'] = setcustomwidget84bb0,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const journey_details_group764b7Ref = useRef<any>(null);
  const handleClearSearch = () => {
    journey_details_group764b7Ref.current?.setSearchParams();
    journey_details_group764b7Ref.current?.handleSearch({});
  };

  useEffect(() => {
    securityCheckPromiseRef.current = securityCheck()
  }, [token])

  useEffect(() => {
    if (!handleOnloadCalledRef.current) {
      handleOnloadCalledRef.current = true;
      (async () => {
        await securityCheckPromiseRef.current
        handleOnload()
      })()
    }
    if (prevRefreshRef.current) {
      if (
        !Array.isArray(journey_details_group764b7) &&
        Object.keys(journey_details_group764b7)?.length > 0
      ) {
        setjourney_details_group764b7({})
        setjourney_details_group764b7Props((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [journey_details_group764b7Props?.refresh])


  useEffect(() => {
    subscreenCheck()
  }, [])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '1 / 104',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '5px',
        backgroundColor:'#ffffff',
        backgroundImage:"url('')",
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
      className={`flex flex-col overflow-auto rounded-md  ${isDark ? 'text-white' : 'text-black'}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setwpstranjourneydetails_v1((pre:any)=>({...pre,_selectedGroup_:"journey_details_group"}))
        }}
    >
          {allowedControls.includes("details_label") ?<Textdetails_label   /* aa81c */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("divider_top") ?<Dividerdivider_top   /* b49bf */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("l_file_name") ?<Textl_file_name   /* 7a6bd */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("l_emp_mol") ?<Textl_emp_mol   /* 8c2e1 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("file_name") ?<Textfile_name   /* ebc26 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("empl_mol") ?<Textempl_mol   /* d6666 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("l_fixed_amont") ?<Textl_fixed_amont   /* 9c6be */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("l_variable_amount") ?<Textl_variable_amount   /* 98c92 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("fixed_amot") ?<Textfixed_amot   /* 7ca4c */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("var_amont") ?<Textvar_amont   /* dd609 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("l_charge_amount") ?<Textl_charge_amount   /* 53cd9 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("l_agent_routing_code") ?<Textl_agent_routing_code   /* 9af99 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("charge_amnt") ?<Textcharge_amnt   /* 64cb4 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("agent_routng_code") ?<Textagent_routng_code   /* e5a1e */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("l_processing_system") ?<Textl_processing_system   /* 553cb */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("l_tran_category") ?<Textl_tran_category   /* aa4a1 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("process_system") ?<Textprocess_system   /* 9b66e */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("tran_catey") ?<Texttran_catey   /* 46647 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("divider_bottom") ?<Dividerdivider_bottom   /* 02761 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {        ((ruleData?.length>0 && "view_msg_data_btn" in ButtonGoRuleData)?ButtonGoRuleData["view_msg_data_btn"]:true) && 
          allowedControls.includes("view_msg_data_btn")  ?            <Buttonview_msg_data_btn tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "view_tran_log_btn" in ButtonGoRuleData)?ButtonGoRuleData["view_tran_log_btn"]:true) && 
          allowedControls.includes("view_tran_log_btn")  ?            <Buttonview_tran_log_btn tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {allowedControls.includes("customwidget") ?<CustomWidgetcustomwidget /* 84bb0 */ encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupjourney_details_group
