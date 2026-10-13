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
import Tabletbl_tran_list  from './Tabletbl_tran_list';  
import Buttonbtn_back  from "./Buttonbtn_back";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Grouptbl_tran_list = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_returnagentfromtransactionlist_v1Props, setdfd_returnagentfromtransactionlist_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "col_emp_mol",
      "col_emp_name",
      "col_cr_acc_no",
      "col_fixed_amnt",
      "col_var_amnt",
      "col_tot_tran_amnt",
      "col_created_date",
      "col_sf_file_name",
      "col_rsn_code",
      "btn_back"
    ],
    "allowedGroups": [
      "canvas",
      "grp_overall_tran_list",
      "tbl_tran_list"
    ],
    "blockedControls": [
      "btn_initiate",
      "col_uuid",
      "btn_authorize"
    ],
    "readOnlyControls": []
  },
  "Operational Manager": {
    "allowedControls": [
      "col_emp_mol",
      "col_emp_name",
      "col_cr_acc_no",
      "col_fixed_amnt",
      "col_var_amnt",
      "col_tot_tran_amnt",
      "col_created_date",
      "col_sf_file_name",
      "btn_initiate",
      "btn_back"
    ],
    "allowedGroups": [
      "canvas",
      "grp_overall_tran_list",
      "tbl_tran_list"
    ],
    "blockedControls": [
      "col_rsn_code",
      "col_uuid",
      "btn_authorize"
    ],
    "readOnlyControls": []
  },
  "Operational Officer": {
    "allowedControls": [
      "col_emp_mol",
      "col_emp_name",
      "col_cr_acc_no",
      "col_fixed_amnt",
      "col_var_amnt",
      "col_tot_tran_amnt",
      "col_created_date",
      "col_sf_file_name",
      "col_rsn_code",
      "btn_authorize",
      "btn_back"
    ],
    "allowedGroups": [
      "canvas",
      "grp_overall_tran_list",
      "tbl_tran_list"
    ],
    "blockedControls": [
      "btn_initiate",
      "col_uuid"
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
  const {grp_overall_tran_listc200a, setgrp_overall_tran_listc200a}= useContext(TotalContext) as TotalContextProps;
  const {grp_overall_tran_listc200aProps, setgrp_overall_tran_listc200aProps}= useContext(TotalContext) as TotalContextProps;
  const {tbl_tran_list0634a, settbl_tran_list0634a}= useContext(TotalContext) as TotalContextProps;
  const {tbl_tran_list0634aProps, settbl_tran_list0634aProps}= useContext(TotalContext) as TotalContextProps;
  const {col_emp_mol35ce2, setcol_emp_mol35ce2}= useContext(TotalContext) as TotalContextProps;
  const {col_emp_name53515, setcol_emp_name53515}= useContext(TotalContext) as TotalContextProps;
  const {col_cr_acc_no519d3, setcol_cr_acc_no519d3}= useContext(TotalContext) as TotalContextProps;
  const {col_fixed_amnt0743c, setcol_fixed_amnt0743c}= useContext(TotalContext) as TotalContextProps;
  const {col_var_amnt25d0d, setcol_var_amnt25d0d}= useContext(TotalContext) as TotalContextProps;
  const {col_tot_tran_amnt1acc3, setcol_tot_tran_amnt1acc3}= useContext(TotalContext) as TotalContextProps;
  const {col_created_date5679d, setcol_created_date5679d}= useContext(TotalContext) as TotalContextProps;
  const {col_sf_file_namebaf46, setcol_sf_file_namebaf46}= useContext(TotalContext) as TotalContextProps;
  const {col_rsn_codeaa610, setcol_rsn_codeaa610}= useContext(TotalContext) as TotalContextProps;
  const {btn_initiate6f8a7, setbtn_initiate6f8a7}= useContext(TotalContext) as TotalContextProps;
  const {col_uuid8350f, setcol_uuid8350f}= useContext(TotalContext) as TotalContextProps;
  const {btn_authorize7ae96, setbtn_authorize7ae96}= useContext(TotalContext) as TotalContextProps;
  const {btn_back41a76, setbtn_back41a76}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {requestrefundtransactionlist_v1, setrequestrefundtransactionlist_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:WPS:AFK:requestRefundTransactionList:AFVK:v1',
    [user],
    'GroupTblTranList',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "9b513c81279903e0563b418223c0634a");
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
    settbl_tran_list0634aProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("col_emp_mol")){
        setcol_emp_mol35ce2((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_emp_mol35ce2?.isDisabled==null)
      {
        setcol_emp_mol35ce2((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("col_emp_name")){
        setcol_emp_name53515((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_emp_name53515?.isDisabled==null)
      {
        setcol_emp_name53515((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("col_cr_acc_no")){
        setcol_cr_acc_no519d3((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_cr_acc_no519d3?.isDisabled==null)
      {
        setcol_cr_acc_no519d3((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("col_fixed_amnt")){
        setcol_fixed_amnt0743c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_fixed_amnt0743c?.isDisabled==null)
      {
        setcol_fixed_amnt0743c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("col_var_amnt")){
        setcol_var_amnt25d0d((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_var_amnt25d0d?.isDisabled==null)
      {
        setcol_var_amnt25d0d((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("col_tot_tran_amnt")){
        setcol_tot_tran_amnt1acc3((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_tot_tran_amnt1acc3?.isDisabled==null)
      {
        setcol_tot_tran_amnt1acc3((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("col_created_date")){
        setcol_created_date5679d((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_created_date5679d?.isDisabled==null)
      {
        setcol_created_date5679d((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("col_sf_file_name")){
        setcol_sf_file_namebaf46((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_sf_file_namebaf46?.isDisabled==null)
      {
        setcol_sf_file_namebaf46((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("col_rsn_code")){
        setcol_rsn_codeaa610((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_rsn_codeaa610?.isDisabled==null)
      {
        setcol_rsn_codeaa610((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("btn_initiate")){
        setbtn_initiate6f8a7((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(btn_initiate6f8a7?.isDisabled==null)
      {
        setbtn_initiate6f8a7((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("col_uuid")){
        setcol_uuid8350f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_uuid8350f?.isDisabled==null)
      {
        setcol_uuid8350f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("btn_authorize")){
        setbtn_authorize7ae96((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(btn_authorize7ae96?.isDisabled==null)
      {
        setbtn_authorize7ae96((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("btn_back")){
        setbtn_back41a76((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(btn_back41a76?.isDisabled==null)
      {
        setbtn_back41a76((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "9b513c81279903e0563b418223c0634a");
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
        codeStates['grp_overall_tran_list'] = grp_overall_tran_listc200a,
        codeStates['setgrp_overall_tran_list'] = setgrp_overall_tran_listc200a,
        codeStates['grp_overall_tran_listc200a'] = grp_overall_tran_listc200aProps,
        codeStates['setgrp_overall_tran_listc200a'] = setgrp_overall_tran_listc200aProps,
        codeStates['tbl_tran_list'] = tbl_tran_list0634a,
        codeStates['settbl_tran_list'] = settbl_tran_list0634a,
        codeStates['tbl_tran_list0634a'] = tbl_tran_list0634aProps,
        codeStates['settbl_tran_list0634a'] = settbl_tran_list0634aProps,
        codeStates['col_emp_mol'] = col_emp_mol35ce2,
        codeStates['setcol_emp_mol'] = setcol_emp_mol35ce2,
        codeStates['col_emp_name'] = col_emp_name53515,
        codeStates['setcol_emp_name'] = setcol_emp_name53515,
        codeStates['col_cr_acc_no'] = col_cr_acc_no519d3,
        codeStates['setcol_cr_acc_no'] = setcol_cr_acc_no519d3,
        codeStates['col_fixed_amnt'] = col_fixed_amnt0743c,
        codeStates['setcol_fixed_amnt'] = setcol_fixed_amnt0743c,
        codeStates['col_var_amnt'] = col_var_amnt25d0d,
        codeStates['setcol_var_amnt'] = setcol_var_amnt25d0d,
        codeStates['col_tot_tran_amnt'] = col_tot_tran_amnt1acc3,
        codeStates['setcol_tot_tran_amnt'] = setcol_tot_tran_amnt1acc3,
        codeStates['col_created_date'] = col_created_date5679d,
        codeStates['setcol_created_date'] = setcol_created_date5679d,
        codeStates['col_sf_file_name'] = col_sf_file_namebaf46,
        codeStates['setcol_sf_file_name'] = setcol_sf_file_namebaf46,
        codeStates['col_rsn_code'] = col_rsn_codeaa610,
        codeStates['setcol_rsn_code'] = setcol_rsn_codeaa610,
        codeStates['btn_initiate'] = btn_initiate6f8a7,
        codeStates['setbtn_initiate'] = setbtn_initiate6f8a7,
        codeStates['col_uuid'] = col_uuid8350f,
        codeStates['setcol_uuid'] = setcol_uuid8350f,
        codeStates['btn_authorize'] = btn_authorize7ae96,
        codeStates['setbtn_authorize'] = setbtn_authorize7ae96,
        codeStates['btn_back'] = btn_back41a76,
        codeStates['setbtn_back'] = setbtn_back41a76,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const tbl_tran_list0634aRef = useRef<any>(null);
  const handleClearSearch = () => {
    tbl_tran_list0634aRef.current?.setSearchParams();
    tbl_tran_list0634aRef.current?.handleSearch({});
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
        !Array.isArray(tbl_tran_list0634a) &&
        Object.keys(tbl_tran_list0634a)?.length > 0
      ) {
        settbl_tran_list0634a({})
        settbl_tran_list0634aProps((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [tbl_tran_list0634aProps?.refresh])


  useEffect(() => {
    subscreenCheck()
  }, [])


  const renderBUttons=()=>{
    return (
        <div
          className='flex-shrink-0 overflow-x-auto pl-1'>
          <div className='flex justify-end w-max min-w-full gap-1'>
        {        (("btn_back" in ButtonGoRuleData)?ButtonGoRuleData["btn_back"]:true) && 
          allowedControls.includes("btn_back")  ?          <div className="shrink-0"><Buttonbtn_back tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/></div>: <div></div>} 
      </div>
      </div>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '1 / 146',
      
        //rowGap: '0px',
        overflow: 'visible',
        backgroundColor:'',
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
          setrequestrefundtransactionlist_v1((pre:any)=>({...pre,_selectedGroup_:"tbl_tran_list"}))
        }}
    >
      <div className='flex flex-col h-full w-full min-w-0 overflow-auto'>
        <div className='flex flex-1 w-full min-h-0'>
       {<Tabletbl_tran_list headerButtonsRenders={renderBUttons}
          headerPosition='top'
          headerText="Transaction List"
        tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} paginationDetails={paginationDetails} open={open} setOpen={setOpen} ref={tbl_tran_list0634aRef} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData} setIsProcessing={setIsProcessing} groupData={groupData} controlData={controlData}/>}
      </div>
      </div>
    </div>
 )
}

export default Grouptbl_tran_list
