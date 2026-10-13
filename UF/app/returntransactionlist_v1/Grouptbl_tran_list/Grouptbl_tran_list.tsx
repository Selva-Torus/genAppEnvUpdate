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
  const {grp_overall_tran_list10bd5, setgrp_overall_tran_list10bd5}= useContext(TotalContext) as TotalContextProps;
  const {grp_overall_tran_list10bd5Props, setgrp_overall_tran_list10bd5Props}= useContext(TotalContext) as TotalContextProps;
  const {tbl_tran_list858ed, settbl_tran_list858ed}= useContext(TotalContext) as TotalContextProps;
  const {tbl_tran_list858edProps, settbl_tran_list858edProps}= useContext(TotalContext) as TotalContextProps;
  const {col_emp_mole4029, setcol_emp_mole4029}= useContext(TotalContext) as TotalContextProps;
  const {col_emp_name32c92, setcol_emp_name32c92}= useContext(TotalContext) as TotalContextProps;
  const {col_cr_acc_no42627, setcol_cr_acc_no42627}= useContext(TotalContext) as TotalContextProps;
  const {col_fixed_amntd6d44, setcol_fixed_amntd6d44}= useContext(TotalContext) as TotalContextProps;
  const {col_var_amnt53ea2, setcol_var_amnt53ea2}= useContext(TotalContext) as TotalContextProps;
  const {col_tot_tran_amnta3392, setcol_tot_tran_amnta3392}= useContext(TotalContext) as TotalContextProps;
  const {col_created_dateea4ac, setcol_created_dateea4ac}= useContext(TotalContext) as TotalContextProps;
  const {col_sf_file_name36fc1, setcol_sf_file_name36fc1}= useContext(TotalContext) as TotalContextProps;
  const {col_rsn_codef367b, setcol_rsn_codef367b}= useContext(TotalContext) as TotalContextProps;
  const {btn_initiate71727, setbtn_initiate71727}= useContext(TotalContext) as TotalContextProps;
  const {col_uuida83f1, setcol_uuida83f1}= useContext(TotalContext) as TotalContextProps;
  const {btn_authorizefce56, setbtn_authorizefce56}= useContext(TotalContext) as TotalContextProps;
  const {btn_back16e28, setbtn_back16e28}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {returntransactionlist_v1, setreturntransactionlist_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:WPS:AFK:returnTransactionList:AFVK:v1',
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "782254cfca8991b29321cfb1b4e858ed");
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
    settbl_tran_list858edProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("col_emp_mol")){
        setcol_emp_mole4029((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_emp_mole4029?.isDisabled==null)
      {
        setcol_emp_mole4029((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("col_emp_name")){
        setcol_emp_name32c92((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_emp_name32c92?.isDisabled==null)
      {
        setcol_emp_name32c92((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("col_cr_acc_no")){
        setcol_cr_acc_no42627((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_cr_acc_no42627?.isDisabled==null)
      {
        setcol_cr_acc_no42627((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("col_fixed_amnt")){
        setcol_fixed_amntd6d44((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_fixed_amntd6d44?.isDisabled==null)
      {
        setcol_fixed_amntd6d44((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("col_var_amnt")){
        setcol_var_amnt53ea2((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_var_amnt53ea2?.isDisabled==null)
      {
        setcol_var_amnt53ea2((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("col_tot_tran_amnt")){
        setcol_tot_tran_amnta3392((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_tot_tran_amnta3392?.isDisabled==null)
      {
        setcol_tot_tran_amnta3392((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("col_created_date")){
        setcol_created_dateea4ac((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_created_dateea4ac?.isDisabled==null)
      {
        setcol_created_dateea4ac((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("col_sf_file_name")){
        setcol_sf_file_name36fc1((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_sf_file_name36fc1?.isDisabled==null)
      {
        setcol_sf_file_name36fc1((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("col_rsn_code")){
        setcol_rsn_codef367b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_rsn_codef367b?.isDisabled==null)
      {
        setcol_rsn_codef367b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("btn_initiate")){
        setbtn_initiate71727((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(btn_initiate71727?.isDisabled==null)
      {
        setbtn_initiate71727((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("col_uuid")){
        setcol_uuida83f1((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_uuida83f1?.isDisabled==null)
      {
        setcol_uuida83f1((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("btn_authorize")){
        setbtn_authorizefce56((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(btn_authorizefce56?.isDisabled==null)
      {
        setbtn_authorizefce56((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("btn_back")){
        setbtn_back16e28((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(btn_back16e28?.isDisabled==null)
      {
        setbtn_back16e28((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "782254cfca8991b29321cfb1b4e858ed");
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
        codeStates['grp_overall_tran_list'] = grp_overall_tran_list10bd5,
        codeStates['setgrp_overall_tran_list'] = setgrp_overall_tran_list10bd5,
        codeStates['grp_overall_tran_list10bd5'] = grp_overall_tran_list10bd5Props,
        codeStates['setgrp_overall_tran_list10bd5'] = setgrp_overall_tran_list10bd5Props,
        codeStates['tbl_tran_list'] = tbl_tran_list858ed,
        codeStates['settbl_tran_list'] = settbl_tran_list858ed,
        codeStates['tbl_tran_list858ed'] = tbl_tran_list858edProps,
        codeStates['settbl_tran_list858ed'] = settbl_tran_list858edProps,
        codeStates['col_emp_mol'] = col_emp_mole4029,
        codeStates['setcol_emp_mol'] = setcol_emp_mole4029,
        codeStates['col_emp_name'] = col_emp_name32c92,
        codeStates['setcol_emp_name'] = setcol_emp_name32c92,
        codeStates['col_cr_acc_no'] = col_cr_acc_no42627,
        codeStates['setcol_cr_acc_no'] = setcol_cr_acc_no42627,
        codeStates['col_fixed_amnt'] = col_fixed_amntd6d44,
        codeStates['setcol_fixed_amnt'] = setcol_fixed_amntd6d44,
        codeStates['col_var_amnt'] = col_var_amnt53ea2,
        codeStates['setcol_var_amnt'] = setcol_var_amnt53ea2,
        codeStates['col_tot_tran_amnt'] = col_tot_tran_amnta3392,
        codeStates['setcol_tot_tran_amnt'] = setcol_tot_tran_amnta3392,
        codeStates['col_created_date'] = col_created_dateea4ac,
        codeStates['setcol_created_date'] = setcol_created_dateea4ac,
        codeStates['col_sf_file_name'] = col_sf_file_name36fc1,
        codeStates['setcol_sf_file_name'] = setcol_sf_file_name36fc1,
        codeStates['col_rsn_code'] = col_rsn_codef367b,
        codeStates['setcol_rsn_code'] = setcol_rsn_codef367b,
        codeStates['btn_initiate'] = btn_initiate71727,
        codeStates['setbtn_initiate'] = setbtn_initiate71727,
        codeStates['col_uuid'] = col_uuida83f1,
        codeStates['setcol_uuid'] = setcol_uuida83f1,
        codeStates['btn_authorize'] = btn_authorizefce56,
        codeStates['setbtn_authorize'] = setbtn_authorizefce56,
        codeStates['btn_back'] = btn_back16e28,
        codeStates['setbtn_back'] = setbtn_back16e28,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const tbl_tran_list858edRef = useRef<any>(null);
  const handleClearSearch = () => {
    tbl_tran_list858edRef.current?.setSearchParams();
    tbl_tran_list858edRef.current?.handleSearch({});
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
        !Array.isArray(tbl_tran_list858ed) &&
        Object.keys(tbl_tran_list858ed)?.length > 0
      ) {
        settbl_tran_list858ed({})
        settbl_tran_list858edProps((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [tbl_tran_list858edProps?.refresh])


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
          setreturntransactionlist_v1((pre:any)=>({...pre,_selectedGroup_:"tbl_tran_list"}))
        }}
    >
      <div className='flex flex-col h-full w-full min-w-0 overflow-auto'>
        <div className='flex flex-1 w-full min-h-0'>
       {<Tabletbl_tran_list headerButtonsRenders={renderBUttons}
        tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} paginationDetails={paginationDetails} open={open} setOpen={setOpen} ref={tbl_tran_list858edRef} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData} setIsProcessing={setIsProcessing} groupData={groupData} controlData={controlData}/>}
      </div>
      </div>
    </div>
 )
}

export default Grouptbl_tran_list
