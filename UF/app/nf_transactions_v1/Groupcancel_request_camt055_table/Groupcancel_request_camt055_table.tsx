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
import Tablecancel_request_camt055_table  from './Tablecancel_request_camt055_table';  
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupcancel_request_camt055_table = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_nftransaction_v1Props, setdfd_nftransaction_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_journey_v1Props, setdfd_journey_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_nfviewalltransaction_v1Props, setdfd_nfviewalltransaction_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "uuid_can_req_camt055",
      "dr_account_can_req_camt055",
      "dr_name_can_req_camt055",
      "cr_account_can_req_camt055",
      "cr_name_can_req_camt055",
      "cr_currency_can_req_camt055",
      "cr_amount_can_req_camt055",
      "cancel_request_camt055_mk_initiate_btn",
      "cancel_request_camt055_chk_verify_btn",
      "message_code_can_req_camt055",
      "tran_date_can_req_camt055"
    ],
    "allowedGroups": [
      "canvas",
      "tran_main_group",
      "tran_tab_group",
      "view_all_tab",
      "view_all_table",
      "view_all_journey_group",
      "cancel_equest_camt055_tab",
      "cancel_request_camt055_table",
      "cancel_request_camt055_journey_group",
      "inves_req_camt110_tab",
      "inves_req_camt110_table",
      "inves_req_camt110_journey_group",
      "investigation_response_camt111_tab",
      "inves_res_camt111_table",
      "inves_res_camt111_journey_group"
    ],
    "blockedControls": [
      "channel_name_can_req_camt055"
    ],
    "readOnlyControls": []
  },
  "Operational Officer": {
    "allowedControls": [
      "uuid_can_req_camt055",
      "dr_account_can_req_camt055",
      "dr_name_can_req_camt055",
      "cr_account_can_req_camt055",
      "cr_name_can_req_camt055",
      "cr_currency_can_req_camt055",
      "cr_amount_can_req_camt055",
      "cancel_request_camt055_mk_initiate_btn",
      "cancel_request_camt055_chk_verify_btn",
      "message_code_can_req_camt055",
      "tran_date_can_req_camt055"
    ],
    "allowedGroups": [
      "canvas",
      "tran_main_group",
      "tran_tab_group",
      "view_all_tab",
      "view_all_table",
      "view_all_journey_group",
      "cancel_equest_camt055_tab",
      "cancel_request_camt055_table",
      "cancel_request_camt055_journey_group",
      "inves_req_camt110_tab",
      "inves_req_camt110_table",
      "inves_req_camt110_journey_group",
      "investigation_response_camt111_tab",
      "inves_res_camt111_table",
      "inves_res_camt111_journey_group"
    ],
    "blockedControls": [
      "channel_name_can_req_camt055"
    ],
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
  const {tran_main_group9581a, settran_main_group9581a}= useContext(TotalContext) as TotalContextProps;
  const {tran_main_group9581aProps, settran_main_group9581aProps}= useContext(TotalContext) as TotalContextProps;
  const {tran_tab_group2a929, settran_tab_group2a929}= useContext(TotalContext) as TotalContextProps;
  const {tran_tab_group2a929Props, settran_tab_group2a929Props}= useContext(TotalContext) as TotalContextProps;
  const {view_all_tab9a177, setview_all_tab9a177}= useContext(TotalContext) as TotalContextProps;
  const {view_all_tab9a177Props, setview_all_tab9a177Props}= useContext(TotalContext) as TotalContextProps;
  const {view_all_tableccb40, setview_all_tableccb40}= useContext(TotalContext) as TotalContextProps;
  const {view_all_tableccb40Props, setview_all_tableccb40Props}= useContext(TotalContext) as TotalContextProps;
  const {view_all_journey_groupca47a, setview_all_journey_groupca47a}= useContext(TotalContext) as TotalContextProps;
  const {view_all_journey_groupca47aProps, setview_all_journey_groupca47aProps}= useContext(TotalContext) as TotalContextProps;
  const {cancel_equest_camt055_tabf8dc6, setcancel_equest_camt055_tabf8dc6}= useContext(TotalContext) as TotalContextProps;
  const {cancel_equest_camt055_tabf8dc6Props, setcancel_equest_camt055_tabf8dc6Props}= useContext(TotalContext) as TotalContextProps;
  const {cancel_request_camt055_table9e976, setcancel_request_camt055_table9e976}= useContext(TotalContext) as TotalContextProps;
  const {cancel_request_camt055_table9e976Props, setcancel_request_camt055_table9e976Props}= useContext(TotalContext) as TotalContextProps;
  const {channel_name_can_req_camt055f27d8, setchannel_name_can_req_camt055f27d8}= useContext(TotalContext) as TotalContextProps;
  const {uuid_can_req_camt0558430a, setuuid_can_req_camt0558430a}= useContext(TotalContext) as TotalContextProps;
  const {dr_account_can_req_camt055050c7, setdr_account_can_req_camt055050c7}= useContext(TotalContext) as TotalContextProps;
  const {dr_name_can_req_camt055679dd, setdr_name_can_req_camt055679dd}= useContext(TotalContext) as TotalContextProps;
  const {cr_account_can_req_camt0555b65e, setcr_account_can_req_camt0555b65e}= useContext(TotalContext) as TotalContextProps;
  const {cr_name_can_req_camt055bcc5f, setcr_name_can_req_camt055bcc5f}= useContext(TotalContext) as TotalContextProps;
  const {cr_currency_can_req_camt0556e4f6, setcr_currency_can_req_camt0556e4f6}= useContext(TotalContext) as TotalContextProps;
  const {cr_amount_can_req_camt0550e8b4, setcr_amount_can_req_camt0550e8b4}= useContext(TotalContext) as TotalContextProps;
  const {cancel_request_camt055_mk_initiate_btn2902f, setcancel_request_camt055_mk_initiate_btn2902f}= useContext(TotalContext) as TotalContextProps;
  const {cancel_request_camt055_chk_verify_btn42585, setcancel_request_camt055_chk_verify_btn42585}= useContext(TotalContext) as TotalContextProps;
  const {message_code_can_req_camt055532c4, setmessage_code_can_req_camt055532c4}= useContext(TotalContext) as TotalContextProps;
  const {tran_date_can_req_camt055ea19b, settran_date_can_req_camt055ea19b}= useContext(TotalContext) as TotalContextProps;
  const {cancel_request_camt055_journey_groupd18a2, setcancel_request_camt055_journey_groupd18a2}= useContext(TotalContext) as TotalContextProps;
  const {cancel_request_camt055_journey_groupd18a2Props, setcancel_request_camt055_journey_groupd18a2Props}= useContext(TotalContext) as TotalContextProps;
  const {inves_req_camt110_tab81869, setinves_req_camt110_tab81869}= useContext(TotalContext) as TotalContextProps;
  const {inves_req_camt110_tab81869Props, setinves_req_camt110_tab81869Props}= useContext(TotalContext) as TotalContextProps;
  const {inves_req_camt110_tablefa00e, setinves_req_camt110_tablefa00e}= useContext(TotalContext) as TotalContextProps;
  const {inves_req_camt110_tablefa00eProps, setinves_req_camt110_tablefa00eProps}= useContext(TotalContext) as TotalContextProps;
  const {inves_req_camt110_journey_groupca738, setinves_req_camt110_journey_groupca738}= useContext(TotalContext) as TotalContextProps;
  const {inves_req_camt110_journey_groupca738Props, setinves_req_camt110_journey_groupca738Props}= useContext(TotalContext) as TotalContextProps;
  const {investigation_response_camt111_tabf6177, setinvestigation_response_camt111_tabf6177}= useContext(TotalContext) as TotalContextProps;
  const {investigation_response_camt111_tabf6177Props, setinvestigation_response_camt111_tabf6177Props}= useContext(TotalContext) as TotalContextProps;
  const {inves_res_camt111_table0f401, setinves_res_camt111_table0f401}= useContext(TotalContext) as TotalContextProps;
  const {inves_res_camt111_table0f401Props, setinves_res_camt111_table0f401Props}= useContext(TotalContext) as TotalContextProps;
  const {inves_res_camt111_journey_group785d4, setinves_res_camt111_journey_group785d4}= useContext(TotalContext) as TotalContextProps;
  const {inves_res_camt111_journey_group785d4Props, setinves_res_camt111_journey_group785d4Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {nftransactionproduct_v1, setnftransactionproduct_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:nfTransactionProduct:AFVK:v1',
    [user],
    'GroupCancelRequestCamt055Table',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "153e79bf7820e18f32009096e809e976");
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
    setcancel_request_camt055_table9e976Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("channel_name_can_req_camt055")){
        setchannel_name_can_req_camt055f27d8((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(channel_name_can_req_camt055f27d8?.isDisabled==null)
      {
        setchannel_name_can_req_camt055f27d8((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("uuid_can_req_camt055")){
        setuuid_can_req_camt0558430a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(uuid_can_req_camt0558430a?.isDisabled==null)
      {
        setuuid_can_req_camt0558430a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("dr_account_can_req_camt055")){
        setdr_account_can_req_camt055050c7((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(dr_account_can_req_camt055050c7?.isDisabled==null)
      {
        setdr_account_can_req_camt055050c7((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("dr_name_can_req_camt055")){
        setdr_name_can_req_camt055679dd((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(dr_name_can_req_camt055679dd?.isDisabled==null)
      {
        setdr_name_can_req_camt055679dd((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cr_account_can_req_camt055")){
        setcr_account_can_req_camt0555b65e((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(cr_account_can_req_camt0555b65e?.isDisabled==null)
      {
        setcr_account_can_req_camt0555b65e((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cr_name_can_req_camt055")){
        setcr_name_can_req_camt055bcc5f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(cr_name_can_req_camt055bcc5f?.isDisabled==null)
      {
        setcr_name_can_req_camt055bcc5f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cr_currency_can_req_camt055")){
        setcr_currency_can_req_camt0556e4f6((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(cr_currency_can_req_camt0556e4f6?.isDisabled==null)
      {
        setcr_currency_can_req_camt0556e4f6((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cr_amount_can_req_camt055")){
        setcr_amount_can_req_camt0550e8b4((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(cr_amount_can_req_camt0550e8b4?.isDisabled==null)
      {
        setcr_amount_can_req_camt0550e8b4((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cancel_request_camt055_mk_initiate_btn")){
        setcancel_request_camt055_mk_initiate_btn2902f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(cancel_request_camt055_mk_initiate_btn2902f?.isDisabled==null)
      {
        setcancel_request_camt055_mk_initiate_btn2902f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cancel_request_camt055_chk_verify_btn")){
        setcancel_request_camt055_chk_verify_btn42585((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(cancel_request_camt055_chk_verify_btn42585?.isDisabled==null)
      {
        setcancel_request_camt055_chk_verify_btn42585((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("message_code_can_req_camt055")){
        setmessage_code_can_req_camt055532c4((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(message_code_can_req_camt055532c4?.isDisabled==null)
      {
        setmessage_code_can_req_camt055532c4((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("tran_date_can_req_camt055")){
        settran_date_can_req_camt055ea19b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(tran_date_can_req_camt055ea19b?.isDisabled==null)
      {
        settran_date_can_req_camt055ea19b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "153e79bf7820e18f32009096e809e976");
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
        codeStates['tran_main_group'] = tran_main_group9581a,
        codeStates['settran_main_group'] = settran_main_group9581a,
        codeStates['tran_main_group9581a'] = tran_main_group9581aProps,
        codeStates['settran_main_group9581a'] = settran_main_group9581aProps,
        codeStates['tran_tab_group'] = tran_tab_group2a929,
        codeStates['settran_tab_group'] = settran_tab_group2a929,
        codeStates['tran_tab_group2a929'] = tran_tab_group2a929Props,
        codeStates['settran_tab_group2a929'] = settran_tab_group2a929Props,
        codeStates['view_all_tab'] = view_all_tab9a177,
        codeStates['setview_all_tab'] = setview_all_tab9a177,
        codeStates['view_all_tab9a177'] = view_all_tab9a177Props,
        codeStates['setview_all_tab9a177'] = setview_all_tab9a177Props,
        codeStates['view_all_table'] = view_all_tableccb40,
        codeStates['setview_all_table'] = setview_all_tableccb40,
        codeStates['view_all_tableccb40'] = view_all_tableccb40Props,
        codeStates['setview_all_tableccb40'] = setview_all_tableccb40Props,
        codeStates['view_all_journey_group'] = view_all_journey_groupca47a,
        codeStates['setview_all_journey_group'] = setview_all_journey_groupca47a,
        codeStates['view_all_journey_groupca47a'] = view_all_journey_groupca47aProps,
        codeStates['setview_all_journey_groupca47a'] = setview_all_journey_groupca47aProps,
        codeStates['cancel_equest_camt055_tab'] = cancel_equest_camt055_tabf8dc6,
        codeStates['setcancel_equest_camt055_tab'] = setcancel_equest_camt055_tabf8dc6,
        codeStates['cancel_equest_camt055_tabf8dc6'] = cancel_equest_camt055_tabf8dc6Props,
        codeStates['setcancel_equest_camt055_tabf8dc6'] = setcancel_equest_camt055_tabf8dc6Props,
        codeStates['cancel_request_camt055_table'] = cancel_request_camt055_table9e976,
        codeStates['setcancel_request_camt055_table'] = setcancel_request_camt055_table9e976,
        codeStates['cancel_request_camt055_table9e976'] = cancel_request_camt055_table9e976Props,
        codeStates['setcancel_request_camt055_table9e976'] = setcancel_request_camt055_table9e976Props,
        codeStates['channel_name_can_req_camt055'] = channel_name_can_req_camt055f27d8,
        codeStates['setchannel_name_can_req_camt055'] = setchannel_name_can_req_camt055f27d8,
        codeStates['uuid_can_req_camt055'] = uuid_can_req_camt0558430a,
        codeStates['setuuid_can_req_camt055'] = setuuid_can_req_camt0558430a,
        codeStates['dr_account_can_req_camt055'] = dr_account_can_req_camt055050c7,
        codeStates['setdr_account_can_req_camt055'] = setdr_account_can_req_camt055050c7,
        codeStates['dr_name_can_req_camt055'] = dr_name_can_req_camt055679dd,
        codeStates['setdr_name_can_req_camt055'] = setdr_name_can_req_camt055679dd,
        codeStates['cr_account_can_req_camt055'] = cr_account_can_req_camt0555b65e,
        codeStates['setcr_account_can_req_camt055'] = setcr_account_can_req_camt0555b65e,
        codeStates['cr_name_can_req_camt055'] = cr_name_can_req_camt055bcc5f,
        codeStates['setcr_name_can_req_camt055'] = setcr_name_can_req_camt055bcc5f,
        codeStates['cr_currency_can_req_camt055'] = cr_currency_can_req_camt0556e4f6,
        codeStates['setcr_currency_can_req_camt055'] = setcr_currency_can_req_camt0556e4f6,
        codeStates['cr_amount_can_req_camt055'] = cr_amount_can_req_camt0550e8b4,
        codeStates['setcr_amount_can_req_camt055'] = setcr_amount_can_req_camt0550e8b4,
        codeStates['cancel_request_camt055_mk_initiate_btn'] = cancel_request_camt055_mk_initiate_btn2902f,
        codeStates['setcancel_request_camt055_mk_initiate_btn'] = setcancel_request_camt055_mk_initiate_btn2902f,
        codeStates['cancel_request_camt055_chk_verify_btn'] = cancel_request_camt055_chk_verify_btn42585,
        codeStates['setcancel_request_camt055_chk_verify_btn'] = setcancel_request_camt055_chk_verify_btn42585,
        codeStates['message_code_can_req_camt055'] = message_code_can_req_camt055532c4,
        codeStates['setmessage_code_can_req_camt055'] = setmessage_code_can_req_camt055532c4,
        codeStates['tran_date_can_req_camt055'] = tran_date_can_req_camt055ea19b,
        codeStates['settran_date_can_req_camt055'] = settran_date_can_req_camt055ea19b,
        codeStates['cancel_request_camt055_journey_group'] = cancel_request_camt055_journey_groupd18a2,
        codeStates['setcancel_request_camt055_journey_group'] = setcancel_request_camt055_journey_groupd18a2,
        codeStates['cancel_request_camt055_journey_groupd18a2'] = cancel_request_camt055_journey_groupd18a2Props,
        codeStates['setcancel_request_camt055_journey_groupd18a2'] = setcancel_request_camt055_journey_groupd18a2Props,
        codeStates['inves_req_camt110_tab'] = inves_req_camt110_tab81869,
        codeStates['setinves_req_camt110_tab'] = setinves_req_camt110_tab81869,
        codeStates['inves_req_camt110_tab81869'] = inves_req_camt110_tab81869Props,
        codeStates['setinves_req_camt110_tab81869'] = setinves_req_camt110_tab81869Props,
        codeStates['inves_req_camt110_table'] = inves_req_camt110_tablefa00e,
        codeStates['setinves_req_camt110_table'] = setinves_req_camt110_tablefa00e,
        codeStates['inves_req_camt110_tablefa00e'] = inves_req_camt110_tablefa00eProps,
        codeStates['setinves_req_camt110_tablefa00e'] = setinves_req_camt110_tablefa00eProps,
        codeStates['inves_req_camt110_journey_group'] = inves_req_camt110_journey_groupca738,
        codeStates['setinves_req_camt110_journey_group'] = setinves_req_camt110_journey_groupca738,
        codeStates['inves_req_camt110_journey_groupca738'] = inves_req_camt110_journey_groupca738Props,
        codeStates['setinves_req_camt110_journey_groupca738'] = setinves_req_camt110_journey_groupca738Props,
        codeStates['investigation_response_camt111_tab'] = investigation_response_camt111_tabf6177,
        codeStates['setinvestigation_response_camt111_tab'] = setinvestigation_response_camt111_tabf6177,
        codeStates['investigation_response_camt111_tabf6177'] = investigation_response_camt111_tabf6177Props,
        codeStates['setinvestigation_response_camt111_tabf6177'] = setinvestigation_response_camt111_tabf6177Props,
        codeStates['inves_res_camt111_table'] = inves_res_camt111_table0f401,
        codeStates['setinves_res_camt111_table'] = setinves_res_camt111_table0f401,
        codeStates['inves_res_camt111_table0f401'] = inves_res_camt111_table0f401Props,
        codeStates['setinves_res_camt111_table0f401'] = setinves_res_camt111_table0f401Props,
        codeStates['inves_res_camt111_journey_group'] = inves_res_camt111_journey_group785d4,
        codeStates['setinves_res_camt111_journey_group'] = setinves_res_camt111_journey_group785d4,
        codeStates['inves_res_camt111_journey_group785d4'] = inves_res_camt111_journey_group785d4Props,
        codeStates['setinves_res_camt111_journey_group785d4'] = setinves_res_camt111_journey_group785d4Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const cancel_request_camt055_table9e976Ref = useRef<any>(null);
  const handleClearSearch = () => {
    cancel_request_camt055_table9e976Ref.current?.setSearchParams();
    cancel_request_camt055_table9e976Ref.current?.handleSearch({});
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
        !Array.isArray(cancel_request_camt055_table9e976) &&
        Object.keys(cancel_request_camt055_table9e976)?.length > 0
      ) {
        setcancel_request_camt055_table9e976({})
        setcancel_request_camt055_table9e976Props((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [cancel_request_camt055_table9e976Props?.refresh])


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
        gridColumn: '1 / 20',
        gridRow: '1 / 192',
      
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
          setnftransactionproduct_v1((pre:any)=>({...pre,_selectedGroup_:"cancel_request_camt055_table"}))
        }}
    >
      <div className='flex flex-col h-full w-full min-w-0 overflow-auto'>
        <div className='flex flex-1 w-full min-h-0'>
       {<Tablecancel_request_camt055_table headerButtonsRenders={renderBUttons}
        tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} paginationDetails={paginationDetails} open={open} setOpen={setOpen} ref={cancel_request_camt055_table9e976Ref} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData} setIsProcessing={setIsProcessing} groupData={groupData} controlData={controlData}/>}
      </div>
      </div>
    </div>
 )
}

export default Groupcancel_request_camt055_table
