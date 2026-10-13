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
import Tabletbl_emp_list  from './Tabletbl_emp_list';  
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Grouptbl_emp_list = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_enquirygetemployee_v1Props, setdfd_enquirygetemployee_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "btn_emp_rpt",
      "btn_get_emp",
      "col_card_number",
      "col_uni_num",
      "col_emr_id",
      "col_sts_dated",
      "col_is_active",
      "col_pass_num",
      "col_tot_sal",
      "col_emp_name",
      "col_emp_name_ar",
      "col_prsn_code",
      "btn_salary_slip",
      "col_empr_num"
    ],
    "allowedGroups": [
      "canvas",
      "grp_overall_employee_list",
      "tbl_emp_list"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operational Manager": {
    "allowedControls": [
      "btn_emp_rpt",
      "btn_get_emp",
      "col_card_number",
      "col_uni_num",
      "col_emr_id",
      "col_sts_dated",
      "col_is_active",
      "col_pass_num",
      "col_tot_sal",
      "col_emp_name",
      "col_emp_name_ar",
      "col_prsn_code",
      "btn_salary_slip",
      "col_empr_num"
    ],
    "allowedGroups": [
      "canvas",
      "grp_overall_employee_list",
      "tbl_emp_list"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operational Officer": {
    "allowedControls": [
      "btn_emp_rpt",
      "btn_get_emp",
      "col_card_number",
      "col_uni_num",
      "col_emr_id",
      "col_sts_dated",
      "col_is_active",
      "col_pass_num",
      "col_tot_sal",
      "col_emp_name",
      "col_emp_name_ar",
      "col_prsn_code",
      "btn_salary_slip",
      "col_empr_num"
    ],
    "allowedGroups": [
      "canvas",
      "grp_overall_employee_list",
      "tbl_emp_list"
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
  const {grp_overall_employee_list1c655, setgrp_overall_employee_list1c655}= useContext(TotalContext) as TotalContextProps;
  const {grp_overall_employee_list1c655Props, setgrp_overall_employee_list1c655Props}= useContext(TotalContext) as TotalContextProps;
  const {tbl_emp_list2fa62, settbl_emp_list2fa62}= useContext(TotalContext) as TotalContextProps;
  const {tbl_emp_list2fa62Props, settbl_emp_list2fa62Props}= useContext(TotalContext) as TotalContextProps;
  const {btn_emp_rptf4b9a, setbtn_emp_rptf4b9a}= useContext(TotalContext) as TotalContextProps;
  const {btn_get_empdd09a, setbtn_get_empdd09a}= useContext(TotalContext) as TotalContextProps;
  const {col_card_numberbec8c, setcol_card_numberbec8c}= useContext(TotalContext) as TotalContextProps;
  const {col_uni_numd76ee, setcol_uni_numd76ee}= useContext(TotalContext) as TotalContextProps;
  const {col_emr_idd3a1f, setcol_emr_idd3a1f}= useContext(TotalContext) as TotalContextProps;
  const {col_sts_dated58fa4, setcol_sts_dated58fa4}= useContext(TotalContext) as TotalContextProps;
  const {col_is_actived0527, setcol_is_actived0527}= useContext(TotalContext) as TotalContextProps;
  const {col_pass_nume4031, setcol_pass_nume4031}= useContext(TotalContext) as TotalContextProps;
  const {col_tot_sale3e91, setcol_tot_sale3e91}= useContext(TotalContext) as TotalContextProps;
  const {col_emp_namefa4c3, setcol_emp_namefa4c3}= useContext(TotalContext) as TotalContextProps;
  const {col_emp_name_ar02a3b, setcol_emp_name_ar02a3b}= useContext(TotalContext) as TotalContextProps;
  const {col_prsn_code83655, setcol_prsn_code83655}= useContext(TotalContext) as TotalContextProps;
  const {btn_salary_slipb31d5, setbtn_salary_slipb31d5}= useContext(TotalContext) as TotalContextProps;
  const {col_empr_num3d80d, setcol_empr_num3d80d}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {enquirygetemployees_v1, setenquirygetemployees_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:WPS:AFK:enquiryGetEmployees:AFVK:v1',
    [user],
    'GroupTblEmpList',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "02fe082d28295c1ce4be4dc38962fa62");
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
    settbl_emp_list2fa62Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("btn_emp_rpt")){
        setbtn_emp_rptf4b9a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(btn_emp_rptf4b9a?.isDisabled==null)
      {
        setbtn_emp_rptf4b9a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("btn_get_emp")){
        setbtn_get_empdd09a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(btn_get_empdd09a?.isDisabled==null)
      {
        setbtn_get_empdd09a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("col_card_number")){
        setcol_card_numberbec8c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_card_numberbec8c?.isDisabled==null)
      {
        setcol_card_numberbec8c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("col_uni_num")){
        setcol_uni_numd76ee((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_uni_numd76ee?.isDisabled==null)
      {
        setcol_uni_numd76ee((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("col_emr_id")){
        setcol_emr_idd3a1f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_emr_idd3a1f?.isDisabled==null)
      {
        setcol_emr_idd3a1f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("col_sts_dated")){
        setcol_sts_dated58fa4((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_sts_dated58fa4?.isDisabled==null)
      {
        setcol_sts_dated58fa4((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("col_is_active")){
        setcol_is_actived0527((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_is_actived0527?.isDisabled==null)
      {
        setcol_is_actived0527((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("col_pass_num")){
        setcol_pass_nume4031((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_pass_nume4031?.isDisabled==null)
      {
        setcol_pass_nume4031((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("col_tot_sal")){
        setcol_tot_sale3e91((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_tot_sale3e91?.isDisabled==null)
      {
        setcol_tot_sale3e91((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("col_emp_name")){
        setcol_emp_namefa4c3((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_emp_namefa4c3?.isDisabled==null)
      {
        setcol_emp_namefa4c3((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("col_emp_name_ar")){
        setcol_emp_name_ar02a3b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_emp_name_ar02a3b?.isDisabled==null)
      {
        setcol_emp_name_ar02a3b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("col_prsn_code")){
        setcol_prsn_code83655((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_prsn_code83655?.isDisabled==null)
      {
        setcol_prsn_code83655((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("btn_salary_slip")){
        setbtn_salary_slipb31d5((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(btn_salary_slipb31d5?.isDisabled==null)
      {
        setbtn_salary_slipb31d5((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("col_empr_num")){
        setcol_empr_num3d80d((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_empr_num3d80d?.isDisabled==null)
      {
        setcol_empr_num3d80d((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "02fe082d28295c1ce4be4dc38962fa62");
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
        codeStates['grp_overall_employee_list'] = grp_overall_employee_list1c655,
        codeStates['setgrp_overall_employee_list'] = setgrp_overall_employee_list1c655,
        codeStates['grp_overall_employee_list1c655'] = grp_overall_employee_list1c655Props,
        codeStates['setgrp_overall_employee_list1c655'] = setgrp_overall_employee_list1c655Props,
        codeStates['tbl_emp_list'] = tbl_emp_list2fa62,
        codeStates['settbl_emp_list'] = settbl_emp_list2fa62,
        codeStates['tbl_emp_list2fa62'] = tbl_emp_list2fa62Props,
        codeStates['settbl_emp_list2fa62'] = settbl_emp_list2fa62Props,
        codeStates['btn_emp_rpt'] = btn_emp_rptf4b9a,
        codeStates['setbtn_emp_rpt'] = setbtn_emp_rptf4b9a,
        codeStates['btn_get_emp'] = btn_get_empdd09a,
        codeStates['setbtn_get_emp'] = setbtn_get_empdd09a,
        codeStates['col_card_number'] = col_card_numberbec8c,
        codeStates['setcol_card_number'] = setcol_card_numberbec8c,
        codeStates['col_uni_num'] = col_uni_numd76ee,
        codeStates['setcol_uni_num'] = setcol_uni_numd76ee,
        codeStates['col_emr_id'] = col_emr_idd3a1f,
        codeStates['setcol_emr_id'] = setcol_emr_idd3a1f,
        codeStates['col_sts_dated'] = col_sts_dated58fa4,
        codeStates['setcol_sts_dated'] = setcol_sts_dated58fa4,
        codeStates['col_is_active'] = col_is_actived0527,
        codeStates['setcol_is_active'] = setcol_is_actived0527,
        codeStates['col_pass_num'] = col_pass_nume4031,
        codeStates['setcol_pass_num'] = setcol_pass_nume4031,
        codeStates['col_tot_sal'] = col_tot_sale3e91,
        codeStates['setcol_tot_sal'] = setcol_tot_sale3e91,
        codeStates['col_emp_name'] = col_emp_namefa4c3,
        codeStates['setcol_emp_name'] = setcol_emp_namefa4c3,
        codeStates['col_emp_name_ar'] = col_emp_name_ar02a3b,
        codeStates['setcol_emp_name_ar'] = setcol_emp_name_ar02a3b,
        codeStates['col_prsn_code'] = col_prsn_code83655,
        codeStates['setcol_prsn_code'] = setcol_prsn_code83655,
        codeStates['btn_salary_slip'] = btn_salary_slipb31d5,
        codeStates['setbtn_salary_slip'] = setbtn_salary_slipb31d5,
        codeStates['col_empr_num'] = col_empr_num3d80d,
        codeStates['setcol_empr_num'] = setcol_empr_num3d80d,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const tbl_emp_list2fa62Ref = useRef<any>(null);
  const handleClearSearch = () => {
    tbl_emp_list2fa62Ref.current?.setSearchParams();
    tbl_emp_list2fa62Ref.current?.handleSearch({});
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
        !Array.isArray(tbl_emp_list2fa62) &&
        Object.keys(tbl_emp_list2fa62)?.length > 0
      ) {
        settbl_emp_list2fa62({})
        settbl_emp_list2fa62Props((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [tbl_emp_list2fa62Props?.refresh])


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
            iconDisplay={tbl_emp_list2fa62Ref?.current?.isHaveSearch?  "Icon only" : "Start with Icon"}
            className="p-2"
            >
            Search
          </Button>
          {tbl_emp_list2fa62Ref?.current?.isHaveSearch&&(
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
        gridRow: '14 / 130',
      
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
          setenquirygetemployees_v1((pre:any)=>({...pre,_selectedGroup_:"tbl_emp_list"}))
        }}
    >
      <div className='flex flex-col h-full w-full min-w-0 overflow-auto'>
        <div className='flex flex-1 w-full min-h-0'>
       {<Tabletbl_emp_list headerButtonsRenders={renderBUttons}
          headerPosition='top'
          headerText="Employee List"
        tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} paginationDetails={paginationDetails} open={open} setOpen={setOpen} ref={tbl_emp_list2fa62Ref} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData} setIsProcessing={setIsProcessing} groupData={groupData} controlData={controlData}/>}
      </div>
      </div>
    </div>
 )
}

export default Grouptbl_emp_list
