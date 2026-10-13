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
import Texthdr_emp_details  from "./Texthdr_emp_details";
import Textlbl_s_channel_code  from "./Textlbl_s_channel_code";
import Textlbl_s_leave  from "./Textlbl_s_leave";
import Textlbl_s_inside_cntry  from "./Textlbl_s_inside_cntry";
import Textlbl_ch_code  from "./Textlbl_ch_code";
import Textlbl_leave  from "./Textlbl_leave";
import Textlbl_inside_cntry  from "./Textlbl_inside_cntry";
import Dividerdivider1  from "./Dividerdivider1";
import Textlbl_s_sal_type  from "./Textlbl_s_sal_type";
import Textlbl_s_wrk_emid  from "./Textlbl_s_wrk_emid";
import Textlbl_s_pas_num  from "./Textlbl_s_pas_num";
import Textlbl_sal_type  from "./Textlbl_sal_type";
import Textlbl_wrk_emid  from "./Textlbl_wrk_emid";
import Textlbl_pass_num  from "./Textlbl_pass_num";
import Dividerdivider3  from "./Dividerdivider3";
import Textlbl_s_cmp_code  from "./Textlbl_s_cmp_code";
import Textlbl_s_persn_code  from "./Textlbl_s_persn_code";
import Textlbl_s_agntcode  from "./Textlbl_s_agntcode";
import Textlbl_cmp_cde  from "./Textlbl_cmp_cde";
import Textlbl_prsn_code  from "./Textlbl_prsn_code";
import Textlbl_angnt_cde  from "./Textlbl_angnt_cde";
import Dividerdivider2  from "./Dividerdivider2";
import Textlbl_s_wrk_iban  from "./Textlbl_s_wrk_iban";
import Textlbl_s_remarks  from "./Textlbl_s_remarks";
import Textlblwrk_iban  from "./Textlblwrk_iban";
import Textlbl_rmks  from "./Textlbl_rmks";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupgrp_emp_details = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
      "hdr_emp_details",
      "lbl_s_channel_code",
      "lbl_s_leave",
      "lbl_s_inside_cntry",
      "lbl_ch_code",
      "lbl_leave",
      "lbl_inside_cntry",
      "divider1",
      "lbl_s_sal_type",
      "lbl_s_wrk_emid",
      "lbl_s_pas_num",
      "lbl_sal_type",
      "lbl_wrk_emid",
      "lbl_pass_num",
      "divider3",
      "lbl_s_cmp_code",
      "lbl_s_persn_code",
      "lbl_s_agntcode",
      "lbl_cmp_cde",
      "lbl_prsn_code",
      "lbl_angnt_cde",
      "divider2",
      "lbl_s_wrk_iban",
      "lbl_s_remarks",
      "lblwrk_iban",
      "lbl_rmks"
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
      "hdr_emp_details",
      "lbl_s_channel_code",
      "lbl_s_leave",
      "lbl_s_inside_cntry",
      "lbl_ch_code",
      "lbl_leave",
      "lbl_inside_cntry",
      "divider1",
      "lbl_s_sal_type",
      "lbl_s_wrk_emid",
      "lbl_s_pas_num",
      "lbl_sal_type",
      "lbl_wrk_emid",
      "lbl_pass_num",
      "divider3",
      "lbl_s_cmp_code",
      "lbl_s_persn_code",
      "lbl_s_agntcode",
      "lbl_cmp_cde",
      "lbl_prsn_code",
      "lbl_angnt_cde",
      "divider2",
      "lbl_s_wrk_iban",
      "lbl_s_remarks",
      "lblwrk_iban",
      "lbl_rmks"
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
      "hdr_emp_details",
      "lbl_s_channel_code",
      "lbl_s_leave",
      "lbl_s_inside_cntry",
      "lbl_ch_code",
      "lbl_leave",
      "lbl_inside_cntry",
      "divider1",
      "lbl_s_sal_type",
      "lbl_s_wrk_emid",
      "lbl_s_pas_num",
      "lbl_sal_type",
      "lbl_wrk_emid",
      "lbl_pass_num",
      "divider3",
      "lbl_s_cmp_code",
      "lbl_s_persn_code",
      "lbl_s_agntcode",
      "lbl_cmp_cde",
      "lbl_prsn_code",
      "lbl_angnt_cde",
      "divider2",
      "lbl_s_wrk_iban",
      "lbl_s_remarks",
      "lblwrk_iban",
      "lbl_rmks"
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
  const {hdr_emp_details519b3, sethdr_emp_details519b3}= useContext(TotalContext) as TotalContextProps;
  const {lbl_s_channel_code83f4d, setlbl_s_channel_code83f4d}= useContext(TotalContext) as TotalContextProps;
  const {lbl_s_leave6881d, setlbl_s_leave6881d}= useContext(TotalContext) as TotalContextProps;
  const {lbl_s_inside_cntrybe1b2, setlbl_s_inside_cntrybe1b2}= useContext(TotalContext) as TotalContextProps;
  const {lbl_ch_code6fd21, setlbl_ch_code6fd21}= useContext(TotalContext) as TotalContextProps;
  const {lbl_leavefc2c9, setlbl_leavefc2c9}= useContext(TotalContext) as TotalContextProps;
  const {lbl_inside_cntry8bcae, setlbl_inside_cntry8bcae}= useContext(TotalContext) as TotalContextProps;
  const {divider1d3fd6, setdivider1d3fd6}= useContext(TotalContext) as TotalContextProps;
  const {lbl_s_sal_typeb0082, setlbl_s_sal_typeb0082}= useContext(TotalContext) as TotalContextProps;
  const {lbl_s_wrk_emid0fa84, setlbl_s_wrk_emid0fa84}= useContext(TotalContext) as TotalContextProps;
  const {lbl_s_pas_num2951b, setlbl_s_pas_num2951b}= useContext(TotalContext) as TotalContextProps;
  const {lbl_sal_typee5fad, setlbl_sal_typee5fad}= useContext(TotalContext) as TotalContextProps;
  const {lbl_wrk_emidd0501, setlbl_wrk_emidd0501}= useContext(TotalContext) as TotalContextProps;
  const {lbl_pass_numbf1c1, setlbl_pass_numbf1c1}= useContext(TotalContext) as TotalContextProps;
  const {divider3e5b62, setdivider3e5b62}= useContext(TotalContext) as TotalContextProps;
  const {lbl_s_cmp_code11164, setlbl_s_cmp_code11164}= useContext(TotalContext) as TotalContextProps;
  const {lbl_s_persn_code785b1, setlbl_s_persn_code785b1}= useContext(TotalContext) as TotalContextProps;
  const {lbl_s_agntcodee3a1d, setlbl_s_agntcodee3a1d}= useContext(TotalContext) as TotalContextProps;
  const {lbl_cmp_cde8afa3, setlbl_cmp_cde8afa3}= useContext(TotalContext) as TotalContextProps;
  const {lbl_prsn_code9fac4, setlbl_prsn_code9fac4}= useContext(TotalContext) as TotalContextProps;
  const {lbl_angnt_cdee285a, setlbl_angnt_cdee285a}= useContext(TotalContext) as TotalContextProps;
  const {divider223785, setdivider223785}= useContext(TotalContext) as TotalContextProps;
  const {lbl_s_wrk_iban0b21a, setlbl_s_wrk_iban0b21a}= useContext(TotalContext) as TotalContextProps;
  const {lbl_s_remarks514e5, setlbl_s_remarks514e5}= useContext(TotalContext) as TotalContextProps;
  const {lblwrk_ibane57ee, setlblwrk_ibane57ee}= useContext(TotalContext) as TotalContextProps;
  const {lbl_rmksb105f, setlbl_rmksb105f}= useContext(TotalContext) as TotalContextProps;
  const {grp_other_details0dea3, setgrp_other_details0dea3}= useContext(TotalContext) as TotalContextProps;
  const {grp_other_details0dea3Props, setgrp_other_details0dea3Props}= useContext(TotalContext) as TotalContextProps;
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
    'GroupGrpEmpDetails',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "c5ff2ab71d4ca76e0d34051706e5bbf3");
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
    setgrp_emp_details5bbf3Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("hdr_emp_details")){
        sethdr_emp_details519b3((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(hdr_emp_details519b3?.isDisabled==null)
      {
        sethdr_emp_details519b3((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("lbl_s_channel_code")){
        setlbl_s_channel_code83f4d((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(lbl_s_channel_code83f4d?.isDisabled==null)
      {
        setlbl_s_channel_code83f4d((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("lbl_s_leave")){
        setlbl_s_leave6881d((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(lbl_s_leave6881d?.isDisabled==null)
      {
        setlbl_s_leave6881d((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("lbl_s_inside_cntry")){
        setlbl_s_inside_cntrybe1b2((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(lbl_s_inside_cntrybe1b2?.isDisabled==null)
      {
        setlbl_s_inside_cntrybe1b2((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("lbl_ch_code")){
        setlbl_ch_code6fd21((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(lbl_ch_code6fd21?.isDisabled==null)
      {
        setlbl_ch_code6fd21((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("lbl_leave")){
        setlbl_leavefc2c9((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(lbl_leavefc2c9?.isDisabled==null)
      {
        setlbl_leavefc2c9((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("lbl_inside_cntry")){
        setlbl_inside_cntry8bcae((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(lbl_inside_cntry8bcae?.isDisabled==null)
      {
        setlbl_inside_cntry8bcae((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("divider1")){
        setdivider1d3fd6((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(divider1d3fd6?.isDisabled==null)
      {
        setdivider1d3fd6((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("lbl_s_sal_type")){
        setlbl_s_sal_typeb0082((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(lbl_s_sal_typeb0082?.isDisabled==null)
      {
        setlbl_s_sal_typeb0082((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("lbl_s_wrk_emid")){
        setlbl_s_wrk_emid0fa84((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(lbl_s_wrk_emid0fa84?.isDisabled==null)
      {
        setlbl_s_wrk_emid0fa84((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("lbl_s_pas_num")){
        setlbl_s_pas_num2951b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(lbl_s_pas_num2951b?.isDisabled==null)
      {
        setlbl_s_pas_num2951b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("lbl_sal_type")){
        setlbl_sal_typee5fad((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(lbl_sal_typee5fad?.isDisabled==null)
      {
        setlbl_sal_typee5fad((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("lbl_wrk_emid")){
        setlbl_wrk_emidd0501((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(lbl_wrk_emidd0501?.isDisabled==null)
      {
        setlbl_wrk_emidd0501((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("lbl_pass_num")){
        setlbl_pass_numbf1c1((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(lbl_pass_numbf1c1?.isDisabled==null)
      {
        setlbl_pass_numbf1c1((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("divider3")){
        setdivider3e5b62((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(divider3e5b62?.isDisabled==null)
      {
        setdivider3e5b62((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("lbl_s_cmp_code")){
        setlbl_s_cmp_code11164((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(lbl_s_cmp_code11164?.isDisabled==null)
      {
        setlbl_s_cmp_code11164((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("lbl_s_persn_code")){
        setlbl_s_persn_code785b1((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(lbl_s_persn_code785b1?.isDisabled==null)
      {
        setlbl_s_persn_code785b1((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("lbl_s_agntcode")){
        setlbl_s_agntcodee3a1d((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(lbl_s_agntcodee3a1d?.isDisabled==null)
      {
        setlbl_s_agntcodee3a1d((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("lbl_cmp_cde")){
        setlbl_cmp_cde8afa3((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(lbl_cmp_cde8afa3?.isDisabled==null)
      {
        setlbl_cmp_cde8afa3((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("lbl_prsn_code")){
        setlbl_prsn_code9fac4((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(lbl_prsn_code9fac4?.isDisabled==null)
      {
        setlbl_prsn_code9fac4((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("lbl_angnt_cde")){
        setlbl_angnt_cdee285a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(lbl_angnt_cdee285a?.isDisabled==null)
      {
        setlbl_angnt_cdee285a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("divider2")){
        setdivider223785((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(divider223785?.isDisabled==null)
      {
        setdivider223785((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("lbl_s_wrk_iban")){
        setlbl_s_wrk_iban0b21a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(lbl_s_wrk_iban0b21a?.isDisabled==null)
      {
        setlbl_s_wrk_iban0b21a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("lbl_s_remarks")){
        setlbl_s_remarks514e5((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(lbl_s_remarks514e5?.isDisabled==null)
      {
        setlbl_s_remarks514e5((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("lblwrk_iban")){
        setlblwrk_ibane57ee((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(lblwrk_ibane57ee?.isDisabled==null)
      {
        setlblwrk_ibane57ee((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("lbl_rmks")){
        setlbl_rmksb105f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(lbl_rmksb105f?.isDisabled==null)
      {
        setlbl_rmksb105f((pre:any)=>({...pre,isDisabled:false}));
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
        codeStates['hdr_emp_details'] = hdr_emp_details519b3,
        codeStates['sethdr_emp_details'] = sethdr_emp_details519b3,
        codeStates['lbl_s_channel_code'] = lbl_s_channel_code83f4d,
        codeStates['setlbl_s_channel_code'] = setlbl_s_channel_code83f4d,
        codeStates['lbl_s_leave'] = lbl_s_leave6881d,
        codeStates['setlbl_s_leave'] = setlbl_s_leave6881d,
        codeStates['lbl_s_inside_cntry'] = lbl_s_inside_cntrybe1b2,
        codeStates['setlbl_s_inside_cntry'] = setlbl_s_inside_cntrybe1b2,
        codeStates['lbl_ch_code'] = lbl_ch_code6fd21,
        codeStates['setlbl_ch_code'] = setlbl_ch_code6fd21,
        codeStates['lbl_leave'] = lbl_leavefc2c9,
        codeStates['setlbl_leave'] = setlbl_leavefc2c9,
        codeStates['lbl_inside_cntry'] = lbl_inside_cntry8bcae,
        codeStates['setlbl_inside_cntry'] = setlbl_inside_cntry8bcae,
        codeStates['divider1'] = divider1d3fd6,
        codeStates['setdivider1'] = setdivider1d3fd6,
        codeStates['lbl_s_sal_type'] = lbl_s_sal_typeb0082,
        codeStates['setlbl_s_sal_type'] = setlbl_s_sal_typeb0082,
        codeStates['lbl_s_wrk_emid'] = lbl_s_wrk_emid0fa84,
        codeStates['setlbl_s_wrk_emid'] = setlbl_s_wrk_emid0fa84,
        codeStates['lbl_s_pas_num'] = lbl_s_pas_num2951b,
        codeStates['setlbl_s_pas_num'] = setlbl_s_pas_num2951b,
        codeStates['lbl_sal_type'] = lbl_sal_typee5fad,
        codeStates['setlbl_sal_type'] = setlbl_sal_typee5fad,
        codeStates['lbl_wrk_emid'] = lbl_wrk_emidd0501,
        codeStates['setlbl_wrk_emid'] = setlbl_wrk_emidd0501,
        codeStates['lbl_pass_num'] = lbl_pass_numbf1c1,
        codeStates['setlbl_pass_num'] = setlbl_pass_numbf1c1,
        codeStates['divider3'] = divider3e5b62,
        codeStates['setdivider3'] = setdivider3e5b62,
        codeStates['lbl_s_cmp_code'] = lbl_s_cmp_code11164,
        codeStates['setlbl_s_cmp_code'] = setlbl_s_cmp_code11164,
        codeStates['lbl_s_persn_code'] = lbl_s_persn_code785b1,
        codeStates['setlbl_s_persn_code'] = setlbl_s_persn_code785b1,
        codeStates['lbl_s_agntcode'] = lbl_s_agntcodee3a1d,
        codeStates['setlbl_s_agntcode'] = setlbl_s_agntcodee3a1d,
        codeStates['lbl_cmp_cde'] = lbl_cmp_cde8afa3,
        codeStates['setlbl_cmp_cde'] = setlbl_cmp_cde8afa3,
        codeStates['lbl_prsn_code'] = lbl_prsn_code9fac4,
        codeStates['setlbl_prsn_code'] = setlbl_prsn_code9fac4,
        codeStates['lbl_angnt_cde'] = lbl_angnt_cdee285a,
        codeStates['setlbl_angnt_cde'] = setlbl_angnt_cdee285a,
        codeStates['divider2'] = divider223785,
        codeStates['setdivider2'] = setdivider223785,
        codeStates['lbl_s_wrk_iban'] = lbl_s_wrk_iban0b21a,
        codeStates['setlbl_s_wrk_iban'] = setlbl_s_wrk_iban0b21a,
        codeStates['lbl_s_remarks'] = lbl_s_remarks514e5,
        codeStates['setlbl_s_remarks'] = setlbl_s_remarks514e5,
        codeStates['lblwrk_iban'] = lblwrk_ibane57ee,
        codeStates['setlblwrk_iban'] = setlblwrk_ibane57ee,
        codeStates['lbl_rmks'] = lbl_rmksb105f,
        codeStates['setlbl_rmks'] = setlbl_rmksb105f,
        codeStates['grp_other_details'] = grp_other_details0dea3,
        codeStates['setgrp_other_details'] = setgrp_other_details0dea3,
        codeStates['grp_other_details0dea3'] = grp_other_details0dea3Props,
        codeStates['setgrp_other_details0dea3'] = setgrp_other_details0dea3Props,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "c5ff2ab71d4ca76e0d34051706e5bbf3");
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
        codeStates['hdr_emp_details'] = hdr_emp_details519b3,
        codeStates['sethdr_emp_details'] = sethdr_emp_details519b3,
        codeStates['lbl_s_channel_code'] = lbl_s_channel_code83f4d,
        codeStates['setlbl_s_channel_code'] = setlbl_s_channel_code83f4d,
        codeStates['lbl_s_leave'] = lbl_s_leave6881d,
        codeStates['setlbl_s_leave'] = setlbl_s_leave6881d,
        codeStates['lbl_s_inside_cntry'] = lbl_s_inside_cntrybe1b2,
        codeStates['setlbl_s_inside_cntry'] = setlbl_s_inside_cntrybe1b2,
        codeStates['lbl_ch_code'] = lbl_ch_code6fd21,
        codeStates['setlbl_ch_code'] = setlbl_ch_code6fd21,
        codeStates['lbl_leave'] = lbl_leavefc2c9,
        codeStates['setlbl_leave'] = setlbl_leavefc2c9,
        codeStates['lbl_inside_cntry'] = lbl_inside_cntry8bcae,
        codeStates['setlbl_inside_cntry'] = setlbl_inside_cntry8bcae,
        codeStates['divider1'] = divider1d3fd6,
        codeStates['setdivider1'] = setdivider1d3fd6,
        codeStates['lbl_s_sal_type'] = lbl_s_sal_typeb0082,
        codeStates['setlbl_s_sal_type'] = setlbl_s_sal_typeb0082,
        codeStates['lbl_s_wrk_emid'] = lbl_s_wrk_emid0fa84,
        codeStates['setlbl_s_wrk_emid'] = setlbl_s_wrk_emid0fa84,
        codeStates['lbl_s_pas_num'] = lbl_s_pas_num2951b,
        codeStates['setlbl_s_pas_num'] = setlbl_s_pas_num2951b,
        codeStates['lbl_sal_type'] = lbl_sal_typee5fad,
        codeStates['setlbl_sal_type'] = setlbl_sal_typee5fad,
        codeStates['lbl_wrk_emid'] = lbl_wrk_emidd0501,
        codeStates['setlbl_wrk_emid'] = setlbl_wrk_emidd0501,
        codeStates['lbl_pass_num'] = lbl_pass_numbf1c1,
        codeStates['setlbl_pass_num'] = setlbl_pass_numbf1c1,
        codeStates['divider3'] = divider3e5b62,
        codeStates['setdivider3'] = setdivider3e5b62,
        codeStates['lbl_s_cmp_code'] = lbl_s_cmp_code11164,
        codeStates['setlbl_s_cmp_code'] = setlbl_s_cmp_code11164,
        codeStates['lbl_s_persn_code'] = lbl_s_persn_code785b1,
        codeStates['setlbl_s_persn_code'] = setlbl_s_persn_code785b1,
        codeStates['lbl_s_agntcode'] = lbl_s_agntcodee3a1d,
        codeStates['setlbl_s_agntcode'] = setlbl_s_agntcodee3a1d,
        codeStates['lbl_cmp_cde'] = lbl_cmp_cde8afa3,
        codeStates['setlbl_cmp_cde'] = setlbl_cmp_cde8afa3,
        codeStates['lbl_prsn_code'] = lbl_prsn_code9fac4,
        codeStates['setlbl_prsn_code'] = setlbl_prsn_code9fac4,
        codeStates['lbl_angnt_cde'] = lbl_angnt_cdee285a,
        codeStates['setlbl_angnt_cde'] = setlbl_angnt_cdee285a,
        codeStates['divider2'] = divider223785,
        codeStates['setdivider2'] = setdivider223785,
        codeStates['lbl_s_wrk_iban'] = lbl_s_wrk_iban0b21a,
        codeStates['setlbl_s_wrk_iban'] = setlbl_s_wrk_iban0b21a,
        codeStates['lbl_s_remarks'] = lbl_s_remarks514e5,
        codeStates['setlbl_s_remarks'] = setlbl_s_remarks514e5,
        codeStates['lblwrk_iban'] = lblwrk_ibane57ee,
        codeStates['setlblwrk_iban'] = setlblwrk_ibane57ee,
        codeStates['lbl_rmks'] = lbl_rmksb105f,
        codeStates['setlbl_rmks'] = setlbl_rmksb105f,
        codeStates['grp_other_details'] = grp_other_details0dea3,
        codeStates['setgrp_other_details'] = setgrp_other_details0dea3,
        codeStates['grp_other_details0dea3'] = grp_other_details0dea3Props,
        codeStates['setgrp_other_details0dea3'] = setgrp_other_details0dea3Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const grp_emp_details5bbf3Ref = useRef<any>(null);
  const handleClearSearch = () => {
    grp_emp_details5bbf3Ref.current?.setSearchParams();
    grp_emp_details5bbf3Ref.current?.handleSearch({});
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
        !Array.isArray(grp_emp_details5bbf3) &&
        Object.keys(grp_emp_details5bbf3)?.length > 0
      ) {
        setgrp_emp_details5bbf3({})
        setgrp_emp_details5bbf3Props((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [grp_emp_details5bbf3Props?.refresh])


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
        gridColumn: '1 / 13',
        gridRow: '14 / 140',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '6px',
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
          setenquiryempviewdetails_v1((pre:any)=>({...pre,_selectedGroup_:"grp_emp_details"}))
        }}
    >
          {allowedControls.includes("hdr_emp_details") ?<Texthdr_emp_details   /* 519b3 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("lbl_s_channel_code") ?<Textlbl_s_channel_code   /* 83f4d */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("lbl_s_leave") ?<Textlbl_s_leave   /* 6881d */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("lbl_s_inside_cntry") ?<Textlbl_s_inside_cntry   /* be1b2 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("lbl_ch_code") ?<Textlbl_ch_code   /* 6fd21 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("lbl_leave") ?<Textlbl_leave   /* fc2c9 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("lbl_inside_cntry") ?<Textlbl_inside_cntry   /* 8bcae */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("divider1") ?<Dividerdivider1   /* d3fd6 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("lbl_s_sal_type") ?<Textlbl_s_sal_type   /* b0082 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("lbl_s_wrk_emid") ?<Textlbl_s_wrk_emid   /* 0fa84 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("lbl_s_pas_num") ?<Textlbl_s_pas_num   /* 2951b */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("lbl_sal_type") ?<Textlbl_sal_type   /* e5fad */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("lbl_wrk_emid") ?<Textlbl_wrk_emid   /* d0501 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("lbl_pass_num") ?<Textlbl_pass_num   /* bf1c1 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("divider3") ?<Dividerdivider3   /* e5b62 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("lbl_s_cmp_code") ?<Textlbl_s_cmp_code   /* 11164 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("lbl_s_persn_code") ?<Textlbl_s_persn_code   /* 785b1 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("lbl_s_agntcode") ?<Textlbl_s_agntcode   /* e3a1d */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("lbl_cmp_cde") ?<Textlbl_cmp_cde   /* 8afa3 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("lbl_prsn_code") ?<Textlbl_prsn_code   /* 9fac4 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("lbl_angnt_cde") ?<Textlbl_angnt_cde   /* e285a */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("divider2") ?<Dividerdivider2   /* 23785 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("lbl_s_wrk_iban") ?<Textlbl_s_wrk_iban   /* 0b21a */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("lbl_s_remarks") ?<Textlbl_s_remarks   /* 514e5 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("lblwrk_iban") ?<Textlblwrk_iban   /* e57ee */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("lbl_rmks") ?<Textlbl_rmks   /* b105f */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupgrp_emp_details
