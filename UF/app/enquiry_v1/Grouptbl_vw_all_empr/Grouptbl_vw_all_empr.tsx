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
import Tabletbl_vw_all_empr  from './Tabletbl_vw_all_empr';  
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Grouptbl_vw_all_empr = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_enquiryviewallemployers_v1Props, setdfd_enquiryviewallemployers_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "col_cor_mol",
      "col_cor_namw",
      "btn_get_reg_empr",
      "col_cor_reg_id",
      "col_cor_eid",
      "col_mh_sts",
      "btn_empr_rpt",
      "btn_empr_status",
      "btn_getemployes"
    ],
    "allowedGroups": [
      "canvas",
      "grp_wps",
      "grp_eob",
      "grp_enquiry",
      "tabgroup_return_refund",
      "tab_header_view_all_emp",
      "grp_retun_ref",
      "tbl_vw_all_empr",
      "tab_headerview_all_tran",
      "grp_reqforref",
      "tbl_view_all_tran"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operational Manager": {
    "allowedControls": [
      "col_cor_mol",
      "col_cor_namw",
      "btn_get_reg_empr",
      "col_cor_reg_id",
      "col_cor_eid",
      "col_mh_sts",
      "btn_empr_rpt",
      "btn_empr_status",
      "btn_getemployes"
    ],
    "allowedGroups": [
      "canvas",
      "grp_wps",
      "grp_eob",
      "grp_enquiry",
      "tabgroup_return_refund",
      "tab_header_view_all_emp",
      "grp_retun_ref",
      "tbl_vw_all_empr",
      "tab_headerview_all_tran",
      "grp_reqforref",
      "tbl_view_all_tran"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operational Officer": {
    "allowedControls": [
      "col_cor_mol",
      "col_cor_namw",
      "btn_get_reg_empr",
      "col_cor_reg_id",
      "col_cor_eid",
      "col_mh_sts",
      "btn_empr_rpt",
      "btn_empr_status",
      "btn_getemployes"
    ],
    "allowedGroups": [
      "canvas",
      "grp_wps",
      "grp_eob",
      "grp_enquiry",
      "tabgroup_return_refund",
      "tab_header_view_all_emp",
      "grp_retun_ref",
      "tbl_vw_all_empr",
      "tab_headerview_all_tran",
      "grp_reqforref",
      "tbl_view_all_tran"
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
  const {grp_wpsfa727, setgrp_wpsfa727}= useContext(TotalContext) as TotalContextProps;
  const {grp_wpsfa727Props, setgrp_wpsfa727Props}= useContext(TotalContext) as TotalContextProps;
  const {grp_eob8dfac, setgrp_eob8dfac}= useContext(TotalContext) as TotalContextProps;
  const {grp_eob8dfacProps, setgrp_eob8dfacProps}= useContext(TotalContext) as TotalContextProps;
  const {grp_enquiryd2b2a, setgrp_enquiryd2b2a}= useContext(TotalContext) as TotalContextProps;
  const {grp_enquiryd2b2aProps, setgrp_enquiryd2b2aProps}= useContext(TotalContext) as TotalContextProps;
  const {tabgroup_return_refund511db, settabgroup_return_refund511db}= useContext(TotalContext) as TotalContextProps;
  const {tabgroup_return_refund511dbProps, settabgroup_return_refund511dbProps}= useContext(TotalContext) as TotalContextProps;
  const {tab_header_view_all_emp58f45, settab_header_view_all_emp58f45}= useContext(TotalContext) as TotalContextProps;
  const {tab_header_view_all_emp58f45Props, settab_header_view_all_emp58f45Props}= useContext(TotalContext) as TotalContextProps;
  const {grp_retun_ref230e2, setgrp_retun_ref230e2}= useContext(TotalContext) as TotalContextProps;
  const {grp_retun_ref230e2Props, setgrp_retun_ref230e2Props}= useContext(TotalContext) as TotalContextProps;
  const {tbl_vw_all_empr8a2a9, settbl_vw_all_empr8a2a9}= useContext(TotalContext) as TotalContextProps;
  const {tbl_vw_all_empr8a2a9Props, settbl_vw_all_empr8a2a9Props}= useContext(TotalContext) as TotalContextProps;
  const {col_cor_mold12cb, setcol_cor_mold12cb}= useContext(TotalContext) as TotalContextProps;
  const {col_cor_namw4bb17, setcol_cor_namw4bb17}= useContext(TotalContext) as TotalContextProps;
  const {btn_get_reg_emprb999a, setbtn_get_reg_emprb999a}= useContext(TotalContext) as TotalContextProps;
  const {col_cor_reg_idf2c18, setcol_cor_reg_idf2c18}= useContext(TotalContext) as TotalContextProps;
  const {col_cor_eidcba45, setcol_cor_eidcba45}= useContext(TotalContext) as TotalContextProps;
  const {col_mh_sts9087c, setcol_mh_sts9087c}= useContext(TotalContext) as TotalContextProps;
  const {btn_empr_rpt13ff7, setbtn_empr_rpt13ff7}= useContext(TotalContext) as TotalContextProps;
  const {btn_empr_status5b036, setbtn_empr_status5b036}= useContext(TotalContext) as TotalContextProps;
  const {btn_getemployes2c08a, setbtn_getemployes2c08a}= useContext(TotalContext) as TotalContextProps;
  const {tab_headerview_all_tranaa773, settab_headerview_all_tranaa773}= useContext(TotalContext) as TotalContextProps;
  const {tab_headerview_all_tranaa773Props, settab_headerview_all_tranaa773Props}= useContext(TotalContext) as TotalContextProps;
  const {grp_reqforref4f82e, setgrp_reqforref4f82e}= useContext(TotalContext) as TotalContextProps;
  const {grp_reqforref4f82eProps, setgrp_reqforref4f82eProps}= useContext(TotalContext) as TotalContextProps;
  const {tbl_view_all_tran1b49d, settbl_view_all_tran1b49d}= useContext(TotalContext) as TotalContextProps;
  const {tbl_view_all_tran1b49dProps, settbl_view_all_tran1b49dProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {enquiry_v1, setenquiry_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:WPS:AFK:enquiry:AFVK:v1',
    [user],
    'GroupTblVwAllEmpr',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "f9ffa799ea4e8d68d735cc6ad0c8a2a9");
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
    settbl_vw_all_empr8a2a9Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("col_cor_mol")){
        setcol_cor_mold12cb((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_cor_mold12cb?.isDisabled==null)
      {
        setcol_cor_mold12cb((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("col_cor_namw")){
        setcol_cor_namw4bb17((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_cor_namw4bb17?.isDisabled==null)
      {
        setcol_cor_namw4bb17((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("btn_get_reg_empr")){
        setbtn_get_reg_emprb999a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(btn_get_reg_emprb999a?.isDisabled==null)
      {
        setbtn_get_reg_emprb999a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("col_cor_reg_id")){
        setcol_cor_reg_idf2c18((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_cor_reg_idf2c18?.isDisabled==null)
      {
        setcol_cor_reg_idf2c18((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("col_cor_eid")){
        setcol_cor_eidcba45((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_cor_eidcba45?.isDisabled==null)
      {
        setcol_cor_eidcba45((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("col_mh_sts")){
        setcol_mh_sts9087c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_mh_sts9087c?.isDisabled==null)
      {
        setcol_mh_sts9087c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("btn_empr_rpt")){
        setbtn_empr_rpt13ff7((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(btn_empr_rpt13ff7?.isDisabled==null)
      {
        setbtn_empr_rpt13ff7((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("btn_empr_status")){
        setbtn_empr_status5b036((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(btn_empr_status5b036?.isDisabled==null)
      {
        setbtn_empr_status5b036((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("btn_getemployes")){
        setbtn_getemployes2c08a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(btn_getemployes2c08a?.isDisabled==null)
      {
        setbtn_getemployes2c08a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "f9ffa799ea4e8d68d735cc6ad0c8a2a9");
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
        codeStates['grp_wps'] = grp_wpsfa727,
        codeStates['setgrp_wps'] = setgrp_wpsfa727,
        codeStates['grp_wpsfa727'] = grp_wpsfa727Props,
        codeStates['setgrp_wpsfa727'] = setgrp_wpsfa727Props,
        codeStates['grp_eob'] = grp_eob8dfac,
        codeStates['setgrp_eob'] = setgrp_eob8dfac,
        codeStates['grp_eob8dfac'] = grp_eob8dfacProps,
        codeStates['setgrp_eob8dfac'] = setgrp_eob8dfacProps,
        codeStates['grp_enquiry'] = grp_enquiryd2b2a,
        codeStates['setgrp_enquiry'] = setgrp_enquiryd2b2a,
        codeStates['grp_enquiryd2b2a'] = grp_enquiryd2b2aProps,
        codeStates['setgrp_enquiryd2b2a'] = setgrp_enquiryd2b2aProps,
        codeStates['tabgroup_return_refund'] = tabgroup_return_refund511db,
        codeStates['settabgroup_return_refund'] = settabgroup_return_refund511db,
        codeStates['tabgroup_return_refund511db'] = tabgroup_return_refund511dbProps,
        codeStates['settabgroup_return_refund511db'] = settabgroup_return_refund511dbProps,
        codeStates['tab_header_view_all_emp'] = tab_header_view_all_emp58f45,
        codeStates['settab_header_view_all_emp'] = settab_header_view_all_emp58f45,
        codeStates['tab_header_view_all_emp58f45'] = tab_header_view_all_emp58f45Props,
        codeStates['settab_header_view_all_emp58f45'] = settab_header_view_all_emp58f45Props,
        codeStates['grp_retun_ref'] = grp_retun_ref230e2,
        codeStates['setgrp_retun_ref'] = setgrp_retun_ref230e2,
        codeStates['grp_retun_ref230e2'] = grp_retun_ref230e2Props,
        codeStates['setgrp_retun_ref230e2'] = setgrp_retun_ref230e2Props,
        codeStates['tbl_vw_all_empr'] = tbl_vw_all_empr8a2a9,
        codeStates['settbl_vw_all_empr'] = settbl_vw_all_empr8a2a9,
        codeStates['tbl_vw_all_empr8a2a9'] = tbl_vw_all_empr8a2a9Props,
        codeStates['settbl_vw_all_empr8a2a9'] = settbl_vw_all_empr8a2a9Props,
        codeStates['col_cor_mol'] = col_cor_mold12cb,
        codeStates['setcol_cor_mol'] = setcol_cor_mold12cb,
        codeStates['col_cor_namw'] = col_cor_namw4bb17,
        codeStates['setcol_cor_namw'] = setcol_cor_namw4bb17,
        codeStates['btn_get_reg_empr'] = btn_get_reg_emprb999a,
        codeStates['setbtn_get_reg_empr'] = setbtn_get_reg_emprb999a,
        codeStates['col_cor_reg_id'] = col_cor_reg_idf2c18,
        codeStates['setcol_cor_reg_id'] = setcol_cor_reg_idf2c18,
        codeStates['col_cor_eid'] = col_cor_eidcba45,
        codeStates['setcol_cor_eid'] = setcol_cor_eidcba45,
        codeStates['col_mh_sts'] = col_mh_sts9087c,
        codeStates['setcol_mh_sts'] = setcol_mh_sts9087c,
        codeStates['btn_empr_rpt'] = btn_empr_rpt13ff7,
        codeStates['setbtn_empr_rpt'] = setbtn_empr_rpt13ff7,
        codeStates['btn_empr_status'] = btn_empr_status5b036,
        codeStates['setbtn_empr_status'] = setbtn_empr_status5b036,
        codeStates['btn_getemployes'] = btn_getemployes2c08a,
        codeStates['setbtn_getemployes'] = setbtn_getemployes2c08a,
        codeStates['tab_headerview_all_tran'] = tab_headerview_all_tranaa773,
        codeStates['settab_headerview_all_tran'] = settab_headerview_all_tranaa773,
        codeStates['tab_headerview_all_tranaa773'] = tab_headerview_all_tranaa773Props,
        codeStates['settab_headerview_all_tranaa773'] = settab_headerview_all_tranaa773Props,
        codeStates['grp_reqforref'] = grp_reqforref4f82e,
        codeStates['setgrp_reqforref'] = setgrp_reqforref4f82e,
        codeStates['grp_reqforref4f82e'] = grp_reqforref4f82eProps,
        codeStates['setgrp_reqforref4f82e'] = setgrp_reqforref4f82eProps,
        codeStates['tbl_view_all_tran'] = tbl_view_all_tran1b49d,
        codeStates['settbl_view_all_tran'] = settbl_view_all_tran1b49d,
        codeStates['tbl_view_all_tran1b49d'] = tbl_view_all_tran1b49dProps,
        codeStates['settbl_view_all_tran1b49d'] = settbl_view_all_tran1b49dProps,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const tbl_vw_all_empr8a2a9Ref = useRef<any>(null);
  const handleClearSearch = () => {
    tbl_vw_all_empr8a2a9Ref.current?.setSearchParams();
    tbl_vw_all_empr8a2a9Ref.current?.handleSearch({});
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
        !Array.isArray(tbl_vw_all_empr8a2a9) &&
        Object.keys(tbl_vw_all_empr8a2a9)?.length > 0
      ) {
        settbl_vw_all_empr8a2a9({})
        settbl_vw_all_empr8a2a9Props((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [tbl_vw_all_empr8a2a9Props?.refresh])


  useEffect(() => {
    subscreenCheck()
  }, [])


  const renderBUttons=()=>{
    return (
        <div
          className='flex-shrink-0 overflow-x-auto pl-1'>
          <div className='flex justify-end w-max min-w-full gap-1'>
      </div>
      </div>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '2 / 61',
      
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
          setenquiry_v1((pre:any)=>({...pre,_selectedGroup_:"tbl_vw_all_empr"}))
        }}
    >
      <div className='flex flex-col h-full w-full min-w-0 overflow-auto'>
        <div className='flex flex-1 w-full min-h-0'>
       {<Tabletbl_vw_all_empr headerButtonsRenders={renderBUttons}
        tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} paginationDetails={paginationDetails} open={open} setOpen={setOpen} ref={tbl_vw_all_empr8a2a9Ref} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData} setIsProcessing={setIsProcessing} groupData={groupData} controlData={controlData}/>}
      </div>
      </div>
    </div>
 )
}

export default Grouptbl_vw_all_empr
