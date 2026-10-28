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
import Tabledaily_expense_manager_table  from './Tabledaily_expense_manager_table';  
import ButtonReject  from "./ButtonReject";
import ButtonApprove  from "./ButtonApprove";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupdaily_expense_manager_table = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
      "trs_created_by",
      "expense_name",
      "claim_category",
      "category_total_amount",
      "expense_date",
      "trs_status",
      "reject",
      "approve"
    ],
    "readOnlyControls": []
  },
  "Manager": {
    "allowedControls": [
      "claim_id",
      "trs_created_by",
      "expense_name",
      "claim_category",
      "category_total_amount",
      "expense_date",
      "trs_status",
      "reject",
      "approve"
    ],
    "allowedGroups": [
      "canvas",
      "grp",
      "daily_expense_manager_table"
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
  const {grp63e95, setgrp63e95}= useContext(TotalContext) as TotalContextProps;
  const {grp63e95Props, setgrp63e95Props}= useContext(TotalContext) as TotalContextProps;
  const {daily_expense_manager_tablee3342, setdaily_expense_manager_tablee3342}= useContext(TotalContext) as TotalContextProps;
  const {daily_expense_manager_tablee3342Props, setdaily_expense_manager_tablee3342Props}= useContext(TotalContext) as TotalContextProps;
  const {claim_id7ec53, setclaim_id7ec53}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_by1f8f9, settrs_created_by1f8f9}= useContext(TotalContext) as TotalContextProps;
  const {expense_name78eca, setexpense_name78eca}= useContext(TotalContext) as TotalContextProps;
  const {claim_category8466d, setclaim_category8466d}= useContext(TotalContext) as TotalContextProps;
  const {category_total_amount22435, setcategory_total_amount22435}= useContext(TotalContext) as TotalContextProps;
  const {expense_date20458, setexpense_date20458}= useContext(TotalContext) as TotalContextProps;
  const {trs_status9f4b4, settrs_status9f4b4}= useContext(TotalContext) as TotalContextProps;
  const {reject4d3f0, setreject4d3f0}= useContext(TotalContext) as TotalContextProps;
  const {approve819e1, setapprove819e1}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {daily_expense_manager_table_v1, setdaily_expense_manager_table_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:Trs:AFGK:RF:AFK:Daily_Expense_Manager_Table:AFVK:v1',
    [user],
    'GroupDailyExpenseManagerTable',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "874fd4e0d832428da3947bcbc05e3342");
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
    setdaily_expense_manager_tablee3342Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("claim_id")){
        setclaim_id7ec53((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(claim_id7ec53?.isDisabled==null)
      {
        setclaim_id7ec53((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("trs_created_by")){
        settrs_created_by1f8f9((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(trs_created_by1f8f9?.isDisabled==null)
      {
        settrs_created_by1f8f9((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("expense_name")){
        setexpense_name78eca((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(expense_name78eca?.isDisabled==null)
      {
        setexpense_name78eca((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("claim_category")){
        setclaim_category8466d((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(claim_category8466d?.isDisabled==null)
      {
        setclaim_category8466d((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("category_total_amount")){
        setcategory_total_amount22435((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(category_total_amount22435?.isDisabled==null)
      {
        setcategory_total_amount22435((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("expense_date")){
        setexpense_date20458((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(expense_date20458?.isDisabled==null)
      {
        setexpense_date20458((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("trs_status")){
        settrs_status9f4b4((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(trs_status9f4b4?.isDisabled==null)
      {
        settrs_status9f4b4((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("reject")){
        setreject4d3f0((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(reject4d3f0?.isDisabled==null)
      {
        setreject4d3f0((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("approve")){
        setapprove819e1((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(approve819e1?.isDisabled==null)
      {
        setapprove819e1((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "874fd4e0d832428da3947bcbc05e3342");
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
        codeStates['grp'] = grp63e95,
        codeStates['setgrp'] = setgrp63e95,
        codeStates['grp63e95'] = grp63e95Props,
        codeStates['setgrp63e95'] = setgrp63e95Props,
        codeStates['daily_expense_manager_table'] = daily_expense_manager_tablee3342,
        codeStates['setdaily_expense_manager_table'] = setdaily_expense_manager_tablee3342,
        codeStates['daily_expense_manager_tablee3342'] = daily_expense_manager_tablee3342Props,
        codeStates['setdaily_expense_manager_tablee3342'] = setdaily_expense_manager_tablee3342Props,
        codeStates['claim_id'] = claim_id7ec53,
        codeStates['setclaim_id'] = setclaim_id7ec53,
        codeStates['trs_created_by'] = trs_created_by1f8f9,
        codeStates['settrs_created_by'] = settrs_created_by1f8f9,
        codeStates['expense_name'] = expense_name78eca,
        codeStates['setexpense_name'] = setexpense_name78eca,
        codeStates['claim_category'] = claim_category8466d,
        codeStates['setclaim_category'] = setclaim_category8466d,
        codeStates['category_total_amount'] = category_total_amount22435,
        codeStates['setcategory_total_amount'] = setcategory_total_amount22435,
        codeStates['expense_date'] = expense_date20458,
        codeStates['setexpense_date'] = setexpense_date20458,
        codeStates['trs_status'] = trs_status9f4b4,
        codeStates['settrs_status'] = settrs_status9f4b4,
        codeStates['reject'] = reject4d3f0,
        codeStates['setreject'] = setreject4d3f0,
        codeStates['approve'] = approve819e1,
        codeStates['setapprove'] = setapprove819e1,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const daily_expense_manager_tablee3342Ref = useRef<any>(null);
  const handleClearSearch = () => {
    daily_expense_manager_tablee3342Ref.current?.setSearchParams();
    daily_expense_manager_tablee3342Ref.current?.handleSearch({});
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
        !Array.isArray(daily_expense_manager_tablee3342) &&
        Object.keys(daily_expense_manager_tablee3342)?.length > 0
      ) {
        setdaily_expense_manager_tablee3342({})
        setdaily_expense_manager_tablee3342Props((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [daily_expense_manager_tablee3342Props?.refresh])


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
        gridRow: '21 / 131',
      
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
          setdaily_expense_manager_table_v1((pre:any)=>({...pre,_selectedGroup_:"daily_expense_manager_table"}))
        }}
    >
      <div className='flex flex-col h-full w-full min-w-0 overflow-auto'>
        <div className='flex flex-1 w-full min-h-0'>
       {<Tabledaily_expense_manager_table headerButtonsRenders={renderBUttons}
        tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} paginationDetails={paginationDetails} open={open} setOpen={setOpen} ref={daily_expense_manager_tablee3342Ref} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData} setIsProcessing={setIsProcessing} groupData={groupData} controlData={controlData}/>}
      </div>
      </div>
    </div>
 )
}

export default Groupdaily_expense_manager_table
