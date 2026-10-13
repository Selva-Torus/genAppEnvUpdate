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
import Tabletbl_jrny_list  from './Tabletbl_jrny_list';  
import Buttonbtn_back  from "./Buttonbtn_back";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Grouptbl_jrny_list = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_sfjourneylistwithcount_v1Props, setdfd_sfjourneylistwithcount_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "col_sal_file",
      "col_src_name",
      "col_prcs_name",
      "col_step",
      "col_tran_count",
      "btn_view_transaction",
      "btn_back"
    ],
    "allowedGroups": [
      "canvas",
      "grp_overall_jrny_list",
      "tbl_jrny_list"
    ],
    "blockedControls": [
      "col_vgphe_id"
    ],
    "readOnlyControls": []
  },
  "Operational Manager": {
    "allowedControls": [
      "col_sal_file",
      "col_src_name",
      "col_prcs_name",
      "col_step",
      "col_tran_count",
      "btn_view_transaction",
      "btn_back"
    ],
    "allowedGroups": [
      "canvas",
      "grp_overall_jrny_list",
      "tbl_jrny_list"
    ],
    "blockedControls": [
      "col_vgphe_id"
    ],
    "readOnlyControls": []
  },
  "Operational Officer": {
    "allowedControls": [
      "col_sal_file",
      "col_src_name",
      "col_prcs_name",
      "col_step",
      "col_tran_count",
      "btn_view_transaction",
      "btn_back"
    ],
    "allowedGroups": [
      "canvas",
      "grp_overall_jrny_list",
      "tbl_jrny_list"
    ],
    "blockedControls": [
      "col_vgphe_id"
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
  const {grp_overall_jrny_listc7a13, setgrp_overall_jrny_listc7a13}= useContext(TotalContext) as TotalContextProps;
  const {grp_overall_jrny_listc7a13Props, setgrp_overall_jrny_listc7a13Props}= useContext(TotalContext) as TotalContextProps;
  const {tbl_jrny_list1e9df, settbl_jrny_list1e9df}= useContext(TotalContext) as TotalContextProps;
  const {tbl_jrny_list1e9dfProps, settbl_jrny_list1e9dfProps}= useContext(TotalContext) as TotalContextProps;
  const {col_sal_filee0c17, setcol_sal_filee0c17}= useContext(TotalContext) as TotalContextProps;
  const {col_src_namee72b4, setcol_src_namee72b4}= useContext(TotalContext) as TotalContextProps;
  const {col_prcs_namee094a, setcol_prcs_namee094a}= useContext(TotalContext) as TotalContextProps;
  const {col_step900de, setcol_step900de}= useContext(TotalContext) as TotalContextProps;
  const {col_tran_count32ab4, setcol_tran_count32ab4}= useContext(TotalContext) as TotalContextProps;
  const {btn_view_transactionda729, setbtn_view_transactionda729}= useContext(TotalContext) as TotalContextProps;
  const {col_vgphe_idf0700, setcol_vgphe_idf0700}= useContext(TotalContext) as TotalContextProps;
  const {btn_back183b3, setbtn_back183b3}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {sfjourneylist_v1, setsfjourneylist_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:WPS:AFK:SFJourneyList:AFVK:v1',
    [user],
    'GroupTblJrnyList',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "cb2adc75380f3572af66ef0d11a1e9df");
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
    settbl_jrny_list1e9dfProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("col_sal_file")){
        setcol_sal_filee0c17((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_sal_filee0c17?.isDisabled==null)
      {
        setcol_sal_filee0c17((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("col_src_name")){
        setcol_src_namee72b4((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_src_namee72b4?.isDisabled==null)
      {
        setcol_src_namee72b4((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("col_prcs_name")){
        setcol_prcs_namee094a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_prcs_namee094a?.isDisabled==null)
      {
        setcol_prcs_namee094a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("col_step")){
        setcol_step900de((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_step900de?.isDisabled==null)
      {
        setcol_step900de((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("col_tran_count")){
        setcol_tran_count32ab4((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_tran_count32ab4?.isDisabled==null)
      {
        setcol_tran_count32ab4((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("btn_view_transaction")){
        setbtn_view_transactionda729((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(btn_view_transactionda729?.isDisabled==null)
      {
        setbtn_view_transactionda729((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("col_vgphe_id")){
        setcol_vgphe_idf0700((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_vgphe_idf0700?.isDisabled==null)
      {
        setcol_vgphe_idf0700((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("btn_back")){
        setbtn_back183b3((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(btn_back183b3?.isDisabled==null)
      {
        setbtn_back183b3((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "cb2adc75380f3572af66ef0d11a1e9df");
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
        codeStates['grp_overall_jrny_list'] = grp_overall_jrny_listc7a13,
        codeStates['setgrp_overall_jrny_list'] = setgrp_overall_jrny_listc7a13,
        codeStates['grp_overall_jrny_listc7a13'] = grp_overall_jrny_listc7a13Props,
        codeStates['setgrp_overall_jrny_listc7a13'] = setgrp_overall_jrny_listc7a13Props,
        codeStates['tbl_jrny_list'] = tbl_jrny_list1e9df,
        codeStates['settbl_jrny_list'] = settbl_jrny_list1e9df,
        codeStates['tbl_jrny_list1e9df'] = tbl_jrny_list1e9dfProps,
        codeStates['settbl_jrny_list1e9df'] = settbl_jrny_list1e9dfProps,
        codeStates['col_sal_file'] = col_sal_filee0c17,
        codeStates['setcol_sal_file'] = setcol_sal_filee0c17,
        codeStates['col_src_name'] = col_src_namee72b4,
        codeStates['setcol_src_name'] = setcol_src_namee72b4,
        codeStates['col_prcs_name'] = col_prcs_namee094a,
        codeStates['setcol_prcs_name'] = setcol_prcs_namee094a,
        codeStates['col_step'] = col_step900de,
        codeStates['setcol_step'] = setcol_step900de,
        codeStates['col_tran_count'] = col_tran_count32ab4,
        codeStates['setcol_tran_count'] = setcol_tran_count32ab4,
        codeStates['btn_view_transaction'] = btn_view_transactionda729,
        codeStates['setbtn_view_transaction'] = setbtn_view_transactionda729,
        codeStates['col_vgphe_id'] = col_vgphe_idf0700,
        codeStates['setcol_vgphe_id'] = setcol_vgphe_idf0700,
        codeStates['btn_back'] = btn_back183b3,
        codeStates['setbtn_back'] = setbtn_back183b3,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const tbl_jrny_list1e9dfRef = useRef<any>(null);
  const handleClearSearch = () => {
    tbl_jrny_list1e9dfRef.current?.setSearchParams();
    tbl_jrny_list1e9dfRef.current?.handleSearch({});
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
        !Array.isArray(tbl_jrny_list1e9df) &&
        Object.keys(tbl_jrny_list1e9df)?.length > 0
      ) {
        settbl_jrny_list1e9df({})
        settbl_jrny_list1e9dfProps((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [tbl_jrny_list1e9dfProps?.refresh])


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
            iconDisplay={tbl_jrny_list1e9dfRef?.current?.isHaveSearch?  "Icon only" : "Start with Icon"}
            className="p-2"
            >
            Search
          </Button>
          {tbl_jrny_list1e9dfRef?.current?.isHaveSearch&&(
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
        gridRow: '4 / 159',
      
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
          setsfjourneylist_v1((pre:any)=>({...pre,_selectedGroup_:"tbl_jrny_list"}))
        }}
    >
      <div className='flex flex-col h-full w-full min-w-0 overflow-auto'>
        <div className='flex flex-1 w-full min-h-0'>
       {<Tabletbl_jrny_list headerButtonsRenders={renderBUttons}
          headerPosition='top'
          headerText="SF Journey List"
        tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} paginationDetails={paginationDetails} open={open} setOpen={setOpen} ref={tbl_jrny_list1e9dfRef} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData} setIsProcessing={setIsProcessing} groupData={groupData} controlData={controlData}/>}
      </div>
      </div>
    </div>
 )
}

export default Grouptbl_jrny_list
