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
import Tabletbl_return_fie_list  from './Tabletbl_return_fie_list';  
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Grouptbl_return_fie_list = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_returnfromagentfilelist_v1Props, setdfd_returnfromagentfilelist_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_requestforrefundfilelist_v1Props, setdfd_requestforrefundfilelist_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "col_src_name",
      "col_tran_count",
      "btn_rr_view_tran",
      "col_fixed_amnt",
      "col_var_amnt",
      "col_tot_file_amnt",
      "col_created_date",
      "col_sf_file_name"
    ],
    "allowedGroups": [
      "canvas",
      "grp_wps",
      "grp_eob",
      "grp_return_refund",
      "tabgroup_return_refund",
      "tab_header_return_frm_agent",
      "grp_retun_ref",
      "tbl_return_fie_list",
      "tab_header_req_for_refund",
      "grp_rr_retun_ref",
      "tbl_rr_req_for_refund"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operational Manager": {
    "allowedControls": [
      "col_src_name",
      "col_tran_count",
      "btn_rr_view_tran",
      "col_fixed_amnt",
      "col_var_amnt",
      "col_tot_file_amnt",
      "col_created_date",
      "col_sf_file_name"
    ],
    "allowedGroups": [
      "canvas",
      "grp_wps",
      "grp_eob",
      "grp_return_refund",
      "tabgroup_return_refund",
      "tab_header_return_frm_agent",
      "grp_retun_ref",
      "tbl_return_fie_list",
      "tab_header_req_for_refund",
      "grp_rr_retun_ref",
      "tbl_rr_req_for_refund"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operational Officer": {
    "allowedControls": [
      "col_src_name",
      "col_tran_count",
      "btn_rr_view_tran",
      "col_fixed_amnt",
      "col_var_amnt",
      "col_tot_file_amnt",
      "col_created_date",
      "col_sf_file_name"
    ],
    "allowedGroups": [
      "canvas",
      "grp_wps",
      "grp_eob",
      "grp_return_refund",
      "tabgroup_return_refund",
      "tab_header_return_frm_agent",
      "grp_retun_ref",
      "tbl_return_fie_list",
      "tab_header_req_for_refund",
      "grp_rr_retun_ref",
      "tbl_rr_req_for_refund"
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
  const {grp_wpsb96c6, setgrp_wpsb96c6}= useContext(TotalContext) as TotalContextProps;
  const {grp_wpsb96c6Props, setgrp_wpsb96c6Props}= useContext(TotalContext) as TotalContextProps;
  const {grp_eobed127, setgrp_eobed127}= useContext(TotalContext) as TotalContextProps;
  const {grp_eobed127Props, setgrp_eobed127Props}= useContext(TotalContext) as TotalContextProps;
  const {grp_return_refundc4a03, setgrp_return_refundc4a03}= useContext(TotalContext) as TotalContextProps;
  const {grp_return_refundc4a03Props, setgrp_return_refundc4a03Props}= useContext(TotalContext) as TotalContextProps;
  const {tabgroup_return_refund4e9b7, settabgroup_return_refund4e9b7}= useContext(TotalContext) as TotalContextProps;
  const {tabgroup_return_refund4e9b7Props, settabgroup_return_refund4e9b7Props}= useContext(TotalContext) as TotalContextProps;
  const {tab_header_return_frm_agent2d327, settab_header_return_frm_agent2d327}= useContext(TotalContext) as TotalContextProps;
  const {tab_header_return_frm_agent2d327Props, settab_header_return_frm_agent2d327Props}= useContext(TotalContext) as TotalContextProps;
  const {grp_retun_ref3e6e6, setgrp_retun_ref3e6e6}= useContext(TotalContext) as TotalContextProps;
  const {grp_retun_ref3e6e6Props, setgrp_retun_ref3e6e6Props}= useContext(TotalContext) as TotalContextProps;
  const {tbl_return_fie_list8f636, settbl_return_fie_list8f636}= useContext(TotalContext) as TotalContextProps;
  const {tbl_return_fie_list8f636Props, settbl_return_fie_list8f636Props}= useContext(TotalContext) as TotalContextProps;
  const {col_src_namee7c6a, setcol_src_namee7c6a}= useContext(TotalContext) as TotalContextProps;
  const {col_tran_count3ad7d, setcol_tran_count3ad7d}= useContext(TotalContext) as TotalContextProps;
  const {btn_rr_view_tran772a2, setbtn_rr_view_tran772a2}= useContext(TotalContext) as TotalContextProps;
  const {col_fixed_amnt007c9, setcol_fixed_amnt007c9}= useContext(TotalContext) as TotalContextProps;
  const {col_var_amntdff09, setcol_var_amntdff09}= useContext(TotalContext) as TotalContextProps;
  const {col_tot_file_amnt9fdc3, setcol_tot_file_amnt9fdc3}= useContext(TotalContext) as TotalContextProps;
  const {col_created_datef8d57, setcol_created_datef8d57}= useContext(TotalContext) as TotalContextProps;
  const {col_sf_file_name809f4, setcol_sf_file_name809f4}= useContext(TotalContext) as TotalContextProps;
  const {tab_header_req_for_refundeadd2, settab_header_req_for_refundeadd2}= useContext(TotalContext) as TotalContextProps;
  const {tab_header_req_for_refundeadd2Props, settab_header_req_for_refundeadd2Props}= useContext(TotalContext) as TotalContextProps;
  const {grp_rr_retun_ref5362d, setgrp_rr_retun_ref5362d}= useContext(TotalContext) as TotalContextProps;
  const {grp_rr_retun_ref5362dProps, setgrp_rr_retun_ref5362dProps}= useContext(TotalContext) as TotalContextProps;
  const {tbl_rr_req_for_refunde2c9a, settbl_rr_req_for_refunde2c9a}= useContext(TotalContext) as TotalContextProps;
  const {tbl_rr_req_for_refunde2c9aProps, settbl_rr_req_for_refunde2c9aProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {returnsrefund_v1, setreturnsrefund_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:WPS:AFK:returnsRefund:AFVK:v1',
    [user],
    'GroupTblReturnFieList',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "096e0d000b1845519b0f79759518f636");
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
    settbl_return_fie_list8f636Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("col_src_name")){
        setcol_src_namee7c6a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_src_namee7c6a?.isDisabled==null)
      {
        setcol_src_namee7c6a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("col_tran_count")){
        setcol_tran_count3ad7d((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_tran_count3ad7d?.isDisabled==null)
      {
        setcol_tran_count3ad7d((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("btn_rr_view_tran")){
        setbtn_rr_view_tran772a2((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(btn_rr_view_tran772a2?.isDisabled==null)
      {
        setbtn_rr_view_tran772a2((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("col_fixed_amnt")){
        setcol_fixed_amnt007c9((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_fixed_amnt007c9?.isDisabled==null)
      {
        setcol_fixed_amnt007c9((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("col_var_amnt")){
        setcol_var_amntdff09((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_var_amntdff09?.isDisabled==null)
      {
        setcol_var_amntdff09((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("col_tot_file_amnt")){
        setcol_tot_file_amnt9fdc3((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_tot_file_amnt9fdc3?.isDisabled==null)
      {
        setcol_tot_file_amnt9fdc3((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("col_created_date")){
        setcol_created_datef8d57((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_created_datef8d57?.isDisabled==null)
      {
        setcol_created_datef8d57((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("col_sf_file_name")){
        setcol_sf_file_name809f4((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_sf_file_name809f4?.isDisabled==null)
      {
        setcol_sf_file_name809f4((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "096e0d000b1845519b0f79759518f636");
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
        codeStates['grp_wps'] = grp_wpsb96c6,
        codeStates['setgrp_wps'] = setgrp_wpsb96c6,
        codeStates['grp_wpsb96c6'] = grp_wpsb96c6Props,
        codeStates['setgrp_wpsb96c6'] = setgrp_wpsb96c6Props,
        codeStates['grp_eob'] = grp_eobed127,
        codeStates['setgrp_eob'] = setgrp_eobed127,
        codeStates['grp_eobed127'] = grp_eobed127Props,
        codeStates['setgrp_eobed127'] = setgrp_eobed127Props,
        codeStates['grp_return_refund'] = grp_return_refundc4a03,
        codeStates['setgrp_return_refund'] = setgrp_return_refundc4a03,
        codeStates['grp_return_refundc4a03'] = grp_return_refundc4a03Props,
        codeStates['setgrp_return_refundc4a03'] = setgrp_return_refundc4a03Props,
        codeStates['tabgroup_return_refund'] = tabgroup_return_refund4e9b7,
        codeStates['settabgroup_return_refund'] = settabgroup_return_refund4e9b7,
        codeStates['tabgroup_return_refund4e9b7'] = tabgroup_return_refund4e9b7Props,
        codeStates['settabgroup_return_refund4e9b7'] = settabgroup_return_refund4e9b7Props,
        codeStates['tab_header_return_frm_agent'] = tab_header_return_frm_agent2d327,
        codeStates['settab_header_return_frm_agent'] = settab_header_return_frm_agent2d327,
        codeStates['tab_header_return_frm_agent2d327'] = tab_header_return_frm_agent2d327Props,
        codeStates['settab_header_return_frm_agent2d327'] = settab_header_return_frm_agent2d327Props,
        codeStates['grp_retun_ref'] = grp_retun_ref3e6e6,
        codeStates['setgrp_retun_ref'] = setgrp_retun_ref3e6e6,
        codeStates['grp_retun_ref3e6e6'] = grp_retun_ref3e6e6Props,
        codeStates['setgrp_retun_ref3e6e6'] = setgrp_retun_ref3e6e6Props,
        codeStates['tbl_return_fie_list'] = tbl_return_fie_list8f636,
        codeStates['settbl_return_fie_list'] = settbl_return_fie_list8f636,
        codeStates['tbl_return_fie_list8f636'] = tbl_return_fie_list8f636Props,
        codeStates['settbl_return_fie_list8f636'] = settbl_return_fie_list8f636Props,
        codeStates['col_src_name'] = col_src_namee7c6a,
        codeStates['setcol_src_name'] = setcol_src_namee7c6a,
        codeStates['col_tran_count'] = col_tran_count3ad7d,
        codeStates['setcol_tran_count'] = setcol_tran_count3ad7d,
        codeStates['btn_rr_view_tran'] = btn_rr_view_tran772a2,
        codeStates['setbtn_rr_view_tran'] = setbtn_rr_view_tran772a2,
        codeStates['col_fixed_amnt'] = col_fixed_amnt007c9,
        codeStates['setcol_fixed_amnt'] = setcol_fixed_amnt007c9,
        codeStates['col_var_amnt'] = col_var_amntdff09,
        codeStates['setcol_var_amnt'] = setcol_var_amntdff09,
        codeStates['col_tot_file_amnt'] = col_tot_file_amnt9fdc3,
        codeStates['setcol_tot_file_amnt'] = setcol_tot_file_amnt9fdc3,
        codeStates['col_created_date'] = col_created_datef8d57,
        codeStates['setcol_created_date'] = setcol_created_datef8d57,
        codeStates['col_sf_file_name'] = col_sf_file_name809f4,
        codeStates['setcol_sf_file_name'] = setcol_sf_file_name809f4,
        codeStates['tab_header_req_for_refund'] = tab_header_req_for_refundeadd2,
        codeStates['settab_header_req_for_refund'] = settab_header_req_for_refundeadd2,
        codeStates['tab_header_req_for_refundeadd2'] = tab_header_req_for_refundeadd2Props,
        codeStates['settab_header_req_for_refundeadd2'] = settab_header_req_for_refundeadd2Props,
        codeStates['grp_rr_retun_ref'] = grp_rr_retun_ref5362d,
        codeStates['setgrp_rr_retun_ref'] = setgrp_rr_retun_ref5362d,
        codeStates['grp_rr_retun_ref5362d'] = grp_rr_retun_ref5362dProps,
        codeStates['setgrp_rr_retun_ref5362d'] = setgrp_rr_retun_ref5362dProps,
        codeStates['tbl_rr_req_for_refund'] = tbl_rr_req_for_refunde2c9a,
        codeStates['settbl_rr_req_for_refund'] = settbl_rr_req_for_refunde2c9a,
        codeStates['tbl_rr_req_for_refunde2c9a'] = tbl_rr_req_for_refunde2c9aProps,
        codeStates['settbl_rr_req_for_refunde2c9a'] = settbl_rr_req_for_refunde2c9aProps,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const tbl_return_fie_list8f636Ref = useRef<any>(null);
  const handleClearSearch = () => {
    tbl_return_fie_list8f636Ref.current?.setSearchParams();
    tbl_return_fie_list8f636Ref.current?.handleSearch({});
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
        !Array.isArray(tbl_return_fie_list8f636) &&
        Object.keys(tbl_return_fie_list8f636)?.length > 0
      ) {
        settbl_return_fie_list8f636({})
        settbl_return_fie_list8f636Props((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [tbl_return_fie_list8f636Props?.refresh])


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
            iconDisplay={tbl_return_fie_list8f636Ref?.current?.isHaveSearch?  "Icon only" : "Start with Icon"}
            className="p-2"
            >
            Search
          </Button>
          {tbl_return_fie_list8f636Ref?.current?.isHaveSearch&&(
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
        gridRow: '1 / 60',
      
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
          setreturnsrefund_v1((pre:any)=>({...pre,_selectedGroup_:"tbl_return_fie_list"}))
        }}
    >
      <div className='flex flex-col h-full w-full min-w-0 overflow-auto'>
        <div className='flex flex-1 w-full min-h-0'>
       {<Tabletbl_return_fie_list headerButtonsRenders={renderBUttons}
          headerPosition='top'
          headerText="File List"
        tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} paginationDetails={paginationDetails} open={open} setOpen={setOpen} ref={tbl_return_fie_list8f636Ref} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData} setIsProcessing={setIsProcessing} groupData={groupData} controlData={controlData}/>}
      </div>
      </div>
    </div>
 )
}

export default Grouptbl_return_fie_list
