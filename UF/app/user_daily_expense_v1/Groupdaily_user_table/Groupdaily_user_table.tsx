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
import Tabledaily_user_table  from './Tabledaily_user_table';  
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupdaily_user_table = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
    "allowedControls": [
      "claim_id",
      "expense_name",
      "claim_category",
      "category_total_amount",
      "expense_date",
      "trs_status"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "daily_user_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Manager": {
    "allowedControls": [],
    "allowedGroups": [],
    "blockedControls": [
      "claim_id",
      "expense_name",
      "claim_category",
      "category_total_amount",
      "expense_date",
      "trs_status"
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
  const {groupc9a87, setgroupc9a87}= useContext(TotalContext) as TotalContextProps;
  const {groupc9a87Props, setgroupc9a87Props}= useContext(TotalContext) as TotalContextProps;
  const {daily_user_table76baf, setdaily_user_table76baf}= useContext(TotalContext) as TotalContextProps;
  const {daily_user_table76bafProps, setdaily_user_table76bafProps}= useContext(TotalContext) as TotalContextProps;
  const {claim_iddc381, setclaim_iddc381}= useContext(TotalContext) as TotalContextProps;
  const {expense_name0195f, setexpense_name0195f}= useContext(TotalContext) as TotalContextProps;
  const {claim_category8e630, setclaim_category8e630}= useContext(TotalContext) as TotalContextProps;
  const {category_total_amount2b381, setcategory_total_amount2b381}= useContext(TotalContext) as TotalContextProps;
  const {expense_date7df86, setexpense_date7df86}= useContext(TotalContext) as TotalContextProps;
  const {trs_statuscecb6, settrs_statuscecb6}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {daily_expense_user_table_v1, setdaily_expense_user_table_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:Trs:AFGK:RF:AFK:Daily_Expense_User_Table:AFVK:v1',
    [user],
    'GroupDailyUserTable',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "d153f9041a044b0fa7a88ce7aa876baf");
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
    setdaily_user_table76bafProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("claim_id")){
        setclaim_iddc381((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(claim_iddc381?.isDisabled==null)
      {
        setclaim_iddc381((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("expense_name")){
        setexpense_name0195f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(expense_name0195f?.isDisabled==null)
      {
        setexpense_name0195f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("claim_category")){
        setclaim_category8e630((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(claim_category8e630?.isDisabled==null)
      {
        setclaim_category8e630((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("category_total_amount")){
        setcategory_total_amount2b381((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(category_total_amount2b381?.isDisabled==null)
      {
        setcategory_total_amount2b381((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("expense_date")){
        setexpense_date7df86((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(expense_date7df86?.isDisabled==null)
      {
        setexpense_date7df86((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("trs_status")){
        settrs_statuscecb6((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(trs_statuscecb6?.isDisabled==null)
      {
        settrs_statuscecb6((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "d153f9041a044b0fa7a88ce7aa876baf");
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
        codeStates['group'] = groupc9a87,
        codeStates['setgroup'] = setgroupc9a87,
        codeStates['groupc9a87'] = groupc9a87Props,
        codeStates['setgroupc9a87'] = setgroupc9a87Props,
        codeStates['daily_user_table'] = daily_user_table76baf,
        codeStates['setdaily_user_table'] = setdaily_user_table76baf,
        codeStates['daily_user_table76baf'] = daily_user_table76bafProps,
        codeStates['setdaily_user_table76baf'] = setdaily_user_table76bafProps,
        codeStates['claim_id'] = claim_iddc381,
        codeStates['setclaim_id'] = setclaim_iddc381,
        codeStates['expense_name'] = expense_name0195f,
        codeStates['setexpense_name'] = setexpense_name0195f,
        codeStates['claim_category'] = claim_category8e630,
        codeStates['setclaim_category'] = setclaim_category8e630,
        codeStates['category_total_amount'] = category_total_amount2b381,
        codeStates['setcategory_total_amount'] = setcategory_total_amount2b381,
        codeStates['expense_date'] = expense_date7df86,
        codeStates['setexpense_date'] = setexpense_date7df86,
        codeStates['trs_status'] = trs_statuscecb6,
        codeStates['settrs_status'] = settrs_statuscecb6,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const daily_user_table76bafRef = useRef<any>(null);
  const handleClearSearch = () => {
    daily_user_table76bafRef.current?.setSearchParams();
    daily_user_table76bafRef.current?.handleSearch({});
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
        !Array.isArray(daily_user_table76baf) &&
        Object.keys(daily_user_table76baf)?.length > 0
      ) {
        setdaily_user_table76baf({})
        setdaily_user_table76bafProps((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [daily_user_table76bafProps?.refresh])


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
        gridRow: '24 / 174',
      
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
          setdaily_expense_user_table_v1((pre:any)=>({...pre,_selectedGroup_:"daily_user_table"}))
        }}
    >
      <div className='flex flex-col h-full w-full min-w-0 overflow-auto'>
        <div className='flex flex-1 w-full min-h-0'>
       {<Tabledaily_user_table headerButtonsRenders={renderBUttons}
        tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} paginationDetails={paginationDetails} open={open} setOpen={setOpen} ref={daily_user_table76bafRef} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData} setIsProcessing={setIsProcessing} groupData={groupData} controlData={controlData}/>}
      </div>
      </div>
    </div>
 )
}

export default Groupdaily_user_table
