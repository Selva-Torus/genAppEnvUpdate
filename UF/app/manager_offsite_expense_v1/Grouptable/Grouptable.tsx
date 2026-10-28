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
import Tabletable  from './Tabletable';  
import ButtonReject  from "./ButtonReject";
import ButtonApprove  from "./ButtonApprove";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Grouptable = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_claim_table_data_v1Props, setdfd_claim_table_data_v1Props} = useContext(TotalContext) as TotalContextProps;
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
  "Employee": {
    "allowedControls": [],
    "allowedGroups": [],
    "blockedControls": [
      "claim_id",
      "reject",
      "approve",
      "trs_created_by",
      "expense_name",
      "claim_category",
      "category_total_amount",
      "formatted_date",
      "trs_status"
    ],
    "readOnlyControls": []
  },
  "Manager": {
    "allowedControls": [
      "claim_id",
      "reject",
      "approve",
      "trs_created_by",
      "expense_name",
      "claim_category",
      "category_total_amount",
      "formatted_date",
      "trs_status"
    ],
    "allowedGroups": [
      "canvas",
      "grp",
      "table"
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
  const {grpdeda0, setgrpdeda0}= useContext(TotalContext) as TotalContextProps;
  const {grpdeda0Props, setgrpdeda0Props}= useContext(TotalContext) as TotalContextProps;
  const {table98ff5, settable98ff5}= useContext(TotalContext) as TotalContextProps;
  const {table98ff5Props, settable98ff5Props}= useContext(TotalContext) as TotalContextProps;
  const {claim_id56078, setclaim_id56078}= useContext(TotalContext) as TotalContextProps;
  const {rejecte566a, setrejecte566a}= useContext(TotalContext) as TotalContextProps;
  const {approve5709e, setapprove5709e}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_by8053b, settrs_created_by8053b}= useContext(TotalContext) as TotalContextProps;
  const {expense_name94440, setexpense_name94440}= useContext(TotalContext) as TotalContextProps;
  const {claim_category9ec61, setclaim_category9ec61}= useContext(TotalContext) as TotalContextProps;
  const {category_total_amount689b8, setcategory_total_amount689b8}= useContext(TotalContext) as TotalContextProps;
  const {formatted_date1030f, setformatted_date1030f}= useContext(TotalContext) as TotalContextProps;
  const {trs_status759b6, settrs_status759b6}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {offsite_expense_manager_table_v1, setoffsite_expense_manager_table_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:Trs:AFGK:RF:AFK:Offsite_Expense_Manager_Table:AFVK:v1',
    [user],
    'GroupTable',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "68aacd73430449af9dd1ef8b5a998ff5");
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
    settable98ff5Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("claim_id")){
        setclaim_id56078((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(claim_id56078?.isDisabled==null)
      {
        setclaim_id56078((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("reject")){
        setrejecte566a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(rejecte566a?.isDisabled==null)
      {
        setrejecte566a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("approve")){
        setapprove5709e((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(approve5709e?.isDisabled==null)
      {
        setapprove5709e((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("trs_created_by")){
        settrs_created_by8053b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(trs_created_by8053b?.isDisabled==null)
      {
        settrs_created_by8053b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("expense_name")){
        setexpense_name94440((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(expense_name94440?.isDisabled==null)
      {
        setexpense_name94440((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("claim_category")){
        setclaim_category9ec61((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(claim_category9ec61?.isDisabled==null)
      {
        setclaim_category9ec61((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("category_total_amount")){
        setcategory_total_amount689b8((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(category_total_amount689b8?.isDisabled==null)
      {
        setcategory_total_amount689b8((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("formatted_date")){
        setformatted_date1030f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(formatted_date1030f?.isDisabled==null)
      {
        setformatted_date1030f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("trs_status")){
        settrs_status759b6((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(trs_status759b6?.isDisabled==null)
      {
        settrs_status759b6((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "68aacd73430449af9dd1ef8b5a998ff5");
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
        codeStates['grp'] = grpdeda0,
        codeStates['setgrp'] = setgrpdeda0,
        codeStates['grpdeda0'] = grpdeda0Props,
        codeStates['setgrpdeda0'] = setgrpdeda0Props,
        codeStates['table'] = table98ff5,
        codeStates['settable'] = settable98ff5,
        codeStates['table98ff5'] = table98ff5Props,
        codeStates['settable98ff5'] = settable98ff5Props,
        codeStates['claim_id'] = claim_id56078,
        codeStates['setclaim_id'] = setclaim_id56078,
        codeStates['reject'] = rejecte566a,
        codeStates['setreject'] = setrejecte566a,
        codeStates['approve'] = approve5709e,
        codeStates['setapprove'] = setapprove5709e,
        codeStates['trs_created_by'] = trs_created_by8053b,
        codeStates['settrs_created_by'] = settrs_created_by8053b,
        codeStates['expense_name'] = expense_name94440,
        codeStates['setexpense_name'] = setexpense_name94440,
        codeStates['claim_category'] = claim_category9ec61,
        codeStates['setclaim_category'] = setclaim_category9ec61,
        codeStates['category_total_amount'] = category_total_amount689b8,
        codeStates['setcategory_total_amount'] = setcategory_total_amount689b8,
        codeStates['formatted_date'] = formatted_date1030f,
        codeStates['setformatted_date'] = setformatted_date1030f,
        codeStates['trs_status'] = trs_status759b6,
        codeStates['settrs_status'] = settrs_status759b6,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const table98ff5Ref = useRef<any>(null);
  const handleClearSearch = () => {
    table98ff5Ref.current?.setSearchParams();
    table98ff5Ref.current?.handleSearch({});
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
        !Array.isArray(table98ff5) &&
        Object.keys(table98ff5)?.length > 0
      ) {
        settable98ff5({})
        settable98ff5Props((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [table98ff5Props?.refresh])


  useEffect(() => {
    subscreenCheck()
  }, [])


  const renderBUttons=()=>{
    return (
        <div
          className='flex-shrink-0 overflow-x-auto pl-1'>
          <div className='flex justify-end w-max min-w-full gap-1'>
        {        (("reject" in ButtonGoRuleData)?ButtonGoRuleData["reject"]:true) && 
          allowedControls.includes("reject")  ?          <div className="shrink-0"><ButtonReject tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/></div>: <div></div>} 
        {        (("approve" in ButtonGoRuleData)?ButtonGoRuleData["approve"]:true) && 
          allowedControls.includes("approve")  ?          <div className="shrink-0"><ButtonApprove tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/></div>: <div></div>} 
      </div>
      </div>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '17 / 150',
      
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
          setoffsite_expense_manager_table_v1((pre:any)=>({...pre,_selectedGroup_:"table"}))
        }}
    >
      <div className='flex flex-col h-full w-full min-w-0 overflow-auto'>
        <div className='flex flex-1 w-full min-h-0'>
       {<Tabletable headerButtonsRenders={renderBUttons}
        tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} paginationDetails={paginationDetails} open={open} setOpen={setOpen} ref={table98ff5Ref} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData} setIsProcessing={setIsProcessing} groupData={groupData} controlData={controlData}/>}
      </div>
      </div>
    </div>
 )
}

export default Grouptable
