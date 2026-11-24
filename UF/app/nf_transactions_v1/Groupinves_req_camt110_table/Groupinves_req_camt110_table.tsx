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
import Tableinves_req_camt110_table  from './Tableinves_req_camt110_table';  
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupinves_req_camt110_table = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
      "channel_name_inves_req_camt110",
      "uuid_inves_req_camt110",
      "dr_account_inves_req_camt110",
      "dr_name_inves_req_camt110",
      "cr_account_inves_req_camt110",
      "cr_name_inves_req_camt110",
      "cr_currency_inves_req_camt110",
      "cr_amount_inves_req_camt110",
      "message_code_inves_req_camt110",
      "tran_date_inves_req_camt110",
      "inves_req_camt110_mk_initiate_btn",
      "inves_req_camt110_chk_verify_btn"
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
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operational Officer": {
    "allowedControls": [
      "channel_name_inves_req_camt110",
      "uuid_inves_req_camt110",
      "dr_account_inves_req_camt110",
      "dr_name_inves_req_camt110",
      "cr_account_inves_req_camt110",
      "cr_name_inves_req_camt110",
      "cr_currency_inves_req_camt110",
      "cr_amount_inves_req_camt110",
      "message_code_inves_req_camt110",
      "tran_date_inves_req_camt110",
      "inves_req_camt110_mk_initiate_btn",
      "inves_req_camt110_chk_verify_btn"
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
  const {cancel_request_camt055_journey_groupd18a2, setcancel_request_camt055_journey_groupd18a2}= useContext(TotalContext) as TotalContextProps;
  const {cancel_request_camt055_journey_groupd18a2Props, setcancel_request_camt055_journey_groupd18a2Props}= useContext(TotalContext) as TotalContextProps;
  const {inves_req_camt110_tab81869, setinves_req_camt110_tab81869}= useContext(TotalContext) as TotalContextProps;
  const {inves_req_camt110_tab81869Props, setinves_req_camt110_tab81869Props}= useContext(TotalContext) as TotalContextProps;
  const {inves_req_camt110_tablefa00e, setinves_req_camt110_tablefa00e}= useContext(TotalContext) as TotalContextProps;
  const {inves_req_camt110_tablefa00eProps, setinves_req_camt110_tablefa00eProps}= useContext(TotalContext) as TotalContextProps;
  const {channel_name_inves_req_camt110026bb, setchannel_name_inves_req_camt110026bb}= useContext(TotalContext) as TotalContextProps;
  const {uuid_inves_req_camt110c3172, setuuid_inves_req_camt110c3172}= useContext(TotalContext) as TotalContextProps;
  const {dr_account_inves_req_camt110a53ed, setdr_account_inves_req_camt110a53ed}= useContext(TotalContext) as TotalContextProps;
  const {dr_name_inves_req_camt1101105a, setdr_name_inves_req_camt1101105a}= useContext(TotalContext) as TotalContextProps;
  const {cr_account_inves_req_camt110492e3, setcr_account_inves_req_camt110492e3}= useContext(TotalContext) as TotalContextProps;
  const {cr_name_inves_req_camt110dc531, setcr_name_inves_req_camt110dc531}= useContext(TotalContext) as TotalContextProps;
  const {cr_currency_inves_req_camt110e2b2d, setcr_currency_inves_req_camt110e2b2d}= useContext(TotalContext) as TotalContextProps;
  const {cr_amount_inves_req_camt11060ab5, setcr_amount_inves_req_camt11060ab5}= useContext(TotalContext) as TotalContextProps;
  const {message_code_inves_req_camt11064432, setmessage_code_inves_req_camt11064432}= useContext(TotalContext) as TotalContextProps;
  const {tran_date_inves_req_camt110772d7, settran_date_inves_req_camt110772d7}= useContext(TotalContext) as TotalContextProps;
  const {inves_req_camt110_mk_initiate_btn3da3f, setinves_req_camt110_mk_initiate_btn3da3f}= useContext(TotalContext) as TotalContextProps;
  const {inves_req_camt110_chk_verify_btn97d7c, setinves_req_camt110_chk_verify_btn97d7c}= useContext(TotalContext) as TotalContextProps;
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
    'GroupInvesReqCamt110Table',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "ecefaaa12a714b72a69e2249cf2fa00e");
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
    setinves_req_camt110_tablefa00eProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("channel_name_inves_req_camt110")){
        setchannel_name_inves_req_camt110026bb((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(channel_name_inves_req_camt110026bb?.isDisabled==null)
      {
        setchannel_name_inves_req_camt110026bb((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("uuid_inves_req_camt110")){
        setuuid_inves_req_camt110c3172((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(uuid_inves_req_camt110c3172?.isDisabled==null)
      {
        setuuid_inves_req_camt110c3172((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("dr_account_inves_req_camt110")){
        setdr_account_inves_req_camt110a53ed((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(dr_account_inves_req_camt110a53ed?.isDisabled==null)
      {
        setdr_account_inves_req_camt110a53ed((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("dr_name_inves_req_camt110")){
        setdr_name_inves_req_camt1101105a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(dr_name_inves_req_camt1101105a?.isDisabled==null)
      {
        setdr_name_inves_req_camt1101105a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cr_account_inves_req_camt110")){
        setcr_account_inves_req_camt110492e3((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(cr_account_inves_req_camt110492e3?.isDisabled==null)
      {
        setcr_account_inves_req_camt110492e3((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cr_name_inves_req_camt110")){
        setcr_name_inves_req_camt110dc531((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(cr_name_inves_req_camt110dc531?.isDisabled==null)
      {
        setcr_name_inves_req_camt110dc531((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cr_currency_inves_req_camt110")){
        setcr_currency_inves_req_camt110e2b2d((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(cr_currency_inves_req_camt110e2b2d?.isDisabled==null)
      {
        setcr_currency_inves_req_camt110e2b2d((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cr_amount_inves_req_camt110")){
        setcr_amount_inves_req_camt11060ab5((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(cr_amount_inves_req_camt11060ab5?.isDisabled==null)
      {
        setcr_amount_inves_req_camt11060ab5((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("message_code_inves_req_camt110")){
        setmessage_code_inves_req_camt11064432((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(message_code_inves_req_camt11064432?.isDisabled==null)
      {
        setmessage_code_inves_req_camt11064432((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("tran_date_inves_req_camt110")){
        settran_date_inves_req_camt110772d7((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(tran_date_inves_req_camt110772d7?.isDisabled==null)
      {
        settran_date_inves_req_camt110772d7((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("inves_req_camt110_mk_initiate_btn")){
        setinves_req_camt110_mk_initiate_btn3da3f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(inves_req_camt110_mk_initiate_btn3da3f?.isDisabled==null)
      {
        setinves_req_camt110_mk_initiate_btn3da3f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("inves_req_camt110_chk_verify_btn")){
        setinves_req_camt110_chk_verify_btn97d7c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(inves_req_camt110_chk_verify_btn97d7c?.isDisabled==null)
      {
        setinves_req_camt110_chk_verify_btn97d7c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "ecefaaa12a714b72a69e2249cf2fa00e");
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
        codeStates['channel_name_inves_req_camt110'] = channel_name_inves_req_camt110026bb,
        codeStates['setchannel_name_inves_req_camt110'] = setchannel_name_inves_req_camt110026bb,
        codeStates['uuid_inves_req_camt110'] = uuid_inves_req_camt110c3172,
        codeStates['setuuid_inves_req_camt110'] = setuuid_inves_req_camt110c3172,
        codeStates['dr_account_inves_req_camt110'] = dr_account_inves_req_camt110a53ed,
        codeStates['setdr_account_inves_req_camt110'] = setdr_account_inves_req_camt110a53ed,
        codeStates['dr_name_inves_req_camt110'] = dr_name_inves_req_camt1101105a,
        codeStates['setdr_name_inves_req_camt110'] = setdr_name_inves_req_camt1101105a,
        codeStates['cr_account_inves_req_camt110'] = cr_account_inves_req_camt110492e3,
        codeStates['setcr_account_inves_req_camt110'] = setcr_account_inves_req_camt110492e3,
        codeStates['cr_name_inves_req_camt110'] = cr_name_inves_req_camt110dc531,
        codeStates['setcr_name_inves_req_camt110'] = setcr_name_inves_req_camt110dc531,
        codeStates['cr_currency_inves_req_camt110'] = cr_currency_inves_req_camt110e2b2d,
        codeStates['setcr_currency_inves_req_camt110'] = setcr_currency_inves_req_camt110e2b2d,
        codeStates['cr_amount_inves_req_camt110'] = cr_amount_inves_req_camt11060ab5,
        codeStates['setcr_amount_inves_req_camt110'] = setcr_amount_inves_req_camt11060ab5,
        codeStates['message_code_inves_req_camt110'] = message_code_inves_req_camt11064432,
        codeStates['setmessage_code_inves_req_camt110'] = setmessage_code_inves_req_camt11064432,
        codeStates['tran_date_inves_req_camt110'] = tran_date_inves_req_camt110772d7,
        codeStates['settran_date_inves_req_camt110'] = settran_date_inves_req_camt110772d7,
        codeStates['inves_req_camt110_mk_initiate_btn'] = inves_req_camt110_mk_initiate_btn3da3f,
        codeStates['setinves_req_camt110_mk_initiate_btn'] = setinves_req_camt110_mk_initiate_btn3da3f,
        codeStates['inves_req_camt110_chk_verify_btn'] = inves_req_camt110_chk_verify_btn97d7c,
        codeStates['setinves_req_camt110_chk_verify_btn'] = setinves_req_camt110_chk_verify_btn97d7c,
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


  const inves_req_camt110_tablefa00eRef = useRef<any>(null);
  const handleClearSearch = () => {
    inves_req_camt110_tablefa00eRef.current?.setSearchParams();
    inves_req_camt110_tablefa00eRef.current?.handleSearch({});
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
        !Array.isArray(inves_req_camt110_tablefa00e) &&
        Object.keys(inves_req_camt110_tablefa00e)?.length > 0
      ) {
        setinves_req_camt110_tablefa00e({})
        setinves_req_camt110_tablefa00eProps((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [inves_req_camt110_tablefa00eProps?.refresh])


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
        gridRow: '1 / 191',
      
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
          setnftransactionproduct_v1((pre:any)=>({...pre,_selectedGroup_:"inves_req_camt110_table"}))
        }}
    >
      <div className='flex flex-col h-full w-full min-w-0 overflow-auto'>
        <div className='flex flex-1 w-full min-h-0'>
       {<Tableinves_req_camt110_table headerButtonsRenders={renderBUttons}
        tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} paginationDetails={paginationDetails} open={open} setOpen={setOpen} ref={inves_req_camt110_tablefa00eRef} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData} setIsProcessing={setIsProcessing} groupData={groupData} controlData={controlData}/>}
      </div>
      </div>
    </div>
 )
}

export default Groupinves_req_camt110_table
