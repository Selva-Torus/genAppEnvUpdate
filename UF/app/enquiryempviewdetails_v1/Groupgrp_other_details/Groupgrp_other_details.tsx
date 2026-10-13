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
import Texthdr_sal_details  from "./Texthdr_sal_details";
import Textlbl_s_year  from "./Textlbl_s_year";
import Textlbl_s_prd  from "./Textlbl_s_prd";
import Textlbl_s_frm_dte  from "./Textlbl_s_frm_dte";
import Textlbl_year  from "./Textlbl_year";
import Textlbl_prd  from "./Textlbl_prd";
import Textlbl_from_date  from "./Textlbl_from_date";
import Dividerdivider4  from "./Dividerdivider4";
import Textlbl_s_to_dte  from "./Textlbl_s_to_dte";
import Textlbl_s_sal_pymt_date  from "./Textlbl_s_sal_pymt_date";
import Textlbl_s_days_paid  from "./Textlbl_s_days_paid";
import Textlbl_to_date  from "./Textlbl_to_date";
import Textlbl_file_id  from "./Textlbl_file_id";
import Textlbl_days_paid  from "./Textlbl_days_paid";
import Dividerdivider5  from "./Dividerdivider5";
import Textlbl_s_fix_in  from "./Textlbl_s_fix_in";
import Textlbl_s_in_var  from "./Textlbl_s_in_var";
import Textlbl_s_to_sal  from "./Textlbl_s_to_sal";
import Textlbl_fix_in  from "./Textlbl_fix_in";
import Textlbl_in_var  from "./Textlbl_in_var";
import Textlbl_to_sal  from "./Textlbl_to_sal";
import Dividerdivider6  from "./Dividerdivider6";
import Textlbl_s_to_bene  from "./Textlbl_s_to_bene";
import Textlbl_s_to_deduction  from "./Textlbl_s_to_deduction";
import Textlbl_s_to_allow  from "./Textlbl_s_to_allow";
import Textlbl_to_bene  from "./Textlbl_to_bene";
import Textlbl_to_deduction  from "./Textlbl_to_deduction";
import Textlbl_to_allo  from "./Textlbl_to_allo";
import Dividerdivider7  from "./Dividerdivider7";
import Textlbl_s_to_incen  from "./Textlbl_s_to_incen";
import Textlbl_toince  from "./Textlbl_toince";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupgrp_other_details = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_enquiryemployersalaryrpt_v1Props, setdfd_enquiryemployersalaryrpt_v1Props} = useContext(TotalContext) as TotalContextProps;
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
  "Business Team": {
    "allowedControls": [
      "hdr_sal_details",
      "lbl_s_year",
      "lbl_s_prd",
      "lbl_s_frm_dte",
      "lbl_year",
      "lbl_prd",
      "lbl_from_date",
      "divider4",
      "lbl_s_to_dte",
      "lbl_s_sal_pymt_date",
      "lbl_s_days_paid",
      "lbl_to_date",
      "lbl_file_id",
      "lbl_days_paid",
      "divider5",
      "lbl_s_fix_in",
      "lbl_s_in_var",
      "lbl_s_to_sal",
      "lbl_fix_in",
      "lbl_in_var",
      "lbl_to_sal",
      "divider6",
      "lbl_s_to_bene",
      "lbl_s_to_deduction",
      "lbl_s_to_allow",
      "lbl_to_bene",
      "lbl_to_deduction",
      "lbl_to_allo",
      "divider7",
      "lbl_s_to_incen",
      "lbl_toince"
    ],
    "allowedGroups": [
      "canvas",
      "grp_emp_view_details",
      "grp_emp_details",
      "grp_other_details"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "IT Team": {
    "allowedControls": [
      "hdr_sal_details",
      "lbl_s_year",
      "lbl_s_prd",
      "lbl_s_frm_dte",
      "lbl_year",
      "lbl_prd",
      "lbl_from_date",
      "divider4",
      "lbl_s_to_dte",
      "lbl_s_sal_pymt_date",
      "lbl_s_days_paid",
      "lbl_to_date",
      "lbl_file_id",
      "lbl_days_paid",
      "divider5",
      "lbl_s_fix_in",
      "lbl_s_in_var",
      "lbl_s_to_sal",
      "lbl_fix_in",
      "lbl_in_var",
      "lbl_to_sal",
      "divider6",
      "lbl_s_to_bene",
      "lbl_s_to_deduction",
      "lbl_s_to_allow",
      "lbl_to_bene",
      "lbl_to_deduction",
      "lbl_to_allo",
      "divider7",
      "lbl_s_to_incen",
      "lbl_toince"
    ],
    "allowedGroups": [
      "canvas",
      "grp_emp_view_details",
      "grp_emp_details",
      "grp_other_details"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operation Team": {
    "allowedControls": [
      "hdr_sal_details",
      "lbl_s_year",
      "lbl_s_prd",
      "lbl_s_frm_dte",
      "lbl_year",
      "lbl_prd",
      "lbl_from_date",
      "divider4",
      "lbl_s_to_dte",
      "lbl_s_sal_pymt_date",
      "lbl_s_days_paid",
      "lbl_to_date",
      "lbl_file_id",
      "lbl_days_paid",
      "divider5",
      "lbl_s_fix_in",
      "lbl_s_in_var",
      "lbl_s_to_sal",
      "lbl_fix_in",
      "lbl_in_var",
      "lbl_to_sal",
      "divider6",
      "lbl_s_to_bene",
      "lbl_s_to_deduction",
      "lbl_s_to_allow",
      "lbl_to_bene",
      "lbl_to_deduction",
      "lbl_to_allo",
      "divider7",
      "lbl_s_to_incen",
      "lbl_toince"
    ],
    "allowedGroups": [
      "canvas",
      "grp_emp_view_details",
      "grp_emp_details",
      "grp_other_details"
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
  const {grp_emp_view_details7cca5, setgrp_emp_view_details7cca5}= useContext(TotalContext) as TotalContextProps;
  const {grp_emp_view_details7cca5Props, setgrp_emp_view_details7cca5Props}= useContext(TotalContext) as TotalContextProps;
  const {grp_emp_details5bbf3, setgrp_emp_details5bbf3}= useContext(TotalContext) as TotalContextProps;
  const {grp_emp_details5bbf3Props, setgrp_emp_details5bbf3Props}= useContext(TotalContext) as TotalContextProps;
  const {grp_other_details0dea3, setgrp_other_details0dea3}= useContext(TotalContext) as TotalContextProps;
  const {grp_other_details0dea3Props, setgrp_other_details0dea3Props}= useContext(TotalContext) as TotalContextProps;
  const {hdr_sal_detailscc668, sethdr_sal_detailscc668}= useContext(TotalContext) as TotalContextProps;
  const {lbl_s_year8a7b7, setlbl_s_year8a7b7}= useContext(TotalContext) as TotalContextProps;
  const {lbl_s_prd1d712, setlbl_s_prd1d712}= useContext(TotalContext) as TotalContextProps;
  const {lbl_s_frm_dteaf9ff, setlbl_s_frm_dteaf9ff}= useContext(TotalContext) as TotalContextProps;
  const {lbl_year77e9a, setlbl_year77e9a}= useContext(TotalContext) as TotalContextProps;
  const {lbl_prd231ed, setlbl_prd231ed}= useContext(TotalContext) as TotalContextProps;
  const {lbl_from_date5c572, setlbl_from_date5c572}= useContext(TotalContext) as TotalContextProps;
  const {divider41b7ce, setdivider41b7ce}= useContext(TotalContext) as TotalContextProps;
  const {lbl_s_to_dtec31c3, setlbl_s_to_dtec31c3}= useContext(TotalContext) as TotalContextProps;
  const {lbl_s_sal_pymt_date3433b, setlbl_s_sal_pymt_date3433b}= useContext(TotalContext) as TotalContextProps;
  const {lbl_s_days_paid8f15c, setlbl_s_days_paid8f15c}= useContext(TotalContext) as TotalContextProps;
  const {lbl_to_date68efb, setlbl_to_date68efb}= useContext(TotalContext) as TotalContextProps;
  const {lbl_file_id71627, setlbl_file_id71627}= useContext(TotalContext) as TotalContextProps;
  const {lbl_days_paidfaad7, setlbl_days_paidfaad7}= useContext(TotalContext) as TotalContextProps;
  const {divider54066d, setdivider54066d}= useContext(TotalContext) as TotalContextProps;
  const {lbl_s_fix_in368c0, setlbl_s_fix_in368c0}= useContext(TotalContext) as TotalContextProps;
  const {lbl_s_in_varaf378, setlbl_s_in_varaf378}= useContext(TotalContext) as TotalContextProps;
  const {lbl_s_to_sal357e4, setlbl_s_to_sal357e4}= useContext(TotalContext) as TotalContextProps;
  const {lbl_fix_in1338c, setlbl_fix_in1338c}= useContext(TotalContext) as TotalContextProps;
  const {lbl_in_varb6ce9, setlbl_in_varb6ce9}= useContext(TotalContext) as TotalContextProps;
  const {lbl_to_sal3b4e8, setlbl_to_sal3b4e8}= useContext(TotalContext) as TotalContextProps;
  const {divider6490c6, setdivider6490c6}= useContext(TotalContext) as TotalContextProps;
  const {lbl_s_to_beneaed7e, setlbl_s_to_beneaed7e}= useContext(TotalContext) as TotalContextProps;
  const {lbl_s_to_deduction078ca, setlbl_s_to_deduction078ca}= useContext(TotalContext) as TotalContextProps;
  const {lbl_s_to_allow8942c, setlbl_s_to_allow8942c}= useContext(TotalContext) as TotalContextProps;
  const {lbl_to_bene728c0, setlbl_to_bene728c0}= useContext(TotalContext) as TotalContextProps;
  const {lbl_to_deductionbd7f3, setlbl_to_deductionbd7f3}= useContext(TotalContext) as TotalContextProps;
  const {lbl_to_allo2f67a, setlbl_to_allo2f67a}= useContext(TotalContext) as TotalContextProps;
  const {divider7df1c4, setdivider7df1c4}= useContext(TotalContext) as TotalContextProps;
  const {lbl_s_to_incen9e037, setlbl_s_to_incen9e037}= useContext(TotalContext) as TotalContextProps;
  const {lbl_toince2e251, setlbl_toince2e251}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {enquiryempviewdetails_v1, setenquiryempviewdetails_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:WPS:AFK:enquiryEmpViewDetails:AFVK:v1',
    [user],
    'GroupGrpOtherDetails',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "e27fe5aa6f3bf832f5ea688aeba0dea3");
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
    setgrp_other_details0dea3Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("hdr_sal_details")){
        sethdr_sal_detailscc668((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(hdr_sal_detailscc668?.isDisabled==null)
      {
        sethdr_sal_detailscc668((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("lbl_s_year")){
        setlbl_s_year8a7b7((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(lbl_s_year8a7b7?.isDisabled==null)
      {
        setlbl_s_year8a7b7((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("lbl_s_prd")){
        setlbl_s_prd1d712((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(lbl_s_prd1d712?.isDisabled==null)
      {
        setlbl_s_prd1d712((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("lbl_s_frm_dte")){
        setlbl_s_frm_dteaf9ff((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(lbl_s_frm_dteaf9ff?.isDisabled==null)
      {
        setlbl_s_frm_dteaf9ff((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("lbl_year")){
        setlbl_year77e9a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(lbl_year77e9a?.isDisabled==null)
      {
        setlbl_year77e9a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("lbl_prd")){
        setlbl_prd231ed((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(lbl_prd231ed?.isDisabled==null)
      {
        setlbl_prd231ed((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("lbl_from_date")){
        setlbl_from_date5c572((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(lbl_from_date5c572?.isDisabled==null)
      {
        setlbl_from_date5c572((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("divider4")){
        setdivider41b7ce((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(divider41b7ce?.isDisabled==null)
      {
        setdivider41b7ce((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("lbl_s_to_dte")){
        setlbl_s_to_dtec31c3((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(lbl_s_to_dtec31c3?.isDisabled==null)
      {
        setlbl_s_to_dtec31c3((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("lbl_s_sal_pymt_date")){
        setlbl_s_sal_pymt_date3433b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(lbl_s_sal_pymt_date3433b?.isDisabled==null)
      {
        setlbl_s_sal_pymt_date3433b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("lbl_s_days_paid")){
        setlbl_s_days_paid8f15c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(lbl_s_days_paid8f15c?.isDisabled==null)
      {
        setlbl_s_days_paid8f15c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("lbl_to_date")){
        setlbl_to_date68efb((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(lbl_to_date68efb?.isDisabled==null)
      {
        setlbl_to_date68efb((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("lbl_file_id")){
        setlbl_file_id71627((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(lbl_file_id71627?.isDisabled==null)
      {
        setlbl_file_id71627((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("lbl_days_paid")){
        setlbl_days_paidfaad7((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(lbl_days_paidfaad7?.isDisabled==null)
      {
        setlbl_days_paidfaad7((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("divider5")){
        setdivider54066d((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(divider54066d?.isDisabled==null)
      {
        setdivider54066d((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("lbl_s_fix_in")){
        setlbl_s_fix_in368c0((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(lbl_s_fix_in368c0?.isDisabled==null)
      {
        setlbl_s_fix_in368c0((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("lbl_s_in_var")){
        setlbl_s_in_varaf378((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(lbl_s_in_varaf378?.isDisabled==null)
      {
        setlbl_s_in_varaf378((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("lbl_s_to_sal")){
        setlbl_s_to_sal357e4((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(lbl_s_to_sal357e4?.isDisabled==null)
      {
        setlbl_s_to_sal357e4((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("lbl_fix_in")){
        setlbl_fix_in1338c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(lbl_fix_in1338c?.isDisabled==null)
      {
        setlbl_fix_in1338c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("lbl_in_var")){
        setlbl_in_varb6ce9((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(lbl_in_varb6ce9?.isDisabled==null)
      {
        setlbl_in_varb6ce9((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("lbl_to_sal")){
        setlbl_to_sal3b4e8((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(lbl_to_sal3b4e8?.isDisabled==null)
      {
        setlbl_to_sal3b4e8((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("divider6")){
        setdivider6490c6((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(divider6490c6?.isDisabled==null)
      {
        setdivider6490c6((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("lbl_s_to_bene")){
        setlbl_s_to_beneaed7e((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(lbl_s_to_beneaed7e?.isDisabled==null)
      {
        setlbl_s_to_beneaed7e((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("lbl_s_to_deduction")){
        setlbl_s_to_deduction078ca((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(lbl_s_to_deduction078ca?.isDisabled==null)
      {
        setlbl_s_to_deduction078ca((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("lbl_s_to_allow")){
        setlbl_s_to_allow8942c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(lbl_s_to_allow8942c?.isDisabled==null)
      {
        setlbl_s_to_allow8942c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("lbl_to_bene")){
        setlbl_to_bene728c0((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(lbl_to_bene728c0?.isDisabled==null)
      {
        setlbl_to_bene728c0((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("lbl_to_deduction")){
        setlbl_to_deductionbd7f3((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(lbl_to_deductionbd7f3?.isDisabled==null)
      {
        setlbl_to_deductionbd7f3((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("lbl_to_allo")){
        setlbl_to_allo2f67a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(lbl_to_allo2f67a?.isDisabled==null)
      {
        setlbl_to_allo2f67a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("divider7")){
        setdivider7df1c4((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(divider7df1c4?.isDisabled==null)
      {
        setdivider7df1c4((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("lbl_s_to_incen")){
        setlbl_s_to_incen9e037((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(lbl_s_to_incen9e037?.isDisabled==null)
      {
        setlbl_s_to_incen9e037((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("lbl_toince")){
        setlbl_toince2e251((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(lbl_toince2e251?.isDisabled==null)
      {
        setlbl_toince2e251((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['grp_emp_view_details'] = grp_emp_view_details7cca5,
        codeStates['setgrp_emp_view_details'] = setgrp_emp_view_details7cca5,
        codeStates['grp_emp_view_details7cca5'] = grp_emp_view_details7cca5Props,
        codeStates['setgrp_emp_view_details7cca5'] = setgrp_emp_view_details7cca5Props,
        codeStates['grp_emp_details'] = grp_emp_details5bbf3,
        codeStates['setgrp_emp_details'] = setgrp_emp_details5bbf3,
        codeStates['grp_emp_details5bbf3'] = grp_emp_details5bbf3Props,
        codeStates['setgrp_emp_details5bbf3'] = setgrp_emp_details5bbf3Props,
        codeStates['grp_other_details'] = grp_other_details0dea3,
        codeStates['setgrp_other_details'] = setgrp_other_details0dea3,
        codeStates['grp_other_details0dea3'] = grp_other_details0dea3Props,
        codeStates['setgrp_other_details0dea3'] = setgrp_other_details0dea3Props,
        codeStates['hdr_sal_details'] = hdr_sal_detailscc668,
        codeStates['sethdr_sal_details'] = sethdr_sal_detailscc668,
        codeStates['lbl_s_year'] = lbl_s_year8a7b7,
        codeStates['setlbl_s_year'] = setlbl_s_year8a7b7,
        codeStates['lbl_s_prd'] = lbl_s_prd1d712,
        codeStates['setlbl_s_prd'] = setlbl_s_prd1d712,
        codeStates['lbl_s_frm_dte'] = lbl_s_frm_dteaf9ff,
        codeStates['setlbl_s_frm_dte'] = setlbl_s_frm_dteaf9ff,
        codeStates['lbl_year'] = lbl_year77e9a,
        codeStates['setlbl_year'] = setlbl_year77e9a,
        codeStates['lbl_prd'] = lbl_prd231ed,
        codeStates['setlbl_prd'] = setlbl_prd231ed,
        codeStates['lbl_from_date'] = lbl_from_date5c572,
        codeStates['setlbl_from_date'] = setlbl_from_date5c572,
        codeStates['divider4'] = divider41b7ce,
        codeStates['setdivider4'] = setdivider41b7ce,
        codeStates['lbl_s_to_dte'] = lbl_s_to_dtec31c3,
        codeStates['setlbl_s_to_dte'] = setlbl_s_to_dtec31c3,
        codeStates['lbl_s_sal_pymt_date'] = lbl_s_sal_pymt_date3433b,
        codeStates['setlbl_s_sal_pymt_date'] = setlbl_s_sal_pymt_date3433b,
        codeStates['lbl_s_days_paid'] = lbl_s_days_paid8f15c,
        codeStates['setlbl_s_days_paid'] = setlbl_s_days_paid8f15c,
        codeStates['lbl_to_date'] = lbl_to_date68efb,
        codeStates['setlbl_to_date'] = setlbl_to_date68efb,
        codeStates['lbl_file_id'] = lbl_file_id71627,
        codeStates['setlbl_file_id'] = setlbl_file_id71627,
        codeStates['lbl_days_paid'] = lbl_days_paidfaad7,
        codeStates['setlbl_days_paid'] = setlbl_days_paidfaad7,
        codeStates['divider5'] = divider54066d,
        codeStates['setdivider5'] = setdivider54066d,
        codeStates['lbl_s_fix_in'] = lbl_s_fix_in368c0,
        codeStates['setlbl_s_fix_in'] = setlbl_s_fix_in368c0,
        codeStates['lbl_s_in_var'] = lbl_s_in_varaf378,
        codeStates['setlbl_s_in_var'] = setlbl_s_in_varaf378,
        codeStates['lbl_s_to_sal'] = lbl_s_to_sal357e4,
        codeStates['setlbl_s_to_sal'] = setlbl_s_to_sal357e4,
        codeStates['lbl_fix_in'] = lbl_fix_in1338c,
        codeStates['setlbl_fix_in'] = setlbl_fix_in1338c,
        codeStates['lbl_in_var'] = lbl_in_varb6ce9,
        codeStates['setlbl_in_var'] = setlbl_in_varb6ce9,
        codeStates['lbl_to_sal'] = lbl_to_sal3b4e8,
        codeStates['setlbl_to_sal'] = setlbl_to_sal3b4e8,
        codeStates['divider6'] = divider6490c6,
        codeStates['setdivider6'] = setdivider6490c6,
        codeStates['lbl_s_to_bene'] = lbl_s_to_beneaed7e,
        codeStates['setlbl_s_to_bene'] = setlbl_s_to_beneaed7e,
        codeStates['lbl_s_to_deduction'] = lbl_s_to_deduction078ca,
        codeStates['setlbl_s_to_deduction'] = setlbl_s_to_deduction078ca,
        codeStates['lbl_s_to_allow'] = lbl_s_to_allow8942c,
        codeStates['setlbl_s_to_allow'] = setlbl_s_to_allow8942c,
        codeStates['lbl_to_bene'] = lbl_to_bene728c0,
        codeStates['setlbl_to_bene'] = setlbl_to_bene728c0,
        codeStates['lbl_to_deduction'] = lbl_to_deductionbd7f3,
        codeStates['setlbl_to_deduction'] = setlbl_to_deductionbd7f3,
        codeStates['lbl_to_allo'] = lbl_to_allo2f67a,
        codeStates['setlbl_to_allo'] = setlbl_to_allo2f67a,
        codeStates['divider7'] = divider7df1c4,
        codeStates['setdivider7'] = setdivider7df1c4,
        codeStates['lbl_s_to_incen'] = lbl_s_to_incen9e037,
        codeStates['setlbl_s_to_incen'] = setlbl_s_to_incen9e037,
        codeStates['lbl_toince'] = lbl_toince2e251,
        codeStates['setlbl_toince'] = setlbl_toince2e251,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "e27fe5aa6f3bf832f5ea688aeba0dea3");
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
        codeStates['grp_emp_view_details'] = grp_emp_view_details7cca5,
        codeStates['setgrp_emp_view_details'] = setgrp_emp_view_details7cca5,
        codeStates['grp_emp_view_details7cca5'] = grp_emp_view_details7cca5Props,
        codeStates['setgrp_emp_view_details7cca5'] = setgrp_emp_view_details7cca5Props,
        codeStates['grp_emp_details'] = grp_emp_details5bbf3,
        codeStates['setgrp_emp_details'] = setgrp_emp_details5bbf3,
        codeStates['grp_emp_details5bbf3'] = grp_emp_details5bbf3Props,
        codeStates['setgrp_emp_details5bbf3'] = setgrp_emp_details5bbf3Props,
        codeStates['grp_other_details'] = grp_other_details0dea3,
        codeStates['setgrp_other_details'] = setgrp_other_details0dea3,
        codeStates['grp_other_details0dea3'] = grp_other_details0dea3Props,
        codeStates['setgrp_other_details0dea3'] = setgrp_other_details0dea3Props,
        codeStates['hdr_sal_details'] = hdr_sal_detailscc668,
        codeStates['sethdr_sal_details'] = sethdr_sal_detailscc668,
        codeStates['lbl_s_year'] = lbl_s_year8a7b7,
        codeStates['setlbl_s_year'] = setlbl_s_year8a7b7,
        codeStates['lbl_s_prd'] = lbl_s_prd1d712,
        codeStates['setlbl_s_prd'] = setlbl_s_prd1d712,
        codeStates['lbl_s_frm_dte'] = lbl_s_frm_dteaf9ff,
        codeStates['setlbl_s_frm_dte'] = setlbl_s_frm_dteaf9ff,
        codeStates['lbl_year'] = lbl_year77e9a,
        codeStates['setlbl_year'] = setlbl_year77e9a,
        codeStates['lbl_prd'] = lbl_prd231ed,
        codeStates['setlbl_prd'] = setlbl_prd231ed,
        codeStates['lbl_from_date'] = lbl_from_date5c572,
        codeStates['setlbl_from_date'] = setlbl_from_date5c572,
        codeStates['divider4'] = divider41b7ce,
        codeStates['setdivider4'] = setdivider41b7ce,
        codeStates['lbl_s_to_dte'] = lbl_s_to_dtec31c3,
        codeStates['setlbl_s_to_dte'] = setlbl_s_to_dtec31c3,
        codeStates['lbl_s_sal_pymt_date'] = lbl_s_sal_pymt_date3433b,
        codeStates['setlbl_s_sal_pymt_date'] = setlbl_s_sal_pymt_date3433b,
        codeStates['lbl_s_days_paid'] = lbl_s_days_paid8f15c,
        codeStates['setlbl_s_days_paid'] = setlbl_s_days_paid8f15c,
        codeStates['lbl_to_date'] = lbl_to_date68efb,
        codeStates['setlbl_to_date'] = setlbl_to_date68efb,
        codeStates['lbl_file_id'] = lbl_file_id71627,
        codeStates['setlbl_file_id'] = setlbl_file_id71627,
        codeStates['lbl_days_paid'] = lbl_days_paidfaad7,
        codeStates['setlbl_days_paid'] = setlbl_days_paidfaad7,
        codeStates['divider5'] = divider54066d,
        codeStates['setdivider5'] = setdivider54066d,
        codeStates['lbl_s_fix_in'] = lbl_s_fix_in368c0,
        codeStates['setlbl_s_fix_in'] = setlbl_s_fix_in368c0,
        codeStates['lbl_s_in_var'] = lbl_s_in_varaf378,
        codeStates['setlbl_s_in_var'] = setlbl_s_in_varaf378,
        codeStates['lbl_s_to_sal'] = lbl_s_to_sal357e4,
        codeStates['setlbl_s_to_sal'] = setlbl_s_to_sal357e4,
        codeStates['lbl_fix_in'] = lbl_fix_in1338c,
        codeStates['setlbl_fix_in'] = setlbl_fix_in1338c,
        codeStates['lbl_in_var'] = lbl_in_varb6ce9,
        codeStates['setlbl_in_var'] = setlbl_in_varb6ce9,
        codeStates['lbl_to_sal'] = lbl_to_sal3b4e8,
        codeStates['setlbl_to_sal'] = setlbl_to_sal3b4e8,
        codeStates['divider6'] = divider6490c6,
        codeStates['setdivider6'] = setdivider6490c6,
        codeStates['lbl_s_to_bene'] = lbl_s_to_beneaed7e,
        codeStates['setlbl_s_to_bene'] = setlbl_s_to_beneaed7e,
        codeStates['lbl_s_to_deduction'] = lbl_s_to_deduction078ca,
        codeStates['setlbl_s_to_deduction'] = setlbl_s_to_deduction078ca,
        codeStates['lbl_s_to_allow'] = lbl_s_to_allow8942c,
        codeStates['setlbl_s_to_allow'] = setlbl_s_to_allow8942c,
        codeStates['lbl_to_bene'] = lbl_to_bene728c0,
        codeStates['setlbl_to_bene'] = setlbl_to_bene728c0,
        codeStates['lbl_to_deduction'] = lbl_to_deductionbd7f3,
        codeStates['setlbl_to_deduction'] = setlbl_to_deductionbd7f3,
        codeStates['lbl_to_allo'] = lbl_to_allo2f67a,
        codeStates['setlbl_to_allo'] = setlbl_to_allo2f67a,
        codeStates['divider7'] = divider7df1c4,
        codeStates['setdivider7'] = setdivider7df1c4,
        codeStates['lbl_s_to_incen'] = lbl_s_to_incen9e037,
        codeStates['setlbl_s_to_incen'] = setlbl_s_to_incen9e037,
        codeStates['lbl_toince'] = lbl_toince2e251,
        codeStates['setlbl_toince'] = setlbl_toince2e251,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const grp_other_details0dea3Ref = useRef<any>(null);
  const handleClearSearch = () => {
    grp_other_details0dea3Ref.current?.setSearchParams();
    grp_other_details0dea3Ref.current?.handleSearch({});
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
        !Array.isArray(grp_other_details0dea3) &&
        Object.keys(grp_other_details0dea3)?.length > 0
      ) {
        setgrp_other_details0dea3({})
        setgrp_other_details0dea3Props((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [grp_other_details0dea3Props?.refresh])


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
        gridColumn: '13 / 25',
        gridRow: '14 / 140',
      
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
      className={`flex flex-col overflow-auto rounded-md p-2 ${isDark ? 'text-white' : 'text-black'}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setenquiryempviewdetails_v1((pre:any)=>({...pre,_selectedGroup_:"grp_other_details"}))
        }}
    >
          {allowedControls.includes("hdr_sal_details") ?<Texthdr_sal_details   /* cc668 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("lbl_s_year") ?<Textlbl_s_year   /* 8a7b7 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("lbl_s_prd") ?<Textlbl_s_prd   /* 1d712 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("lbl_s_frm_dte") ?<Textlbl_s_frm_dte   /* af9ff */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("lbl_year") ?<Textlbl_year   /* 77e9a */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("lbl_prd") ?<Textlbl_prd   /* 231ed */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("lbl_from_date") ?<Textlbl_from_date   /* 5c572 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("divider4") ?<Dividerdivider4   /* 1b7ce */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("lbl_s_to_dte") ?<Textlbl_s_to_dte   /* c31c3 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("lbl_s_sal_pymt_date") ?<Textlbl_s_sal_pymt_date   /* 3433b */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("lbl_s_days_paid") ?<Textlbl_s_days_paid   /* 8f15c */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("lbl_to_date") ?<Textlbl_to_date   /* 68efb */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("lbl_file_id") ?<Textlbl_file_id   /* 71627 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("lbl_days_paid") ?<Textlbl_days_paid   /* faad7 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("divider5") ?<Dividerdivider5   /* 4066d */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("lbl_s_fix_in") ?<Textlbl_s_fix_in   /* 368c0 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("lbl_s_in_var") ?<Textlbl_s_in_var   /* af378 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("lbl_s_to_sal") ?<Textlbl_s_to_sal   /* 357e4 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("lbl_fix_in") ?<Textlbl_fix_in   /* 1338c */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("lbl_in_var") ?<Textlbl_in_var   /* b6ce9 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("lbl_to_sal") ?<Textlbl_to_sal   /* 3b4e8 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("divider6") ?<Dividerdivider6   /* 490c6 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("lbl_s_to_bene") ?<Textlbl_s_to_bene   /* aed7e */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("lbl_s_to_deduction") ?<Textlbl_s_to_deduction   /* 078ca */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("lbl_s_to_allow") ?<Textlbl_s_to_allow   /* 8942c */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("lbl_to_bene") ?<Textlbl_to_bene   /* 728c0 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("lbl_to_deduction") ?<Textlbl_to_deduction   /* bd7f3 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("lbl_to_allo") ?<Textlbl_to_allo   /* 2f67a */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("divider7") ?<Dividerdivider7   /* df1c4 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("lbl_s_to_incen") ?<Textlbl_s_to_incen   /* 9e037 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("lbl_toince") ?<Textlbl_toince   /* 2e251 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupgrp_other_details
