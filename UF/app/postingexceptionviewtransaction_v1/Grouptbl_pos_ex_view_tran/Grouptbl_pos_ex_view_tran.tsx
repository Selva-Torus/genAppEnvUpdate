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
import Tabletbl_pos_ex_view_tran  from './Tabletbl_pos_ex_view_tran';  
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Grouptbl_pos_ex_view_tran = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_wpsnackfailuretransactionlist_postingexceptionviewtransaction_v1Props, setdfd_wpsnackfailuretransactionlist_postingexceptionviewtransaction_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "btn_alredy_posted",
      "col_source_name",
      "col_vph_ref_id",
      "col_emp_name",
      "col_cr_ac_no",
      "col_fixed_amnt",
      "btn_retry",
      "col_var_amnt",
      "col_tot_amnt",
      "col_src_file_name"
    ],
    "allowedGroups": [
      "canvas",
      "grp_overall_tran_list",
      "tbl_pos_ex_view_tran"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operational Manager": {
    "allowedControls": [
      "btn_alredy_posted",
      "col_source_name",
      "col_vph_ref_id",
      "col_emp_name",
      "col_cr_ac_no",
      "col_fixed_amnt",
      "btn_retry",
      "col_var_amnt",
      "col_tot_amnt",
      "col_src_file_name"
    ],
    "allowedGroups": [
      "canvas",
      "grp_overall_tran_list",
      "tbl_pos_ex_view_tran"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operational Officer": {
    "allowedControls": [
      "btn_alredy_posted",
      "col_source_name",
      "col_vph_ref_id",
      "col_emp_name",
      "col_cr_ac_no",
      "col_fixed_amnt",
      "btn_retry",
      "col_var_amnt",
      "col_tot_amnt",
      "col_src_file_name"
    ],
    "allowedGroups": [
      "canvas",
      "grp_overall_tran_list",
      "tbl_pos_ex_view_tran"
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
  const {grp_overall_tran_list52636, setgrp_overall_tran_list52636}= useContext(TotalContext) as TotalContextProps;
  const {grp_overall_tran_list52636Props, setgrp_overall_tran_list52636Props}= useContext(TotalContext) as TotalContextProps;
  const {tbl_pos_ex_view_tran8df93, settbl_pos_ex_view_tran8df93}= useContext(TotalContext) as TotalContextProps;
  const {tbl_pos_ex_view_tran8df93Props, settbl_pos_ex_view_tran8df93Props}= useContext(TotalContext) as TotalContextProps;
  const {btn_alredy_postedf023e, setbtn_alredy_postedf023e}= useContext(TotalContext) as TotalContextProps;
  const {col_source_name06356, setcol_source_name06356}= useContext(TotalContext) as TotalContextProps;
  const {col_vph_ref_iddff78, setcol_vph_ref_iddff78}= useContext(TotalContext) as TotalContextProps;
  const {col_emp_namee8195, setcol_emp_namee8195}= useContext(TotalContext) as TotalContextProps;
  const {col_cr_ac_no43a43, setcol_cr_ac_no43a43}= useContext(TotalContext) as TotalContextProps;
  const {col_fixed_amnt8dd2c, setcol_fixed_amnt8dd2c}= useContext(TotalContext) as TotalContextProps;
  const {btn_retry6dcf1, setbtn_retry6dcf1}= useContext(TotalContext) as TotalContextProps;
  const {col_var_amnt3cf81, setcol_var_amnt3cf81}= useContext(TotalContext) as TotalContextProps;
  const {col_tot_amnt3dd6f, setcol_tot_amnt3dd6f}= useContext(TotalContext) as TotalContextProps;
  const {col_src_file_name0456e, setcol_src_file_name0456e}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {postingexceptionviewtransaction_v1, setpostingexceptionviewtransaction_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:WPS:AFK:postingExceptionViewTransaction:AFVK:v1',
    [user],
    'GroupTblPosExViewTran',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "c4fa0588b9682751974b6db6f098df93");
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
    settbl_pos_ex_view_tran8df93Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("btn_alredy_posted")){
        setbtn_alredy_postedf023e((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(btn_alredy_postedf023e?.isDisabled==null)
      {
        setbtn_alredy_postedf023e((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("col_source_name")){
        setcol_source_name06356((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_source_name06356?.isDisabled==null)
      {
        setcol_source_name06356((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("col_vph_ref_id")){
        setcol_vph_ref_iddff78((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_vph_ref_iddff78?.isDisabled==null)
      {
        setcol_vph_ref_iddff78((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("col_emp_name")){
        setcol_emp_namee8195((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_emp_namee8195?.isDisabled==null)
      {
        setcol_emp_namee8195((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("col_cr_ac_no")){
        setcol_cr_ac_no43a43((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_cr_ac_no43a43?.isDisabled==null)
      {
        setcol_cr_ac_no43a43((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("col_fixed_amnt")){
        setcol_fixed_amnt8dd2c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_fixed_amnt8dd2c?.isDisabled==null)
      {
        setcol_fixed_amnt8dd2c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("btn_retry")){
        setbtn_retry6dcf1((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(btn_retry6dcf1?.isDisabled==null)
      {
        setbtn_retry6dcf1((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("col_var_amnt")){
        setcol_var_amnt3cf81((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_var_amnt3cf81?.isDisabled==null)
      {
        setcol_var_amnt3cf81((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("col_tot_amnt")){
        setcol_tot_amnt3dd6f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_tot_amnt3dd6f?.isDisabled==null)
      {
        setcol_tot_amnt3dd6f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("col_src_file_name")){
        setcol_src_file_name0456e((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_src_file_name0456e?.isDisabled==null)
      {
        setcol_src_file_name0456e((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "c4fa0588b9682751974b6db6f098df93");
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
        codeStates['grp_overall_tran_list'] = grp_overall_tran_list52636,
        codeStates['setgrp_overall_tran_list'] = setgrp_overall_tran_list52636,
        codeStates['grp_overall_tran_list52636'] = grp_overall_tran_list52636Props,
        codeStates['setgrp_overall_tran_list52636'] = setgrp_overall_tran_list52636Props,
        codeStates['tbl_pos_ex_view_tran'] = tbl_pos_ex_view_tran8df93,
        codeStates['settbl_pos_ex_view_tran'] = settbl_pos_ex_view_tran8df93,
        codeStates['tbl_pos_ex_view_tran8df93'] = tbl_pos_ex_view_tran8df93Props,
        codeStates['settbl_pos_ex_view_tran8df93'] = settbl_pos_ex_view_tran8df93Props,
        codeStates['btn_alredy_posted'] = btn_alredy_postedf023e,
        codeStates['setbtn_alredy_posted'] = setbtn_alredy_postedf023e,
        codeStates['col_source_name'] = col_source_name06356,
        codeStates['setcol_source_name'] = setcol_source_name06356,
        codeStates['col_vph_ref_id'] = col_vph_ref_iddff78,
        codeStates['setcol_vph_ref_id'] = setcol_vph_ref_iddff78,
        codeStates['col_emp_name'] = col_emp_namee8195,
        codeStates['setcol_emp_name'] = setcol_emp_namee8195,
        codeStates['col_cr_ac_no'] = col_cr_ac_no43a43,
        codeStates['setcol_cr_ac_no'] = setcol_cr_ac_no43a43,
        codeStates['col_fixed_amnt'] = col_fixed_amnt8dd2c,
        codeStates['setcol_fixed_amnt'] = setcol_fixed_amnt8dd2c,
        codeStates['btn_retry'] = btn_retry6dcf1,
        codeStates['setbtn_retry'] = setbtn_retry6dcf1,
        codeStates['col_var_amnt'] = col_var_amnt3cf81,
        codeStates['setcol_var_amnt'] = setcol_var_amnt3cf81,
        codeStates['col_tot_amnt'] = col_tot_amnt3dd6f,
        codeStates['setcol_tot_amnt'] = setcol_tot_amnt3dd6f,
        codeStates['col_src_file_name'] = col_src_file_name0456e,
        codeStates['setcol_src_file_name'] = setcol_src_file_name0456e,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const tbl_pos_ex_view_tran8df93Ref = useRef<any>(null);
  const handleClearSearch = () => {
    tbl_pos_ex_view_tran8df93Ref.current?.setSearchParams();
    tbl_pos_ex_view_tran8df93Ref.current?.handleSearch({});
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
        !Array.isArray(tbl_pos_ex_view_tran8df93) &&
        Object.keys(tbl_pos_ex_view_tran8df93)?.length > 0
      ) {
        settbl_pos_ex_view_tran8df93({})
        settbl_pos_ex_view_tran8df93Props((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [tbl_pos_ex_view_tran8df93Props?.refresh])


  useEffect(() => {
    subscreenCheck()
  }, [])


  const renderBUttons=()=>{
    return (
        <div
          className='flex-shrink-0 overflow-x-auto pl-1'>
          <div className='flex justify-end w-max min-w-full gap-1'>
        <div className='flex flex-row shrink-0'>
          <Button
            view='action'
            pin={"circle-circle"}
            onClick={() => setOpen(true)}
            icon="FaSearch"
            iconDisplay={tbl_pos_ex_view_tran8df93Ref?.current?.isHaveSearch?  "Icon only" : "Start with Icon"}
            className="p-2"
            >
            Search
          </Button>
          {tbl_pos_ex_view_tran8df93Ref?.current?.isHaveSearch&&(
            <Button 
              pin={"circle-circle"}
              onClick={() => handleClearSearch()}
              view='action'
              icon="FaTimes"
              iconDisplay="Icon only"
              className="p-2"
              />
            )}
        </div>
      </div>
      </div>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '5 / 143',
      
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
          setpostingexceptionviewtransaction_v1((pre:any)=>({...pre,_selectedGroup_:"tbl_pos_ex_view_tran"}))
        }}
    >
      <div className='flex flex-col h-full w-full min-w-0 overflow-auto'>
        <div className='flex flex-1 w-full min-h-0'>
       {<Tabletbl_pos_ex_view_tran headerButtonsRenders={renderBUttons}
          headerPosition='top'
          headerText="Transaction List"
        tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} paginationDetails={paginationDetails} open={open} setOpen={setOpen} ref={tbl_pos_ex_view_tran8df93Ref} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData} setIsProcessing={setIsProcessing} groupData={groupData} controlData={controlData}/>}
      </div>
      </div>
    </div>
 )
}

export default Grouptbl_pos_ex_view_tran
