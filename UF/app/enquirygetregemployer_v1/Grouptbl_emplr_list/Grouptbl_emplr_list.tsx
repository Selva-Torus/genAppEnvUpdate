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
import Tabletbl_emplr_list  from './Tabletbl_emplr_list';  
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Grouptbl_emplr_list = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_enquirygetregemployeremployerlist_v1Props, setdfd_enquirygetregemployeremployerlist_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "col_mol_numr",
      "col_mohre_sts",
      "col_reg_num",
      "col_emirates_id"
    ],
    "allowedGroups": [
      "canvas",
      "grp_overall_tran_list",
      "tbl_emplr_list"
    ],
    "blockedControls": [
      "col_created_date"
    ],
    "readOnlyControls": []
  },
  "Operational Manager": {
    "allowedControls": [
      "col_mol_numr",
      "col_mohre_sts",
      "col_reg_num",
      "col_emirates_id"
    ],
    "allowedGroups": [
      "canvas",
      "grp_overall_tran_list",
      "tbl_emplr_list"
    ],
    "blockedControls": [
      "col_created_date"
    ],
    "readOnlyControls": []
  },
  "Operational Officer": {
    "allowedControls": [
      "col_mol_numr",
      "col_mohre_sts",
      "col_reg_num",
      "col_emirates_id"
    ],
    "allowedGroups": [
      "canvas",
      "grp_overall_tran_list",
      "tbl_emplr_list"
    ],
    "blockedControls": [
      "col_created_date"
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
  const {grp_overall_tran_listfb644, setgrp_overall_tran_listfb644}= useContext(TotalContext) as TotalContextProps;
  const {grp_overall_tran_listfb644Props, setgrp_overall_tran_listfb644Props}= useContext(TotalContext) as TotalContextProps;
  const {tbl_emplr_list3557a, settbl_emplr_list3557a}= useContext(TotalContext) as TotalContextProps;
  const {tbl_emplr_list3557aProps, settbl_emplr_list3557aProps}= useContext(TotalContext) as TotalContextProps;
  const {col_mol_numrd6584, setcol_mol_numrd6584}= useContext(TotalContext) as TotalContextProps;
  const {col_mohre_stse37dc, setcol_mohre_stse37dc}= useContext(TotalContext) as TotalContextProps;
  const {col_reg_num51c35, setcol_reg_num51c35}= useContext(TotalContext) as TotalContextProps;
  const {col_emirates_idce519, setcol_emirates_idce519}= useContext(TotalContext) as TotalContextProps;
  const {col_created_date1adb1, setcol_created_date1adb1}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {enquirygetregemployer_v1, setenquirygetregemployer_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:WPS:AFK:enquiryGetRegEmployer:AFVK:v1',
    [user],
    'GroupTblEmplrList',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "32800ddb8733e23248abdf6cc9c3557a");
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
    settbl_emplr_list3557aProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("col_mol_numr")){
        setcol_mol_numrd6584((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_mol_numrd6584?.isDisabled==null)
      {
        setcol_mol_numrd6584((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("col_mohre_sts")){
        setcol_mohre_stse37dc((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_mohre_stse37dc?.isDisabled==null)
      {
        setcol_mohre_stse37dc((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("col_reg_num")){
        setcol_reg_num51c35((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_reg_num51c35?.isDisabled==null)
      {
        setcol_reg_num51c35((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("col_emirates_id")){
        setcol_emirates_idce519((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_emirates_idce519?.isDisabled==null)
      {
        setcol_emirates_idce519((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("col_created_date")){
        setcol_created_date1adb1((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_created_date1adb1?.isDisabled==null)
      {
        setcol_created_date1adb1((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "32800ddb8733e23248abdf6cc9c3557a");
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
        codeStates['grp_overall_tran_list'] = grp_overall_tran_listfb644,
        codeStates['setgrp_overall_tran_list'] = setgrp_overall_tran_listfb644,
        codeStates['grp_overall_tran_listfb644'] = grp_overall_tran_listfb644Props,
        codeStates['setgrp_overall_tran_listfb644'] = setgrp_overall_tran_listfb644Props,
        codeStates['tbl_emplr_list'] = tbl_emplr_list3557a,
        codeStates['settbl_emplr_list'] = settbl_emplr_list3557a,
        codeStates['tbl_emplr_list3557a'] = tbl_emplr_list3557aProps,
        codeStates['settbl_emplr_list3557a'] = settbl_emplr_list3557aProps,
        codeStates['col_mol_numr'] = col_mol_numrd6584,
        codeStates['setcol_mol_numr'] = setcol_mol_numrd6584,
        codeStates['col_mohre_sts'] = col_mohre_stse37dc,
        codeStates['setcol_mohre_sts'] = setcol_mohre_stse37dc,
        codeStates['col_reg_num'] = col_reg_num51c35,
        codeStates['setcol_reg_num'] = setcol_reg_num51c35,
        codeStates['col_emirates_id'] = col_emirates_idce519,
        codeStates['setcol_emirates_id'] = setcol_emirates_idce519,
        codeStates['col_created_date'] = col_created_date1adb1,
        codeStates['setcol_created_date'] = setcol_created_date1adb1,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const tbl_emplr_list3557aRef = useRef<any>(null);
  const handleClearSearch = () => {
    tbl_emplr_list3557aRef.current?.setSearchParams();
    tbl_emplr_list3557aRef.current?.handleSearch({});
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
        !Array.isArray(tbl_emplr_list3557a) &&
        Object.keys(tbl_emplr_list3557a)?.length > 0
      ) {
        settbl_emplr_list3557a({})
        settbl_emplr_list3557aProps((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [tbl_emplr_list3557aProps?.refresh])


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
        gridColumn: '1 / 25',
        gridRow: '11 / 62',
      
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
          setenquirygetregemployer_v1((pre:any)=>({...pre,_selectedGroup_:"tbl_emplr_list"}))
        }}
    >
      <div className='flex flex-col h-full w-full min-w-0 overflow-auto'>
        <div className='flex flex-1 w-full min-h-0'>
       {<Tabletbl_emplr_list headerButtonsRenders={renderBUttons}
        tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} paginationDetails={paginationDetails} open={open} setOpen={setOpen} ref={tbl_emplr_list3557aRef} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData} setIsProcessing={setIsProcessing} groupData={groupData} controlData={controlData}/>}
      </div>
      </div>
    </div>
 )
}

export default Grouptbl_emplr_list
