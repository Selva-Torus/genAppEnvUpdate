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
import Tableoperational_pending_table  from './Tableoperational_pending_table';  
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupoperational_pending_table = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  let code:any = ``;
  let idx = "";
  let item = "";
  const { isDark, isHighContrast, bgStyle, textStyle } = useTheme();
  const {dfd_transaction_v1Props, setdfd_transaction_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_journey_v1Props, setdfd_journey_v1Props} = useContext(TotalContext) as TotalContextProps;
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
  "Operational Manager": {
    "allowedControls": [
      "value_date_operational_pending",
      "dr_account_operational_pending",
      "dr_name_operational_pending",
      "dr_currency_operational_pending",
      "dr_amount_operational_pending",
      "cr_account_operational_pending",
      "cr_name_operational_pending",
      "cr_currency_operational_pending",
      "cr_amount_operational_pending",
      "new_payment_chk_verify_btn",
      "opr_pending_chk_authorize_btn",
      "opr_pending_chk_approve_btn",
      "opr_pending_chk_reject_btn",
      "opr_pending_mk_already_posted_btn",
      "opr_pending_mk_retry_btn",
      "opr_pending_mk_reject_btn",
      "opr_pending_mk_repost_btn",
      "opr_pending_mk_push_next_step_btn",
      "opr_pending_mk_reverse_btn",
      "opr_pending_mk_ip_return_btn",
      "opr_pending_mk_repair_btn",
      "opr_pending_chk_ip_verify_return_btn",
      "opr_pending_mk_op_return_btn",
      "opr_pending_chk_op_return_verify_btn",
      "opr_pending_mk_force_pass_btn",
      "opr_pending_op_mk_applysplrate_btn",
      "opr_pending_ip_mkr_applysplrate_btn",
      "uuid_operational_pending",
      "opr_pending_chk_op_appl_spl_rate_verfiy",
      "opr_pending_chk_ip_appl_spl_rate_verfiy"
    ],
    "allowedGroups": [
      "canvas",
      "tran_main_group",
      "tran_tab_group",
      "view_all_tab",
      "view_all_table",
      "view_all_journey_group",
      "failure_queue_tab",
      "failure_queue_table",
      "failure_queue_journey_group",
      "success_queue_tab",
      "success_queue_table",
      "success_queue_journey_group",
      "return_queue_tab",
      "return_queue_journey_group",
      "return_queue_table",
      "operational_pending_tab",
      "operational_pending_table",
      "operational_pending_journey_group",
      "technical_pending_tab",
      "technical_pending_table",
      "technical_pending_journey_group",
      "notification_pending_tab",
      "notification_pending_table",
      "notification_pending_journey_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operational Officer": {
    "allowedControls": [
      "value_date_operational_pending",
      "dr_account_operational_pending",
      "dr_name_operational_pending",
      "dr_currency_operational_pending",
      "dr_amount_operational_pending",
      "cr_account_operational_pending",
      "cr_name_operational_pending",
      "cr_currency_operational_pending",
      "cr_amount_operational_pending",
      "new_payment_chk_verify_btn",
      "opr_pending_chk_authorize_btn",
      "opr_pending_chk_approve_btn",
      "opr_pending_chk_reject_btn",
      "opr_pending_mk_already_posted_btn",
      "opr_pending_mk_retry_btn",
      "opr_pending_mk_reject_btn",
      "opr_pending_mk_repost_btn",
      "opr_pending_mk_push_next_step_btn",
      "opr_pending_mk_reverse_btn",
      "opr_pending_mk_ip_return_btn",
      "opr_pending_mk_repair_btn",
      "opr_pending_chk_ip_verify_return_btn",
      "opr_pending_mk_op_return_btn",
      "opr_pending_chk_op_return_verify_btn",
      "opr_pending_mk_force_pass_btn",
      "opr_pending_op_mk_applysplrate_btn",
      "opr_pending_ip_mkr_applysplrate_btn",
      "uuid_operational_pending",
      "opr_pending_chk_op_appl_spl_rate_verfiy",
      "opr_pending_chk_ip_appl_spl_rate_verfiy"
    ],
    "allowedGroups": [
      "canvas",
      "tran_main_group",
      "tran_tab_group",
      "view_all_tab",
      "view_all_table",
      "view_all_journey_group",
      "failure_queue_tab",
      "failure_queue_table",
      "failure_queue_journey_group",
      "success_queue_tab",
      "success_queue_table",
      "success_queue_journey_group",
      "return_queue_tab",
      "return_queue_journey_group",
      "return_queue_table",
      "operational_pending_tab",
      "operational_pending_table",
      "operational_pending_journey_group",
      "technical_pending_tab",
      "technical_pending_table",
      "technical_pending_journey_group",
      "notification_pending_tab",
      "notification_pending_table",
      "notification_pending_journey_group",
      "enquiry_tab",
      "enquiry_table",
      "enquiry_journey_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
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
  const {tran_main_group1dc7f, settran_main_group1dc7f}= useContext(TotalContext) as TotalContextProps;
  const {tran_main_group1dc7fProps, settran_main_group1dc7fProps}= useContext(TotalContext) as TotalContextProps;
  const {tran_tab_group08b64, settran_tab_group08b64}= useContext(TotalContext) as TotalContextProps;
  const {tran_tab_group08b64Props, settran_tab_group08b64Props}= useContext(TotalContext) as TotalContextProps;
  const {view_all_tab4a963, setview_all_tab4a963}= useContext(TotalContext) as TotalContextProps;
  const {view_all_tab4a963Props, setview_all_tab4a963Props}= useContext(TotalContext) as TotalContextProps;
  const {view_all_tablec9e87, setview_all_tablec9e87}= useContext(TotalContext) as TotalContextProps;
  const {view_all_tablec9e87Props, setview_all_tablec9e87Props}= useContext(TotalContext) as TotalContextProps;
  const {view_all_journey_group67ce4, setview_all_journey_group67ce4}= useContext(TotalContext) as TotalContextProps;
  const {view_all_journey_group67ce4Props, setview_all_journey_group67ce4Props}= useContext(TotalContext) as TotalContextProps;
  const {failure_queue_tab69f01, setfailure_queue_tab69f01}= useContext(TotalContext) as TotalContextProps;
  const {failure_queue_tab69f01Props, setfailure_queue_tab69f01Props}= useContext(TotalContext) as TotalContextProps;
  const {failure_queue_tablea476f, setfailure_queue_tablea476f}= useContext(TotalContext) as TotalContextProps;
  const {failure_queue_tablea476fProps, setfailure_queue_tablea476fProps}= useContext(TotalContext) as TotalContextProps;
  const {failure_queue_journey_group36aba, setfailure_queue_journey_group36aba}= useContext(TotalContext) as TotalContextProps;
  const {failure_queue_journey_group36abaProps, setfailure_queue_journey_group36abaProps}= useContext(TotalContext) as TotalContextProps;
  const {success_queue_tabef582, setsuccess_queue_tabef582}= useContext(TotalContext) as TotalContextProps;
  const {success_queue_tabef582Props, setsuccess_queue_tabef582Props}= useContext(TotalContext) as TotalContextProps;
  const {success_queue_table63aae, setsuccess_queue_table63aae}= useContext(TotalContext) as TotalContextProps;
  const {success_queue_table63aaeProps, setsuccess_queue_table63aaeProps}= useContext(TotalContext) as TotalContextProps;
  const {success_queue_journey_group755eb, setsuccess_queue_journey_group755eb}= useContext(TotalContext) as TotalContextProps;
  const {success_queue_journey_group755ebProps, setsuccess_queue_journey_group755ebProps}= useContext(TotalContext) as TotalContextProps;
  const {return_queue_tab5611e, setreturn_queue_tab5611e}= useContext(TotalContext) as TotalContextProps;
  const {return_queue_tab5611eProps, setreturn_queue_tab5611eProps}= useContext(TotalContext) as TotalContextProps;
  const {return_queue_journey_group92c55, setreturn_queue_journey_group92c55}= useContext(TotalContext) as TotalContextProps;
  const {return_queue_journey_group92c55Props, setreturn_queue_journey_group92c55Props}= useContext(TotalContext) as TotalContextProps;
  const {return_queue_table267f0, setreturn_queue_table267f0}= useContext(TotalContext) as TotalContextProps;
  const {return_queue_table267f0Props, setreturn_queue_table267f0Props}= useContext(TotalContext) as TotalContextProps;
  const {operational_pending_tab67331, setoperational_pending_tab67331}= useContext(TotalContext) as TotalContextProps;
  const {operational_pending_tab67331Props, setoperational_pending_tab67331Props}= useContext(TotalContext) as TotalContextProps;
  const {operational_pending_table0a253, setoperational_pending_table0a253}= useContext(TotalContext) as TotalContextProps;
  const {operational_pending_table0a253Props, setoperational_pending_table0a253Props}= useContext(TotalContext) as TotalContextProps;
  const {value_date_operational_pending6ecd4, setvalue_date_operational_pending6ecd4}= useContext(TotalContext) as TotalContextProps;
  const {dr_account_operational_pending2ab87, setdr_account_operational_pending2ab87}= useContext(TotalContext) as TotalContextProps;
  const {dr_name_operational_pendinga8ff6, setdr_name_operational_pendinga8ff6}= useContext(TotalContext) as TotalContextProps;
  const {dr_currency_operational_pending5146b, setdr_currency_operational_pending5146b}= useContext(TotalContext) as TotalContextProps;
  const {dr_amount_operational_pending70e3f, setdr_amount_operational_pending70e3f}= useContext(TotalContext) as TotalContextProps;
  const {cr_account_operational_pendingf9a9c, setcr_account_operational_pendingf9a9c}= useContext(TotalContext) as TotalContextProps;
  const {cr_name_operational_pendingbce21, setcr_name_operational_pendingbce21}= useContext(TotalContext) as TotalContextProps;
  const {cr_currency_operational_pending282bc, setcr_currency_operational_pending282bc}= useContext(TotalContext) as TotalContextProps;
  const {cr_amount_operational_pending0df81, setcr_amount_operational_pending0df81}= useContext(TotalContext) as TotalContextProps;
  const {new_payment_chk_verify_btn3918d, setnew_payment_chk_verify_btn3918d}= useContext(TotalContext) as TotalContextProps;
  const {opr_pending_chk_authorize_btne1fa7, setopr_pending_chk_authorize_btne1fa7}= useContext(TotalContext) as TotalContextProps;
  const {opr_pending_chk_approve_btn33fe9, setopr_pending_chk_approve_btn33fe9}= useContext(TotalContext) as TotalContextProps;
  const {opr_pending_chk_reject_btn18529, setopr_pending_chk_reject_btn18529}= useContext(TotalContext) as TotalContextProps;
  const {opr_pending_mk_already_posted_btn4eb90, setopr_pending_mk_already_posted_btn4eb90}= useContext(TotalContext) as TotalContextProps;
  const {opr_pending_mk_retry_btn4af05, setopr_pending_mk_retry_btn4af05}= useContext(TotalContext) as TotalContextProps;
  const {opr_pending_mk_reject_btnb2c93, setopr_pending_mk_reject_btnb2c93}= useContext(TotalContext) as TotalContextProps;
  const {opr_pending_mk_repost_btn4506c, setopr_pending_mk_repost_btn4506c}= useContext(TotalContext) as TotalContextProps;
  const {opr_pending_mk_push_next_step_btn631df, setopr_pending_mk_push_next_step_btn631df}= useContext(TotalContext) as TotalContextProps;
  const {opr_pending_mk_reverse_btndab56, setopr_pending_mk_reverse_btndab56}= useContext(TotalContext) as TotalContextProps;
  const {opr_pending_mk_ip_return_btnb715b, setopr_pending_mk_ip_return_btnb715b}= useContext(TotalContext) as TotalContextProps;
  const {opr_pending_mk_repair_btnc91a5, setopr_pending_mk_repair_btnc91a5}= useContext(TotalContext) as TotalContextProps;
  const {opr_pending_chk_ip_verify_return_btnb8342, setopr_pending_chk_ip_verify_return_btnb8342}= useContext(TotalContext) as TotalContextProps;
  const {opr_pending_mk_op_return_btn311fd, setopr_pending_mk_op_return_btn311fd}= useContext(TotalContext) as TotalContextProps;
  const {opr_pending_chk_op_return_verify_btne3f5b, setopr_pending_chk_op_return_verify_btne3f5b}= useContext(TotalContext) as TotalContextProps;
  const {opr_pending_mk_force_pass_btnc0708, setopr_pending_mk_force_pass_btnc0708}= useContext(TotalContext) as TotalContextProps;
  const {opr_pending_op_mk_applysplrate_btn52343, setopr_pending_op_mk_applysplrate_btn52343}= useContext(TotalContext) as TotalContextProps;
  const {opr_pending_ip_mkr_applysplrate_btna62ff, setopr_pending_ip_mkr_applysplrate_btna62ff}= useContext(TotalContext) as TotalContextProps;
  const {uuid_operational_pendinga5f0a, setuuid_operational_pendinga5f0a}= useContext(TotalContext) as TotalContextProps;
  const {opr_pending_chk_op_appl_spl_rate_verfiy592a5, setopr_pending_chk_op_appl_spl_rate_verfiy592a5}= useContext(TotalContext) as TotalContextProps;
  const {opr_pending_chk_ip_appl_spl_rate_verfiyca082, setopr_pending_chk_ip_appl_spl_rate_verfiyca082}= useContext(TotalContext) as TotalContextProps;
  const {operational_pending_journey_group63667, setoperational_pending_journey_group63667}= useContext(TotalContext) as TotalContextProps;
  const {operational_pending_journey_group63667Props, setoperational_pending_journey_group63667Props}= useContext(TotalContext) as TotalContextProps;
  const {technical_pending_tab0b23f, settechnical_pending_tab0b23f}= useContext(TotalContext) as TotalContextProps;
  const {technical_pending_tab0b23fProps, settechnical_pending_tab0b23fProps}= useContext(TotalContext) as TotalContextProps;
  const {technical_pending_table84f30, settechnical_pending_table84f30}= useContext(TotalContext) as TotalContextProps;
  const {technical_pending_table84f30Props, settechnical_pending_table84f30Props}= useContext(TotalContext) as TotalContextProps;
  const {technical_pending_journey_groupe4f03, settechnical_pending_journey_groupe4f03}= useContext(TotalContext) as TotalContextProps;
  const {technical_pending_journey_groupe4f03Props, settechnical_pending_journey_groupe4f03Props}= useContext(TotalContext) as TotalContextProps;
  const {notification_pending_tab223c7, setnotification_pending_tab223c7}= useContext(TotalContext) as TotalContextProps;
  const {notification_pending_tab223c7Props, setnotification_pending_tab223c7Props}= useContext(TotalContext) as TotalContextProps;
  const {notification_pending_table45836, setnotification_pending_table45836}= useContext(TotalContext) as TotalContextProps;
  const {notification_pending_table45836Props, setnotification_pending_table45836Props}= useContext(TotalContext) as TotalContextProps;
  const {notification_pending_journey_groupc9534, setnotification_pending_journey_groupc9534}= useContext(TotalContext) as TotalContextProps;
  const {notification_pending_journey_groupc9534Props, setnotification_pending_journey_groupc9534Props}= useContext(TotalContext) as TotalContextProps;
  const {enquiry_tabfb252, setenquiry_tabfb252}= useContext(TotalContext) as TotalContextProps;
  const {enquiry_tabfb252Props, setenquiry_tabfb252Props}= useContext(TotalContext) as TotalContextProps;
  const {enquiry_tableb3b4e, setenquiry_tableb3b4e}= useContext(TotalContext) as TotalContextProps;
  const {enquiry_tableb3b4eProps, setenquiry_tableb3b4eProps}= useContext(TotalContext) as TotalContextProps;
  const {enquiry_journey_group047c9, setenquiry_journey_group047c9}= useContext(TotalContext) as TotalContextProps;
  const {enquiry_journey_group047c9Props, setenquiry_journey_group047c9Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {transactionproduct_v1, settransactionproduct_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:transactionProduct:AFVK:v1',
    [user],
    'GroupOperationalPendingTable',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "ec0fa3b3e01145269d4d5b2823e0a253");
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
    setoperational_pending_table0a253Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("value_date_operational_pending")){
        setvalue_date_operational_pending6ecd4((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(value_date_operational_pending6ecd4?.isDisabled==null)
      {
        setvalue_date_operational_pending6ecd4((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("dr_account_operational_pending")){
        setdr_account_operational_pending2ab87((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(dr_account_operational_pending2ab87?.isDisabled==null)
      {
        setdr_account_operational_pending2ab87((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("dr_name_operational_pending")){
        setdr_name_operational_pendinga8ff6((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(dr_name_operational_pendinga8ff6?.isDisabled==null)
      {
        setdr_name_operational_pendinga8ff6((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("dr_currency_operational_pending")){
        setdr_currency_operational_pending5146b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(dr_currency_operational_pending5146b?.isDisabled==null)
      {
        setdr_currency_operational_pending5146b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("dr_amount_operational_pending")){
        setdr_amount_operational_pending70e3f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(dr_amount_operational_pending70e3f?.isDisabled==null)
      {
        setdr_amount_operational_pending70e3f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cr_account_operational_pending")){
        setcr_account_operational_pendingf9a9c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(cr_account_operational_pendingf9a9c?.isDisabled==null)
      {
        setcr_account_operational_pendingf9a9c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cr_name_operational_pending")){
        setcr_name_operational_pendingbce21((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(cr_name_operational_pendingbce21?.isDisabled==null)
      {
        setcr_name_operational_pendingbce21((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cr_currency_operational_pending")){
        setcr_currency_operational_pending282bc((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(cr_currency_operational_pending282bc?.isDisabled==null)
      {
        setcr_currency_operational_pending282bc((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cr_amount_operational_pending")){
        setcr_amount_operational_pending0df81((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(cr_amount_operational_pending0df81?.isDisabled==null)
      {
        setcr_amount_operational_pending0df81((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("new_payment_chk_verify_btn")){
        setnew_payment_chk_verify_btn3918d((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(new_payment_chk_verify_btn3918d?.isDisabled==null)
      {
        setnew_payment_chk_verify_btn3918d((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("opr_pending_chk_authorize_btn")){
        setopr_pending_chk_authorize_btne1fa7((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(opr_pending_chk_authorize_btne1fa7?.isDisabled==null)
      {
        setopr_pending_chk_authorize_btne1fa7((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("opr_pending_chk_approve_btn")){
        setopr_pending_chk_approve_btn33fe9((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(opr_pending_chk_approve_btn33fe9?.isDisabled==null)
      {
        setopr_pending_chk_approve_btn33fe9((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("opr_pending_chk_reject_btn")){
        setopr_pending_chk_reject_btn18529((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(opr_pending_chk_reject_btn18529?.isDisabled==null)
      {
        setopr_pending_chk_reject_btn18529((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("opr_pending_mk_already_posted_btn")){
        setopr_pending_mk_already_posted_btn4eb90((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(opr_pending_mk_already_posted_btn4eb90?.isDisabled==null)
      {
        setopr_pending_mk_already_posted_btn4eb90((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("opr_pending_mk_retry_btn")){
        setopr_pending_mk_retry_btn4af05((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(opr_pending_mk_retry_btn4af05?.isDisabled==null)
      {
        setopr_pending_mk_retry_btn4af05((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("opr_pending_mk_reject_btn")){
        setopr_pending_mk_reject_btnb2c93((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(opr_pending_mk_reject_btnb2c93?.isDisabled==null)
      {
        setopr_pending_mk_reject_btnb2c93((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("opr_pending_mk_repost_btn")){
        setopr_pending_mk_repost_btn4506c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(opr_pending_mk_repost_btn4506c?.isDisabled==null)
      {
        setopr_pending_mk_repost_btn4506c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("opr_pending_mk_push_next_step_btn")){
        setopr_pending_mk_push_next_step_btn631df((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(opr_pending_mk_push_next_step_btn631df?.isDisabled==null)
      {
        setopr_pending_mk_push_next_step_btn631df((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("opr_pending_mk_reverse_btn")){
        setopr_pending_mk_reverse_btndab56((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(opr_pending_mk_reverse_btndab56?.isDisabled==null)
      {
        setopr_pending_mk_reverse_btndab56((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("opr_pending_mk_ip_return_btn")){
        setopr_pending_mk_ip_return_btnb715b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(opr_pending_mk_ip_return_btnb715b?.isDisabled==null)
      {
        setopr_pending_mk_ip_return_btnb715b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("opr_pending_mk_repair_btn")){
        setopr_pending_mk_repair_btnc91a5((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(opr_pending_mk_repair_btnc91a5?.isDisabled==null)
      {
        setopr_pending_mk_repair_btnc91a5((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("opr_pending_chk_ip_verify_return_btn")){
        setopr_pending_chk_ip_verify_return_btnb8342((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(opr_pending_chk_ip_verify_return_btnb8342?.isDisabled==null)
      {
        setopr_pending_chk_ip_verify_return_btnb8342((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("opr_pending_mk_op_return_btn")){
        setopr_pending_mk_op_return_btn311fd((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(opr_pending_mk_op_return_btn311fd?.isDisabled==null)
      {
        setopr_pending_mk_op_return_btn311fd((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("opr_pending_chk_op_return_verify_btn")){
        setopr_pending_chk_op_return_verify_btne3f5b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(opr_pending_chk_op_return_verify_btne3f5b?.isDisabled==null)
      {
        setopr_pending_chk_op_return_verify_btne3f5b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("opr_pending_mk_force_pass_btn")){
        setopr_pending_mk_force_pass_btnc0708((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(opr_pending_mk_force_pass_btnc0708?.isDisabled==null)
      {
        setopr_pending_mk_force_pass_btnc0708((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("opr_pending_op_mk_applysplrate_btn")){
        setopr_pending_op_mk_applysplrate_btn52343((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(opr_pending_op_mk_applysplrate_btn52343?.isDisabled==null)
      {
        setopr_pending_op_mk_applysplrate_btn52343((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("opr_pending_ip_mkr_applysplrate_btn")){
        setopr_pending_ip_mkr_applysplrate_btna62ff((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(opr_pending_ip_mkr_applysplrate_btna62ff?.isDisabled==null)
      {
        setopr_pending_ip_mkr_applysplrate_btna62ff((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("uuid_operational_pending")){
        setuuid_operational_pendinga5f0a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(uuid_operational_pendinga5f0a?.isDisabled==null)
      {
        setuuid_operational_pendinga5f0a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("opr_pending_chk_op_appl_spl_rate_verfiy")){
        setopr_pending_chk_op_appl_spl_rate_verfiy592a5((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(opr_pending_chk_op_appl_spl_rate_verfiy592a5?.isDisabled==null)
      {
        setopr_pending_chk_op_appl_spl_rate_verfiy592a5((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("opr_pending_chk_ip_appl_spl_rate_verfiy")){
        setopr_pending_chk_ip_appl_spl_rate_verfiyca082((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(opr_pending_chk_ip_appl_spl_rate_verfiyca082?.isDisabled==null)
      {
        setopr_pending_chk_ip_appl_spl_rate_verfiyca082((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "ec0fa3b3e01145269d4d5b2823e0a253");
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
        codeStates['tran_main_group'] = tran_main_group1dc7f,
        codeStates['settran_main_group'] = settran_main_group1dc7f,
        codeStates['tran_main_group1dc7f'] = tran_main_group1dc7fProps,
        codeStates['settran_main_group1dc7f'] = settran_main_group1dc7fProps,
        codeStates['tran_tab_group'] = tran_tab_group08b64,
        codeStates['settran_tab_group'] = settran_tab_group08b64,
        codeStates['tran_tab_group08b64'] = tran_tab_group08b64Props,
        codeStates['settran_tab_group08b64'] = settran_tab_group08b64Props,
        codeStates['view_all_tab'] = view_all_tab4a963,
        codeStates['setview_all_tab'] = setview_all_tab4a963,
        codeStates['view_all_tab4a963'] = view_all_tab4a963Props,
        codeStates['setview_all_tab4a963'] = setview_all_tab4a963Props,
        codeStates['view_all_table'] = view_all_tablec9e87,
        codeStates['setview_all_table'] = setview_all_tablec9e87,
        codeStates['view_all_tablec9e87'] = view_all_tablec9e87Props,
        codeStates['setview_all_tablec9e87'] = setview_all_tablec9e87Props,
        codeStates['view_all_journey_group'] = view_all_journey_group67ce4,
        codeStates['setview_all_journey_group'] = setview_all_journey_group67ce4,
        codeStates['view_all_journey_group67ce4'] = view_all_journey_group67ce4Props,
        codeStates['setview_all_journey_group67ce4'] = setview_all_journey_group67ce4Props,
        codeStates['failure_queue_tab'] = failure_queue_tab69f01,
        codeStates['setfailure_queue_tab'] = setfailure_queue_tab69f01,
        codeStates['failure_queue_tab69f01'] = failure_queue_tab69f01Props,
        codeStates['setfailure_queue_tab69f01'] = setfailure_queue_tab69f01Props,
        codeStates['failure_queue_table'] = failure_queue_tablea476f,
        codeStates['setfailure_queue_table'] = setfailure_queue_tablea476f,
        codeStates['failure_queue_tablea476f'] = failure_queue_tablea476fProps,
        codeStates['setfailure_queue_tablea476f'] = setfailure_queue_tablea476fProps,
        codeStates['failure_queue_journey_group'] = failure_queue_journey_group36aba,
        codeStates['setfailure_queue_journey_group'] = setfailure_queue_journey_group36aba,
        codeStates['failure_queue_journey_group36aba'] = failure_queue_journey_group36abaProps,
        codeStates['setfailure_queue_journey_group36aba'] = setfailure_queue_journey_group36abaProps,
        codeStates['success_queue_tab'] = success_queue_tabef582,
        codeStates['setsuccess_queue_tab'] = setsuccess_queue_tabef582,
        codeStates['success_queue_tabef582'] = success_queue_tabef582Props,
        codeStates['setsuccess_queue_tabef582'] = setsuccess_queue_tabef582Props,
        codeStates['success_queue_table'] = success_queue_table63aae,
        codeStates['setsuccess_queue_table'] = setsuccess_queue_table63aae,
        codeStates['success_queue_table63aae'] = success_queue_table63aaeProps,
        codeStates['setsuccess_queue_table63aae'] = setsuccess_queue_table63aaeProps,
        codeStates['success_queue_journey_group'] = success_queue_journey_group755eb,
        codeStates['setsuccess_queue_journey_group'] = setsuccess_queue_journey_group755eb,
        codeStates['success_queue_journey_group755eb'] = success_queue_journey_group755ebProps,
        codeStates['setsuccess_queue_journey_group755eb'] = setsuccess_queue_journey_group755ebProps,
        codeStates['return_queue_tab'] = return_queue_tab5611e,
        codeStates['setreturn_queue_tab'] = setreturn_queue_tab5611e,
        codeStates['return_queue_tab5611e'] = return_queue_tab5611eProps,
        codeStates['setreturn_queue_tab5611e'] = setreturn_queue_tab5611eProps,
        codeStates['return_queue_journey_group'] = return_queue_journey_group92c55,
        codeStates['setreturn_queue_journey_group'] = setreturn_queue_journey_group92c55,
        codeStates['return_queue_journey_group92c55'] = return_queue_journey_group92c55Props,
        codeStates['setreturn_queue_journey_group92c55'] = setreturn_queue_journey_group92c55Props,
        codeStates['return_queue_table'] = return_queue_table267f0,
        codeStates['setreturn_queue_table'] = setreturn_queue_table267f0,
        codeStates['return_queue_table267f0'] = return_queue_table267f0Props,
        codeStates['setreturn_queue_table267f0'] = setreturn_queue_table267f0Props,
        codeStates['operational_pending_tab'] = operational_pending_tab67331,
        codeStates['setoperational_pending_tab'] = setoperational_pending_tab67331,
        codeStates['operational_pending_tab67331'] = operational_pending_tab67331Props,
        codeStates['setoperational_pending_tab67331'] = setoperational_pending_tab67331Props,
        codeStates['operational_pending_table'] = operational_pending_table0a253,
        codeStates['setoperational_pending_table'] = setoperational_pending_table0a253,
        codeStates['operational_pending_table0a253'] = operational_pending_table0a253Props,
        codeStates['setoperational_pending_table0a253'] = setoperational_pending_table0a253Props,
        codeStates['value_date_operational_pending'] = value_date_operational_pending6ecd4,
        codeStates['setvalue_date_operational_pending'] = setvalue_date_operational_pending6ecd4,
        codeStates['dr_account_operational_pending'] = dr_account_operational_pending2ab87,
        codeStates['setdr_account_operational_pending'] = setdr_account_operational_pending2ab87,
        codeStates['dr_name_operational_pending'] = dr_name_operational_pendinga8ff6,
        codeStates['setdr_name_operational_pending'] = setdr_name_operational_pendinga8ff6,
        codeStates['dr_currency_operational_pending'] = dr_currency_operational_pending5146b,
        codeStates['setdr_currency_operational_pending'] = setdr_currency_operational_pending5146b,
        codeStates['dr_amount_operational_pending'] = dr_amount_operational_pending70e3f,
        codeStates['setdr_amount_operational_pending'] = setdr_amount_operational_pending70e3f,
        codeStates['cr_account_operational_pending'] = cr_account_operational_pendingf9a9c,
        codeStates['setcr_account_operational_pending'] = setcr_account_operational_pendingf9a9c,
        codeStates['cr_name_operational_pending'] = cr_name_operational_pendingbce21,
        codeStates['setcr_name_operational_pending'] = setcr_name_operational_pendingbce21,
        codeStates['cr_currency_operational_pending'] = cr_currency_operational_pending282bc,
        codeStates['setcr_currency_operational_pending'] = setcr_currency_operational_pending282bc,
        codeStates['cr_amount_operational_pending'] = cr_amount_operational_pending0df81,
        codeStates['setcr_amount_operational_pending'] = setcr_amount_operational_pending0df81,
        codeStates['new_payment_chk_verify_btn'] = new_payment_chk_verify_btn3918d,
        codeStates['setnew_payment_chk_verify_btn'] = setnew_payment_chk_verify_btn3918d,
        codeStates['opr_pending_chk_authorize_btn'] = opr_pending_chk_authorize_btne1fa7,
        codeStates['setopr_pending_chk_authorize_btn'] = setopr_pending_chk_authorize_btne1fa7,
        codeStates['opr_pending_chk_approve_btn'] = opr_pending_chk_approve_btn33fe9,
        codeStates['setopr_pending_chk_approve_btn'] = setopr_pending_chk_approve_btn33fe9,
        codeStates['opr_pending_chk_reject_btn'] = opr_pending_chk_reject_btn18529,
        codeStates['setopr_pending_chk_reject_btn'] = setopr_pending_chk_reject_btn18529,
        codeStates['opr_pending_mk_already_posted_btn'] = opr_pending_mk_already_posted_btn4eb90,
        codeStates['setopr_pending_mk_already_posted_btn'] = setopr_pending_mk_already_posted_btn4eb90,
        codeStates['opr_pending_mk_retry_btn'] = opr_pending_mk_retry_btn4af05,
        codeStates['setopr_pending_mk_retry_btn'] = setopr_pending_mk_retry_btn4af05,
        codeStates['opr_pending_mk_reject_btn'] = opr_pending_mk_reject_btnb2c93,
        codeStates['setopr_pending_mk_reject_btn'] = setopr_pending_mk_reject_btnb2c93,
        codeStates['opr_pending_mk_repost_btn'] = opr_pending_mk_repost_btn4506c,
        codeStates['setopr_pending_mk_repost_btn'] = setopr_pending_mk_repost_btn4506c,
        codeStates['opr_pending_mk_push_next_step_btn'] = opr_pending_mk_push_next_step_btn631df,
        codeStates['setopr_pending_mk_push_next_step_btn'] = setopr_pending_mk_push_next_step_btn631df,
        codeStates['opr_pending_mk_reverse_btn'] = opr_pending_mk_reverse_btndab56,
        codeStates['setopr_pending_mk_reverse_btn'] = setopr_pending_mk_reverse_btndab56,
        codeStates['opr_pending_mk_ip_return_btn'] = opr_pending_mk_ip_return_btnb715b,
        codeStates['setopr_pending_mk_ip_return_btn'] = setopr_pending_mk_ip_return_btnb715b,
        codeStates['opr_pending_mk_repair_btn'] = opr_pending_mk_repair_btnc91a5,
        codeStates['setopr_pending_mk_repair_btn'] = setopr_pending_mk_repair_btnc91a5,
        codeStates['opr_pending_chk_ip_verify_return_btn'] = opr_pending_chk_ip_verify_return_btnb8342,
        codeStates['setopr_pending_chk_ip_verify_return_btn'] = setopr_pending_chk_ip_verify_return_btnb8342,
        codeStates['opr_pending_mk_op_return_btn'] = opr_pending_mk_op_return_btn311fd,
        codeStates['setopr_pending_mk_op_return_btn'] = setopr_pending_mk_op_return_btn311fd,
        codeStates['opr_pending_chk_op_return_verify_btn'] = opr_pending_chk_op_return_verify_btne3f5b,
        codeStates['setopr_pending_chk_op_return_verify_btn'] = setopr_pending_chk_op_return_verify_btne3f5b,
        codeStates['opr_pending_mk_force_pass_btn'] = opr_pending_mk_force_pass_btnc0708,
        codeStates['setopr_pending_mk_force_pass_btn'] = setopr_pending_mk_force_pass_btnc0708,
        codeStates['opr_pending_op_mk_applysplrate_btn'] = opr_pending_op_mk_applysplrate_btn52343,
        codeStates['setopr_pending_op_mk_applysplrate_btn'] = setopr_pending_op_mk_applysplrate_btn52343,
        codeStates['opr_pending_ip_mkr_applysplrate_btn'] = opr_pending_ip_mkr_applysplrate_btna62ff,
        codeStates['setopr_pending_ip_mkr_applysplrate_btn'] = setopr_pending_ip_mkr_applysplrate_btna62ff,
        codeStates['uuid_operational_pending'] = uuid_operational_pendinga5f0a,
        codeStates['setuuid_operational_pending'] = setuuid_operational_pendinga5f0a,
        codeStates['opr_pending_chk_op_appl_spl_rate_verfiy'] = opr_pending_chk_op_appl_spl_rate_verfiy592a5,
        codeStates['setopr_pending_chk_op_appl_spl_rate_verfiy'] = setopr_pending_chk_op_appl_spl_rate_verfiy592a5,
        codeStates['opr_pending_chk_ip_appl_spl_rate_verfiy'] = opr_pending_chk_ip_appl_spl_rate_verfiyca082,
        codeStates['setopr_pending_chk_ip_appl_spl_rate_verfiy'] = setopr_pending_chk_ip_appl_spl_rate_verfiyca082,
        codeStates['operational_pending_journey_group'] = operational_pending_journey_group63667,
        codeStates['setoperational_pending_journey_group'] = setoperational_pending_journey_group63667,
        codeStates['operational_pending_journey_group63667'] = operational_pending_journey_group63667Props,
        codeStates['setoperational_pending_journey_group63667'] = setoperational_pending_journey_group63667Props,
        codeStates['technical_pending_tab'] = technical_pending_tab0b23f,
        codeStates['settechnical_pending_tab'] = settechnical_pending_tab0b23f,
        codeStates['technical_pending_tab0b23f'] = technical_pending_tab0b23fProps,
        codeStates['settechnical_pending_tab0b23f'] = settechnical_pending_tab0b23fProps,
        codeStates['technical_pending_table'] = technical_pending_table84f30,
        codeStates['settechnical_pending_table'] = settechnical_pending_table84f30,
        codeStates['technical_pending_table84f30'] = technical_pending_table84f30Props,
        codeStates['settechnical_pending_table84f30'] = settechnical_pending_table84f30Props,
        codeStates['technical_pending_journey_group'] = technical_pending_journey_groupe4f03,
        codeStates['settechnical_pending_journey_group'] = settechnical_pending_journey_groupe4f03,
        codeStates['technical_pending_journey_groupe4f03'] = technical_pending_journey_groupe4f03Props,
        codeStates['settechnical_pending_journey_groupe4f03'] = settechnical_pending_journey_groupe4f03Props,
        codeStates['notification_pending_tab'] = notification_pending_tab223c7,
        codeStates['setnotification_pending_tab'] = setnotification_pending_tab223c7,
        codeStates['notification_pending_tab223c7'] = notification_pending_tab223c7Props,
        codeStates['setnotification_pending_tab223c7'] = setnotification_pending_tab223c7Props,
        codeStates['notification_pending_table'] = notification_pending_table45836,
        codeStates['setnotification_pending_table'] = setnotification_pending_table45836,
        codeStates['notification_pending_table45836'] = notification_pending_table45836Props,
        codeStates['setnotification_pending_table45836'] = setnotification_pending_table45836Props,
        codeStates['notification_pending_journey_group'] = notification_pending_journey_groupc9534,
        codeStates['setnotification_pending_journey_group'] = setnotification_pending_journey_groupc9534,
        codeStates['notification_pending_journey_groupc9534'] = notification_pending_journey_groupc9534Props,
        codeStates['setnotification_pending_journey_groupc9534'] = setnotification_pending_journey_groupc9534Props,
        codeStates['enquiry_tab'] = enquiry_tabfb252,
        codeStates['setenquiry_tab'] = setenquiry_tabfb252,
        codeStates['enquiry_tabfb252'] = enquiry_tabfb252Props,
        codeStates['setenquiry_tabfb252'] = setenquiry_tabfb252Props,
        codeStates['enquiry_table'] = enquiry_tableb3b4e,
        codeStates['setenquiry_table'] = setenquiry_tableb3b4e,
        codeStates['enquiry_tableb3b4e'] = enquiry_tableb3b4eProps,
        codeStates['setenquiry_tableb3b4e'] = setenquiry_tableb3b4eProps,
        codeStates['enquiry_journey_group'] = enquiry_journey_group047c9,
        codeStates['setenquiry_journey_group'] = setenquiry_journey_group047c9,
        codeStates['enquiry_journey_group047c9'] = enquiry_journey_group047c9Props,
        codeStates['setenquiry_journey_group047c9'] = setenquiry_journey_group047c9Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const operational_pending_table0a253Ref = useRef<any>(null);
  const handleClearSearch = () => {
    operational_pending_table0a253Ref.current?.setSearchParams();
    operational_pending_table0a253Ref.current?.handleSearch({});
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
        !Array.isArray(operational_pending_table0a253) &&
        Object.keys(operational_pending_table0a253)?.length > 0
      ) {
        setoperational_pending_table0a253({})
        setoperational_pending_table0a253Props((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [operational_pending_table0a253Props?.refresh])


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
        gridColumn: '1 / 21',
        gridRow: '1 / 145',
      
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
      className={`flex flex-col overflow-auto rounded-md  ${isDark ? 'text-white' : 'text-black'}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          settransactionproduct_v1((pre:any)=>({...pre,_selectedGroup_:"operational_pending_table"}))
        }}
    >
      <div className='flex flex-col h-full w-full min-w-0 overflow-auto'>
        <div className='flex flex-1 w-full min-h-0'>
       {<Tableoperational_pending_table headerButtonsRenders={renderBUttons}
        tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} paginationDetails={paginationDetails} open={open} setOpen={setOpen} ref={operational_pending_table0a253Ref} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData} setIsProcessing={setIsProcessing} groupData={groupData} controlData={controlData}/>}
      </div>
      </div>
    </div>
 )
}

export default Groupoperational_pending_table
