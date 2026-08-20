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
import TextInputop_setl_product_code  from "./TextInputop_setl_product_code";
import Textproduct_code_setl_op  from "./Textproduct_code_setl_op";
import Textmsg_type_op_setlmnt  from "./Textmsg_type_op_setlmnt";
import TextInputop_setl_message_type  from "./TextInputop_setl_message_type";
import DatePickerop_setl_date  from "./DatePickerop_setl_date";
import Textdate_op_setlmnt  from "./Textdate_op_setlmnt";
import Textuuid_op_setlmnt  from "./Textuuid_op_setlmnt";
import TextInputuuid_op_settlmnt  from "./TextInputuuid_op_settlmnt";
import Buttonop_setlmnt_submit  from "./Buttonop_setlmnt_submit";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupop_settlement_grp = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
      "op_setl_product_code",
      "product_code_setl_op",
      "msg_type_op_setlmnt",
      "op_setl_message_type",
      "op_setl_date",
      "date_op_setlmnt",
      "uuid_op_setlmnt",
      "uuid_op_settlmnt",
      "op_setlmnt_submit"
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
    "readOnlyControls": []
  },
  "Operational Officer": {
    "allowedControls": [
      "op_setl_product_code",
      "product_code_setl_op",
      "msg_type_op_setlmnt",
      "op_setl_message_type",
      "op_setl_date",
      "date_op_setlmnt",
      "uuid_op_setlmnt",
      "uuid_op_settlmnt",
      "op_setlmnt_submit"
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
  const {simulator_main_group0541e, setsimulator_main_group0541e}= useContext(TotalContext) as TotalContextProps;
  const {simulator_main_group0541eProps, setsimulator_main_group0541eProps}= useContext(TotalContext) as TotalContextProps;
  const {simulator_tab_groupfd732, setsimulator_tab_groupfd732}= useContext(TotalContext) as TotalContextProps;
  const {simulator_tab_groupfd732Props, setsimulator_tab_groupfd732Props}= useContext(TotalContext) as TotalContextProps;
  const {op_financial4735b, setop_financial4735b}= useContext(TotalContext) as TotalContextProps;
  const {op_financial4735bProps, setop_financial4735bProps}= useContext(TotalContext) as TotalContextProps;
  const {op_financial_grp8a39a, setop_financial_grp8a39a}= useContext(TotalContext) as TotalContextProps;
  const {op_financial_grp8a39aProps, setop_financial_grp8a39aProps}= useContext(TotalContext) as TotalContextProps;
  const {op_settlemente399b, setop_settlemente399b}= useContext(TotalContext) as TotalContextProps;
  const {op_settlemente399bProps, setop_settlemente399bProps}= useContext(TotalContext) as TotalContextProps;
  const {op_settlement_grpb706d, setop_settlement_grpb706d}= useContext(TotalContext) as TotalContextProps;
  const {op_settlement_grpb706dProps, setop_settlement_grpb706dProps}= useContext(TotalContext) as TotalContextProps;
  const {op_setl_product_code63258, setop_setl_product_code63258}= useContext(TotalContext) as TotalContextProps;
  const {product_code_setl_op20fab, setproduct_code_setl_op20fab}= useContext(TotalContext) as TotalContextProps;
  const {msg_type_op_setlmnta011a, setmsg_type_op_setlmnta011a}= useContext(TotalContext) as TotalContextProps;
  const {op_setl_message_type41552, setop_setl_message_type41552}= useContext(TotalContext) as TotalContextProps;
  const {op_setl_date62e49, setop_setl_date62e49}= useContext(TotalContext) as TotalContextProps;
  const {date_op_setlmntaf3c2, setdate_op_setlmntaf3c2}= useContext(TotalContext) as TotalContextProps;
  const {uuid_op_setlmntffbc8, setuuid_op_setlmntffbc8}= useContext(TotalContext) as TotalContextProps;
  const {uuid_op_settlmnt831e5, setuuid_op_settlmnt831e5}= useContext(TotalContext) as TotalContextProps;
  const {op_setlmnt_submit05756, setop_setlmnt_submit05756}= useContext(TotalContext) as TotalContextProps;
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
    'GroupOpSettlementGrp',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "7ec4ecaee2d14b21944723cef4db706d");
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
    setop_settlement_grpb706dProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("op_setl_product_code")){
        setop_setl_product_code63258((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(op_setl_product_code63258?.isDisabled==null)
      {
        setop_setl_product_code63258((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("product_code_setl_op")){
        setproduct_code_setl_op20fab((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(product_code_setl_op20fab?.isDisabled==null)
      {
        setproduct_code_setl_op20fab((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("msg_type_op_setlmnt")){
        setmsg_type_op_setlmnta011a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(msg_type_op_setlmnta011a?.isDisabled==null)
      {
        setmsg_type_op_setlmnta011a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("op_setl_message_type")){
        setop_setl_message_type41552((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(op_setl_message_type41552?.isDisabled==null)
      {
        setop_setl_message_type41552((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("op_setl_date")){
        setop_setl_date62e49((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(op_setl_date62e49?.isDisabled==null)
      {
        setop_setl_date62e49((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("date_op_setlmnt")){
        setdate_op_setlmntaf3c2((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(date_op_setlmntaf3c2?.isDisabled==null)
      {
        setdate_op_setlmntaf3c2((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("uuid_op_setlmnt")){
        setuuid_op_setlmntffbc8((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(uuid_op_setlmntffbc8?.isDisabled==null)
      {
        setuuid_op_setlmntffbc8((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("uuid_op_settlmnt")){
        setuuid_op_settlmnt831e5((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(uuid_op_settlmnt831e5?.isDisabled==null)
      {
        setuuid_op_settlmnt831e5((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("op_setlmnt_submit")){
        setop_setlmnt_submit05756((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(op_setlmnt_submit05756?.isDisabled==null)
      {
        setop_setlmnt_submit05756((pre:any)=>({...pre,isDisabled:false}));
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
        codeStates['op_settlement'] = op_settlemente399b,
        codeStates['setop_settlement'] = setop_settlemente399b,
        codeStates['op_settlemente399b'] = op_settlemente399bProps,
        codeStates['setop_settlemente399b'] = setop_settlemente399bProps,
        codeStates['op_settlement_grp'] = op_settlement_grpb706d,
        codeStates['setop_settlement_grp'] = setop_settlement_grpb706d,
        codeStates['op_settlement_grpb706d'] = op_settlement_grpb706dProps,
        codeStates['setop_settlement_grpb706d'] = setop_settlement_grpb706dProps,
        codeStates['op_setl_product_code'] = op_setl_product_code63258,
        codeStates['setop_setl_product_code'] = setop_setl_product_code63258,
        codeStates['product_code_setl_op'] = product_code_setl_op20fab,
        codeStates['setproduct_code_setl_op'] = setproduct_code_setl_op20fab,
        codeStates['msg_type_op_setlmnt'] = msg_type_op_setlmnta011a,
        codeStates['setmsg_type_op_setlmnt'] = setmsg_type_op_setlmnta011a,
        codeStates['op_setl_message_type'] = op_setl_message_type41552,
        codeStates['setop_setl_message_type'] = setop_setl_message_type41552,
        codeStates['op_setl_date'] = op_setl_date62e49,
        codeStates['setop_setl_date'] = setop_setl_date62e49,
        codeStates['date_op_setlmnt'] = date_op_setlmntaf3c2,
        codeStates['setdate_op_setlmnt'] = setdate_op_setlmntaf3c2,
        codeStates['uuid_op_setlmnt'] = uuid_op_setlmntffbc8,
        codeStates['setuuid_op_setlmnt'] = setuuid_op_setlmntffbc8,
        codeStates['uuid_op_settlmnt'] = uuid_op_settlmnt831e5,
        codeStates['setuuid_op_settlmnt'] = setuuid_op_settlmnt831e5,
        codeStates['op_setlmnt_submit'] = op_setlmnt_submit05756,
        codeStates['setop_setlmnt_submit'] = setop_setlmnt_submit05756,
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
        codeStates['op_settlement'] = op_settlemente399b,
        codeStates['setop_settlement'] = setop_settlemente399b,
        codeStates['op_settlemente399b'] = op_settlemente399bProps,
        codeStates['setop_settlemente399b'] = setop_settlemente399bProps,
        codeStates['op_settlement_grp'] = op_settlement_grpb706d,
        codeStates['setop_settlement_grp'] = setop_settlement_grpb706d,
        codeStates['op_settlement_grpb706d'] = op_settlement_grpb706dProps,
        codeStates['setop_settlement_grpb706d'] = setop_settlement_grpb706dProps,
        codeStates['op_setl_product_code'] = op_setl_product_code63258,
        codeStates['setop_setl_product_code'] = setop_setl_product_code63258,
        codeStates['product_code_setl_op'] = product_code_setl_op20fab,
        codeStates['setproduct_code_setl_op'] = setproduct_code_setl_op20fab,
        codeStates['msg_type_op_setlmnt'] = msg_type_op_setlmnta011a,
        codeStates['setmsg_type_op_setlmnt'] = setmsg_type_op_setlmnta011a,
        codeStates['op_setl_message_type'] = op_setl_message_type41552,
        codeStates['setop_setl_message_type'] = setop_setl_message_type41552,
        codeStates['op_setl_date'] = op_setl_date62e49,
        codeStates['setop_setl_date'] = setop_setl_date62e49,
        codeStates['date_op_setlmnt'] = date_op_setlmntaf3c2,
        codeStates['setdate_op_setlmnt'] = setdate_op_setlmntaf3c2,
        codeStates['uuid_op_setlmnt'] = uuid_op_setlmntffbc8,
        codeStates['setuuid_op_setlmnt'] = setuuid_op_setlmntffbc8,
        codeStates['uuid_op_settlmnt'] = uuid_op_settlmnt831e5,
        codeStates['setuuid_op_settlmnt'] = setuuid_op_settlmnt831e5,
        codeStates['op_setlmnt_submit'] = op_setlmnt_submit05756,
        codeStates['setop_setlmnt_submit'] = setop_setlmnt_submit05756,
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


  const op_settlement_grpb706dRef = useRef<any>(null);
  const handleClearSearch = () => {
    op_settlement_grpb706dRef.current?.setSearchParams();
    op_settlement_grpb706dRef.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(op_settlement_grpb706d) && Object.keys(op_settlement_grpb706d)?.length>0)
      {
        setop_settlement_grpb706d({})
      }
    }else 
      prevRefreshRef.current= true
  }, [op_settlement_grpb706dProps?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '2 / 24',
        gridRow: '1 / 54',
      
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
          setsimulatorprocessui_v1((pre:any)=>({...pre,_selectedGroup_:"op_settlement_grp"}))
        }}
    >
        {allowedControls.includes("op_setl_product_code") ?<TextInputop_setl_product_code   /* 63258 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("product_code_setl_op") ?<Textproduct_code_setl_op   /* 20fab */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("msg_type_op_setlmnt") ?<Textmsg_type_op_setlmnt   /* a011a */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("op_setl_message_type") ?<TextInputop_setl_message_type   /* 41552 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("op_setl_date") ?<DatePickerop_setl_date   /* 62e49 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("date_op_setlmnt") ?<Textdate_op_setlmnt   /* af3c2 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("uuid_op_setlmnt") ?<Textuuid_op_setlmnt   /* ffbc8 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("uuid_op_settlmnt") ?<TextInputuuid_op_settlmnt   /* 831e5 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {        ((ruleData?.length>0 && "op_setlmnt_submit" in ButtonGoRuleData)?ButtonGoRuleData["op_setlmnt_submit"]:true) && 
          allowedControls.includes("op_setlmnt_submit")  ?            <Buttonop_setlmnt_submit tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
    </div>
 )
}

export default Groupop_settlement_grp
