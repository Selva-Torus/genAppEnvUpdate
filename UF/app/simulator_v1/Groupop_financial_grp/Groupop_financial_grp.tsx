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
import TextInputproduct_code_op  from "./TextInputproduct_code_op";
import Textproduct_code_op_financ  from "./Textproduct_code_op_financ";
import TextInputmessage_type_op  from "./TextInputmessage_type_op";
import Textmessage_type_op_financ  from "./Textmessage_type_op_financ";
import DatePickerdate_op  from "./DatePickerdate_op";
import Textdate_op_fianc  from "./Textdate_op_fianc";
import TextInputuuid_op  from "./TextInputuuid_op";
import Textuuid_op_financ  from "./Textuuid_op_financ";
import Dropdownstatus_op  from "./Dropdownstatus_op";
import Textstatus_op_financ  from "./Textstatus_op_financ";
import Dropdownreject_reason_op  from "./Dropdownreject_reason_op";
import Textrej_reasn_op_financ  from "./Textrej_reasn_op_financ";
import Buttonsubmit_op  from "./Buttonsubmit_op";
import CustomWidgetcustomwidget  from "./CustomWidgetcustomwidget";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupop_financial_grp = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_returnreasondfd_v1Props, setdfd_returnreasondfd_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "product_code_op",
      "product_code_op_financ",
      "message_type_op",
      "message_type_op_financ",
      "date_op",
      "date_op_fianc",
      "uuid_op",
      "uuid_op_financ",
      "status_op",
      "status_op_financ",
      "reject_reason_op",
      "rej_reasn_op_financ",
      "submit_op",
      "customwidget"
    ],
    "allowedGroups": [
      "canvas",
      "simulator_main_group",
      "simulator_tab_group",
      "op_financial",
      "op_financial_grp",
      "op_settlement",
      "op_settlement_grp",
      "ip_financial",
      "ip_debtor_dtls",
      "ip_creditor_dtls",
      "payment_dtls",
      "addionl_info",
      "button_grp"
    ],
    "blockedControls": [],
    "readOnlyControls": [
      "customwidget"
    ]
  },
  "Operational Officer": {
    "allowedControls": [
      "product_code_op",
      "product_code_op_financ",
      "message_type_op",
      "message_type_op_financ",
      "date_op",
      "date_op_fianc",
      "uuid_op",
      "uuid_op_financ",
      "status_op",
      "status_op_financ",
      "reject_reason_op",
      "rej_reasn_op_financ",
      "submit_op",
      "customwidget"
    ],
    "allowedGroups": [
      "canvas",
      "simulator_main_group",
      "simulator_tab_group",
      "op_financial",
      "op_financial_grp",
      "op_settlement",
      "op_settlement_grp",
      "ip_financial",
      "ip_debtor_dtls",
      "ip_creditor_dtls",
      "payment_dtls",
      "addionl_info",
      "button_grp"
    ],
    "blockedControls": [],
    "readOnlyControls": [
      "customwidget"
    ]
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
  const {simulator_main_group0541e, setsimulator_main_group0541e}= useContext(TotalContext) as TotalContextProps;
  const {simulator_main_group0541eProps, setsimulator_main_group0541eProps}= useContext(TotalContext) as TotalContextProps;
  const {simulator_tab_groupfd732, setsimulator_tab_groupfd732}= useContext(TotalContext) as TotalContextProps;
  const {simulator_tab_groupfd732Props, setsimulator_tab_groupfd732Props}= useContext(TotalContext) as TotalContextProps;
  const {op_financial4735b, setop_financial4735b}= useContext(TotalContext) as TotalContextProps;
  const {op_financial4735bProps, setop_financial4735bProps}= useContext(TotalContext) as TotalContextProps;
  const {op_financial_grp8a39a, setop_financial_grp8a39a}= useContext(TotalContext) as TotalContextProps;
  const {op_financial_grp8a39aProps, setop_financial_grp8a39aProps}= useContext(TotalContext) as TotalContextProps;
  const {product_code_op8fcb1, setproduct_code_op8fcb1}= useContext(TotalContext) as TotalContextProps;
  const {product_code_op_financ92df8, setproduct_code_op_financ92df8}= useContext(TotalContext) as TotalContextProps;
  const {message_type_opc2fc6, setmessage_type_opc2fc6}= useContext(TotalContext) as TotalContextProps;
  const {message_type_op_financcbd29, setmessage_type_op_financcbd29}= useContext(TotalContext) as TotalContextProps;
  const {date_op9a41b, setdate_op9a41b}= useContext(TotalContext) as TotalContextProps;
  const {date_op_fianc516b0, setdate_op_fianc516b0}= useContext(TotalContext) as TotalContextProps;
  const {uuid_op4c851, setuuid_op4c851}= useContext(TotalContext) as TotalContextProps;
  const {uuid_op_financb7282, setuuid_op_financb7282}= useContext(TotalContext) as TotalContextProps;
  const {status_op98685, setstatus_op98685}= useContext(TotalContext) as TotalContextProps;
  const {status_op_financc8de7, setstatus_op_financc8de7}= useContext(TotalContext) as TotalContextProps;
  const {reject_reason_op5ba8d, setreject_reason_op5ba8d}= useContext(TotalContext) as TotalContextProps;
  const {rej_reasn_op_financ13f05, setrej_reasn_op_financ13f05}= useContext(TotalContext) as TotalContextProps;
  const {submit_opcf1e2, setsubmit_opcf1e2}= useContext(TotalContext) as TotalContextProps;
  const {customwidget0c844, setcustomwidget0c844}= useContext(TotalContext) as TotalContextProps;
  const {op_settlemente399b, setop_settlemente399b}= useContext(TotalContext) as TotalContextProps;
  const {op_settlemente399bProps, setop_settlemente399bProps}= useContext(TotalContext) as TotalContextProps;
  const {op_settlement_grpb706d, setop_settlement_grpb706d}= useContext(TotalContext) as TotalContextProps;
  const {op_settlement_grpb706dProps, setop_settlement_grpb706dProps}= useContext(TotalContext) as TotalContextProps;
  const {ip_financial66005, setip_financial66005}= useContext(TotalContext) as TotalContextProps;
  const {ip_financial66005Props, setip_financial66005Props}= useContext(TotalContext) as TotalContextProps;
  const {ip_debtor_dtls8143c, setip_debtor_dtls8143c}= useContext(TotalContext) as TotalContextProps;
  const {ip_debtor_dtls8143cProps, setip_debtor_dtls8143cProps}= useContext(TotalContext) as TotalContextProps;
  const {ip_creditor_dtls1ade4, setip_creditor_dtls1ade4}= useContext(TotalContext) as TotalContextProps;
  const {ip_creditor_dtls1ade4Props, setip_creditor_dtls1ade4Props}= useContext(TotalContext) as TotalContextProps;
  const {payment_dtls30132, setpayment_dtls30132}= useContext(TotalContext) as TotalContextProps;
  const {payment_dtls30132Props, setpayment_dtls30132Props}= useContext(TotalContext) as TotalContextProps;
  const {addionl_info43014, setaddionl_info43014}= useContext(TotalContext) as TotalContextProps;
  const {addionl_info43014Props, setaddionl_info43014Props}= useContext(TotalContext) as TotalContextProps;
  const {button_grp7b9b7, setbutton_grp7b9b7}= useContext(TotalContext) as TotalContextProps;
  const {button_grp7b9b7Props, setbutton_grp7b9b7Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {simulatorprocessui_v1, setsimulatorprocessui_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:RTGS:AFK:simulatorProcessUi:AFVK:v1',
    [user],
    'GroupOpFinancialGrp',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "1687ee1f949f41fdbe50d7088248a39a");
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
    setop_financial_grp8a39aProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("product_code_op")){
        setproduct_code_op8fcb1((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(product_code_op8fcb1?.isDisabled==null)
      {
        setproduct_code_op8fcb1((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("product_code_op_financ")){
        setproduct_code_op_financ92df8((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(product_code_op_financ92df8?.isDisabled==null)
      {
        setproduct_code_op_financ92df8((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("message_type_op")){
        setmessage_type_opc2fc6((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(message_type_opc2fc6?.isDisabled==null)
      {
        setmessage_type_opc2fc6((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("message_type_op_financ")){
        setmessage_type_op_financcbd29((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(message_type_op_financcbd29?.isDisabled==null)
      {
        setmessage_type_op_financcbd29((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("date_op")){
        setdate_op9a41b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(date_op9a41b?.isDisabled==null)
      {
        setdate_op9a41b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("date_op_fianc")){
        setdate_op_fianc516b0((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(date_op_fianc516b0?.isDisabled==null)
      {
        setdate_op_fianc516b0((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("uuid_op")){
        setuuid_op4c851((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(uuid_op4c851?.isDisabled==null)
      {
        setuuid_op4c851((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("uuid_op_financ")){
        setuuid_op_financb7282((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(uuid_op_financb7282?.isDisabled==null)
      {
        setuuid_op_financb7282((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("status_op")){
        setstatus_op98685((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(status_op98685?.isDisabled==null)
      {
        setstatus_op98685((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("status_op_financ")){
        setstatus_op_financc8de7((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(status_op_financc8de7?.isDisabled==null)
      {
        setstatus_op_financc8de7((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("reject_reason_op")){
        setreject_reason_op5ba8d((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(reject_reason_op5ba8d?.isDisabled==null)
      {
        setreject_reason_op5ba8d((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("rej_reasn_op_financ")){
        setrej_reasn_op_financ13f05((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(rej_reasn_op_financ13f05?.isDisabled==null)
      {
        setrej_reasn_op_financ13f05((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("submit_op")){
        setsubmit_opcf1e2((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(submit_opcf1e2?.isDisabled==null)
      {
        setsubmit_opcf1e2((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("customwidget")){
        setcustomwidget0c844((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(customwidget0c844?.isDisabled==null)
      {
        setcustomwidget0c844((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['simulator_main_group'] = simulator_main_group0541e,
        codeStates['setsimulator_main_group'] = setsimulator_main_group0541e,
        codeStates['simulator_main_group0541e'] = simulator_main_group0541eProps,
        codeStates['setsimulator_main_group0541e'] = setsimulator_main_group0541eProps,
        codeStates['simulator_tab_group'] = simulator_tab_groupfd732,
        codeStates['setsimulator_tab_group'] = setsimulator_tab_groupfd732,
        codeStates['simulator_tab_groupfd732'] = simulator_tab_groupfd732Props,
        codeStates['setsimulator_tab_groupfd732'] = setsimulator_tab_groupfd732Props,
        codeStates['op_financial'] = op_financial4735b,
        codeStates['setop_financial'] = setop_financial4735b,
        codeStates['op_financial4735b'] = op_financial4735bProps,
        codeStates['setop_financial4735b'] = setop_financial4735bProps,
        codeStates['op_financial_grp'] = op_financial_grp8a39a,
        codeStates['setop_financial_grp'] = setop_financial_grp8a39a,
        codeStates['op_financial_grp8a39a'] = op_financial_grp8a39aProps,
        codeStates['setop_financial_grp8a39a'] = setop_financial_grp8a39aProps,
        codeStates['product_code_op'] = product_code_op8fcb1,
        codeStates['setproduct_code_op'] = setproduct_code_op8fcb1,
        codeStates['product_code_op_financ'] = product_code_op_financ92df8,
        codeStates['setproduct_code_op_financ'] = setproduct_code_op_financ92df8,
        codeStates['message_type_op'] = message_type_opc2fc6,
        codeStates['setmessage_type_op'] = setmessage_type_opc2fc6,
        codeStates['message_type_op_financ'] = message_type_op_financcbd29,
        codeStates['setmessage_type_op_financ'] = setmessage_type_op_financcbd29,
        codeStates['date_op'] = date_op9a41b,
        codeStates['setdate_op'] = setdate_op9a41b,
        codeStates['date_op_fianc'] = date_op_fianc516b0,
        codeStates['setdate_op_fianc'] = setdate_op_fianc516b0,
        codeStates['uuid_op'] = uuid_op4c851,
        codeStates['setuuid_op'] = setuuid_op4c851,
        codeStates['uuid_op_financ'] = uuid_op_financb7282,
        codeStates['setuuid_op_financ'] = setuuid_op_financb7282,
        codeStates['status_op'] = status_op98685,
        codeStates['setstatus_op'] = setstatus_op98685,
        codeStates['status_op_financ'] = status_op_financc8de7,
        codeStates['setstatus_op_financ'] = setstatus_op_financc8de7,
        codeStates['reject_reason_op'] = reject_reason_op5ba8d,
        codeStates['setreject_reason_op'] = setreject_reason_op5ba8d,
        codeStates['rej_reasn_op_financ'] = rej_reasn_op_financ13f05,
        codeStates['setrej_reasn_op_financ'] = setrej_reasn_op_financ13f05,
        codeStates['submit_op'] = submit_opcf1e2,
        codeStates['setsubmit_op'] = setsubmit_opcf1e2,
        codeStates['customwidget'] = customwidget0c844,
        codeStates['setcustomwidget'] = setcustomwidget0c844,
        codeStates['op_settlement'] = op_settlemente399b,
        codeStates['setop_settlement'] = setop_settlemente399b,
        codeStates['op_settlemente399b'] = op_settlemente399bProps,
        codeStates['setop_settlemente399b'] = setop_settlemente399bProps,
        codeStates['op_settlement_grp'] = op_settlement_grpb706d,
        codeStates['setop_settlement_grp'] = setop_settlement_grpb706d,
        codeStates['op_settlement_grpb706d'] = op_settlement_grpb706dProps,
        codeStates['setop_settlement_grpb706d'] = setop_settlement_grpb706dProps,
        codeStates['ip_financial'] = ip_financial66005,
        codeStates['setip_financial'] = setip_financial66005,
        codeStates['ip_financial66005'] = ip_financial66005Props,
        codeStates['setip_financial66005'] = setip_financial66005Props,
        codeStates['ip_debtor_dtls'] = ip_debtor_dtls8143c,
        codeStates['setip_debtor_dtls'] = setip_debtor_dtls8143c,
        codeStates['ip_debtor_dtls8143c'] = ip_debtor_dtls8143cProps,
        codeStates['setip_debtor_dtls8143c'] = setip_debtor_dtls8143cProps,
        codeStates['ip_creditor_dtls'] = ip_creditor_dtls1ade4,
        codeStates['setip_creditor_dtls'] = setip_creditor_dtls1ade4,
        codeStates['ip_creditor_dtls1ade4'] = ip_creditor_dtls1ade4Props,
        codeStates['setip_creditor_dtls1ade4'] = setip_creditor_dtls1ade4Props,
        codeStates['payment_dtls'] = payment_dtls30132,
        codeStates['setpayment_dtls'] = setpayment_dtls30132,
        codeStates['payment_dtls30132'] = payment_dtls30132Props,
        codeStates['setpayment_dtls30132'] = setpayment_dtls30132Props,
        codeStates['addionl_info'] = addionl_info43014,
        codeStates['setaddionl_info'] = setaddionl_info43014,
        codeStates['addionl_info43014'] = addionl_info43014Props,
        codeStates['setaddionl_info43014'] = setaddionl_info43014Props,
        codeStates['button_grp'] = button_grp7b9b7,
        codeStates['setbutton_grp'] = setbutton_grp7b9b7,
        codeStates['button_grp7b9b7'] = button_grp7b9b7Props,
        codeStates['setbutton_grp7b9b7'] = setbutton_grp7b9b7Props,

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
        codeStates['simulator_main_group'] = simulator_main_group0541e,
        codeStates['setsimulator_main_group'] = setsimulator_main_group0541e,
        codeStates['simulator_main_group0541e'] = simulator_main_group0541eProps,
        codeStates['setsimulator_main_group0541e'] = setsimulator_main_group0541eProps,
        codeStates['simulator_tab_group'] = simulator_tab_groupfd732,
        codeStates['setsimulator_tab_group'] = setsimulator_tab_groupfd732,
        codeStates['simulator_tab_groupfd732'] = simulator_tab_groupfd732Props,
        codeStates['setsimulator_tab_groupfd732'] = setsimulator_tab_groupfd732Props,
        codeStates['op_financial'] = op_financial4735b,
        codeStates['setop_financial'] = setop_financial4735b,
        codeStates['op_financial4735b'] = op_financial4735bProps,
        codeStates['setop_financial4735b'] = setop_financial4735bProps,
        codeStates['op_financial_grp'] = op_financial_grp8a39a,
        codeStates['setop_financial_grp'] = setop_financial_grp8a39a,
        codeStates['op_financial_grp8a39a'] = op_financial_grp8a39aProps,
        codeStates['setop_financial_grp8a39a'] = setop_financial_grp8a39aProps,
        codeStates['product_code_op'] = product_code_op8fcb1,
        codeStates['setproduct_code_op'] = setproduct_code_op8fcb1,
        codeStates['product_code_op_financ'] = product_code_op_financ92df8,
        codeStates['setproduct_code_op_financ'] = setproduct_code_op_financ92df8,
        codeStates['message_type_op'] = message_type_opc2fc6,
        codeStates['setmessage_type_op'] = setmessage_type_opc2fc6,
        codeStates['message_type_op_financ'] = message_type_op_financcbd29,
        codeStates['setmessage_type_op_financ'] = setmessage_type_op_financcbd29,
        codeStates['date_op'] = date_op9a41b,
        codeStates['setdate_op'] = setdate_op9a41b,
        codeStates['date_op_fianc'] = date_op_fianc516b0,
        codeStates['setdate_op_fianc'] = setdate_op_fianc516b0,
        codeStates['uuid_op'] = uuid_op4c851,
        codeStates['setuuid_op'] = setuuid_op4c851,
        codeStates['uuid_op_financ'] = uuid_op_financb7282,
        codeStates['setuuid_op_financ'] = setuuid_op_financb7282,
        codeStates['status_op'] = status_op98685,
        codeStates['setstatus_op'] = setstatus_op98685,
        codeStates['status_op_financ'] = status_op_financc8de7,
        codeStates['setstatus_op_financ'] = setstatus_op_financc8de7,
        codeStates['reject_reason_op'] = reject_reason_op5ba8d,
        codeStates['setreject_reason_op'] = setreject_reason_op5ba8d,
        codeStates['rej_reasn_op_financ'] = rej_reasn_op_financ13f05,
        codeStates['setrej_reasn_op_financ'] = setrej_reasn_op_financ13f05,
        codeStates['submit_op'] = submit_opcf1e2,
        codeStates['setsubmit_op'] = setsubmit_opcf1e2,
        codeStates['customwidget'] = customwidget0c844,
        codeStates['setcustomwidget'] = setcustomwidget0c844,
        codeStates['op_settlement'] = op_settlemente399b,
        codeStates['setop_settlement'] = setop_settlemente399b,
        codeStates['op_settlemente399b'] = op_settlemente399bProps,
        codeStates['setop_settlemente399b'] = setop_settlemente399bProps,
        codeStates['op_settlement_grp'] = op_settlement_grpb706d,
        codeStates['setop_settlement_grp'] = setop_settlement_grpb706d,
        codeStates['op_settlement_grpb706d'] = op_settlement_grpb706dProps,
        codeStates['setop_settlement_grpb706d'] = setop_settlement_grpb706dProps,
        codeStates['ip_financial'] = ip_financial66005,
        codeStates['setip_financial'] = setip_financial66005,
        codeStates['ip_financial66005'] = ip_financial66005Props,
        codeStates['setip_financial66005'] = setip_financial66005Props,
        codeStates['ip_debtor_dtls'] = ip_debtor_dtls8143c,
        codeStates['setip_debtor_dtls'] = setip_debtor_dtls8143c,
        codeStates['ip_debtor_dtls8143c'] = ip_debtor_dtls8143cProps,
        codeStates['setip_debtor_dtls8143c'] = setip_debtor_dtls8143cProps,
        codeStates['ip_creditor_dtls'] = ip_creditor_dtls1ade4,
        codeStates['setip_creditor_dtls'] = setip_creditor_dtls1ade4,
        codeStates['ip_creditor_dtls1ade4'] = ip_creditor_dtls1ade4Props,
        codeStates['setip_creditor_dtls1ade4'] = setip_creditor_dtls1ade4Props,
        codeStates['payment_dtls'] = payment_dtls30132,
        codeStates['setpayment_dtls'] = setpayment_dtls30132,
        codeStates['payment_dtls30132'] = payment_dtls30132Props,
        codeStates['setpayment_dtls30132'] = setpayment_dtls30132Props,
        codeStates['addionl_info'] = addionl_info43014,
        codeStates['setaddionl_info'] = setaddionl_info43014,
        codeStates['addionl_info43014'] = addionl_info43014Props,
        codeStates['setaddionl_info43014'] = setaddionl_info43014Props,
        codeStates['button_grp'] = button_grp7b9b7,
        codeStates['setbutton_grp'] = setbutton_grp7b9b7,
        codeStates['button_grp7b9b7'] = button_grp7b9b7Props,
        codeStates['setbutton_grp7b9b7'] = setbutton_grp7b9b7Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const op_financial_grp8a39aRef = useRef<any>(null);
  const handleClearSearch = () => {
    op_financial_grp8a39aRef.current?.setSearchParams();
    op_financial_grp8a39aRef.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(op_financial_grp8a39a) && Object.keys(op_financial_grp8a39a)?.length>0)
      {
        setop_financial_grp8a39a({})
      }
    }else 
      prevRefreshRef.current= true
  }, [op_financial_grp8a39aProps?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '2 / 24',
        gridRow: '1 / 71',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '5px',
        backgroundColor:'#f4f5fa',
        backgroundImage:"url('')",
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
      className={`flex flex-col overflow-auto rounded-md p-3 ${isDark ? 'text-white' : 'text-black'}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setsimulatorprocessui_v1((pre:any)=>({...pre,_selectedGroup_:"op_financial_grp"}))
        }}
    >
        {allowedControls.includes("product_code_op") ?<TextInputproduct_code_op   /* 8fcb1 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("product_code_op_financ") ?<Textproduct_code_op_financ   /* 92df8 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("message_type_op") ?<TextInputmessage_type_op   /* c2fc6 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("message_type_op_financ") ?<Textmessage_type_op_financ   /* cbd29 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("date_op") ?<DatePickerdate_op   /* 9a41b */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("date_op_fianc") ?<Textdate_op_fianc   /* 516b0 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("uuid_op") ?<TextInputuuid_op   /* 4c851 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("uuid_op_financ") ?<Textuuid_op_financ   /* b7282 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("status_op") ?<Dropdownstatus_op   /* 98685 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
          {allowedControls.includes("status_op_financ") ?<Textstatus_op_financ   /* c8de7 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("reject_reason_op") ?<Dropdownreject_reason_op   /* 5ba8d */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
          {allowedControls.includes("rej_reasn_op_financ") ?<Textrej_reasn_op_financ   /* 13f05 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {        ((ruleData?.length>0 && "submit_op" in ButtonGoRuleData)?ButtonGoRuleData["submit_op"]:true) && 
          allowedControls.includes("submit_op")  ?            <Buttonsubmit_op tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {allowedControls.includes("customwidget") ?<CustomWidgetcustomwidget /* 0c844 */ encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupop_financial_grp
