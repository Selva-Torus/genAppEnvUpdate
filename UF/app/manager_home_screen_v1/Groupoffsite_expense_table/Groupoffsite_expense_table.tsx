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
import Tableoffsite_expense_table  from './Tableoffsite_expense_table';  
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupoffsite_expense_table = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_card_data_v1Props, setdfd_card_data_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "expense_name",
      "category_total_amount",
      "trs_status",
      "formatted_date"
    ],
    "readOnlyControls": []
  },
  "Manager": {
    "allowedControls": [
      "expense_name",
      "category_total_amount",
      "trs_status",
      "formatted_date"
    ],
    "allowedGroups": [
      "canvas",
      "manager_group",
      "daily_expense_table",
      "offsite_expense_table"
    ],
    "blockedControls": [
      "claim_id"
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
  const {manager_group41477, setmanager_group41477}= useContext(TotalContext) as TotalContextProps;
  const {manager_group41477Props, setmanager_group41477Props}= useContext(TotalContext) as TotalContextProps;
  const {daily_expense_table91568, setdaily_expense_table91568}= useContext(TotalContext) as TotalContextProps;
  const {daily_expense_table91568Props, setdaily_expense_table91568Props}= useContext(TotalContext) as TotalContextProps;
  const {offsite_expense_table1e924, setoffsite_expense_table1e924}= useContext(TotalContext) as TotalContextProps;
  const {offsite_expense_table1e924Props, setoffsite_expense_table1e924Props}= useContext(TotalContext) as TotalContextProps;
  const {claim_id4a599, setclaim_id4a599}= useContext(TotalContext) as TotalContextProps;
  const {expense_namec8f13, setexpense_namec8f13}= useContext(TotalContext) as TotalContextProps;
  const {category_total_amountfb61b, setcategory_total_amountfb61b}= useContext(TotalContext) as TotalContextProps;
  const {trs_status79b0b, settrs_status79b0b}= useContext(TotalContext) as TotalContextProps;
  const {formatted_date46435, setformatted_date46435}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {dashboard_for_manager_v1, setdashboard_for_manager_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:Trs:AFGK:RF:AFK:Dashboard_For_Manager:AFVK:v1',
    [user],
    'GroupOffsiteExpenseTable',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "f999c73172354a838090a0f8eda1e924");
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
    setoffsite_expense_table1e924Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("claim_id")){
        setclaim_id4a599((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(claim_id4a599?.isDisabled==null)
      {
        setclaim_id4a599((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("expense_name")){
        setexpense_namec8f13((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(expense_namec8f13?.isDisabled==null)
      {
        setexpense_namec8f13((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("category_total_amount")){
        setcategory_total_amountfb61b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(category_total_amountfb61b?.isDisabled==null)
      {
        setcategory_total_amountfb61b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("trs_status")){
        settrs_status79b0b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(trs_status79b0b?.isDisabled==null)
      {
        settrs_status79b0b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("formatted_date")){
        setformatted_date46435((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(formatted_date46435?.isDisabled==null)
      {
        setformatted_date46435((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "f999c73172354a838090a0f8eda1e924");
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
        codeStates['manager_group'] = manager_group41477,
        codeStates['setmanager_group'] = setmanager_group41477,
        codeStates['manager_group41477'] = manager_group41477Props,
        codeStates['setmanager_group41477'] = setmanager_group41477Props,
        codeStates['daily_expense_table'] = daily_expense_table91568,
        codeStates['setdaily_expense_table'] = setdaily_expense_table91568,
        codeStates['daily_expense_table91568'] = daily_expense_table91568Props,
        codeStates['setdaily_expense_table91568'] = setdaily_expense_table91568Props,
        codeStates['offsite_expense_table'] = offsite_expense_table1e924,
        codeStates['setoffsite_expense_table'] = setoffsite_expense_table1e924,
        codeStates['offsite_expense_table1e924'] = offsite_expense_table1e924Props,
        codeStates['setoffsite_expense_table1e924'] = setoffsite_expense_table1e924Props,
        codeStates['claim_id'] = claim_id4a599,
        codeStates['setclaim_id'] = setclaim_id4a599,
        codeStates['expense_name'] = expense_namec8f13,
        codeStates['setexpense_name'] = setexpense_namec8f13,
        codeStates['category_total_amount'] = category_total_amountfb61b,
        codeStates['setcategory_total_amount'] = setcategory_total_amountfb61b,
        codeStates['trs_status'] = trs_status79b0b,
        codeStates['settrs_status'] = settrs_status79b0b,
        codeStates['formatted_date'] = formatted_date46435,
        codeStates['setformatted_date'] = setformatted_date46435,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const offsite_expense_table1e924Ref = useRef<any>(null);
  const handleClearSearch = () => {
    offsite_expense_table1e924Ref.current?.setSearchParams();
    offsite_expense_table1e924Ref.current?.handleSearch({});
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
        !Array.isArray(offsite_expense_table1e924) &&
        Object.keys(offsite_expense_table1e924)?.length > 0
      ) {
        setoffsite_expense_table1e924({})
        setoffsite_expense_table1e924Props((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [offsite_expense_table1e924Props?.refresh])


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
        gridColumn: '13 / 25',
        gridRow: '55 / 181',
      
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
          setdashboard_for_manager_v1((pre:any)=>({...pre,_selectedGroup_:"offsite_expense_table"}))
        }}
    >
      <div className='flex flex-col h-full w-full min-w-0 overflow-auto'>
        <div className='flex flex-1 w-full min-h-0'>
       {<Tableoffsite_expense_table headerButtonsRenders={renderBUttons}
        tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} paginationDetails={paginationDetails} open={open} setOpen={setOpen} ref={offsite_expense_table1e924Ref} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData} setIsProcessing={setIsProcessing} groupData={groupData} controlData={controlData}/>}
      </div>
      </div>
    </div>
 )
}

export default Groupoffsite_expense_table
