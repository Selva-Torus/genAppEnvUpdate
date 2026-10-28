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
    "allowedControls": [
      "expense_name",
      "category_total_amount",
      "trs_status",
      "formatted_date"
    ],
    "allowedGroups": [
      "canvas",
      "user_grp",
      "daily_expense_table",
      "offsite_expense_table"
    ],
    "blockedControls": [
      "claim_id"
    ],
    "readOnlyControls": []
  },
  "Manager": {
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
  const {user_grpd6690, setuser_grpd6690}= useContext(TotalContext) as TotalContextProps;
  const {user_grpd6690Props, setuser_grpd6690Props}= useContext(TotalContext) as TotalContextProps;
  const {daily_expense_table13758, setdaily_expense_table13758}= useContext(TotalContext) as TotalContextProps;
  const {daily_expense_table13758Props, setdaily_expense_table13758Props}= useContext(TotalContext) as TotalContextProps;
  const {offsite_expense_table4ffd6, setoffsite_expense_table4ffd6}= useContext(TotalContext) as TotalContextProps;
  const {offsite_expense_table4ffd6Props, setoffsite_expense_table4ffd6Props}= useContext(TotalContext) as TotalContextProps;
  const {claim_idb67db, setclaim_idb67db}= useContext(TotalContext) as TotalContextProps;
  const {expense_name1040c, setexpense_name1040c}= useContext(TotalContext) as TotalContextProps;
  const {category_total_amount54e36, setcategory_total_amount54e36}= useContext(TotalContext) as TotalContextProps;
  const {trs_status6f7ad, settrs_status6f7ad}= useContext(TotalContext) as TotalContextProps;
  const {formatted_date7ebf5, setformatted_date7ebf5}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {dashboard_for_user_v1, setdashboard_for_user_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:Trs:AFGK:RF:AFK:Dashboard_For_User:AFVK:v1',
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "0918644520a24e0aa0d1781bb754ffd6");
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
    setoffsite_expense_table4ffd6Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("claim_id")){
        setclaim_idb67db((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(claim_idb67db?.isDisabled==null)
      {
        setclaim_idb67db((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("expense_name")){
        setexpense_name1040c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(expense_name1040c?.isDisabled==null)
      {
        setexpense_name1040c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("category_total_amount")){
        setcategory_total_amount54e36((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(category_total_amount54e36?.isDisabled==null)
      {
        setcategory_total_amount54e36((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("trs_status")){
        settrs_status6f7ad((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(trs_status6f7ad?.isDisabled==null)
      {
        settrs_status6f7ad((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("formatted_date")){
        setformatted_date7ebf5((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(formatted_date7ebf5?.isDisabled==null)
      {
        setformatted_date7ebf5((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "0918644520a24e0aa0d1781bb754ffd6");
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
        codeStates['user_grp'] = user_grpd6690,
        codeStates['setuser_grp'] = setuser_grpd6690,
        codeStates['user_grpd6690'] = user_grpd6690Props,
        codeStates['setuser_grpd6690'] = setuser_grpd6690Props,
        codeStates['daily_expense_table'] = daily_expense_table13758,
        codeStates['setdaily_expense_table'] = setdaily_expense_table13758,
        codeStates['daily_expense_table13758'] = daily_expense_table13758Props,
        codeStates['setdaily_expense_table13758'] = setdaily_expense_table13758Props,
        codeStates['offsite_expense_table'] = offsite_expense_table4ffd6,
        codeStates['setoffsite_expense_table'] = setoffsite_expense_table4ffd6,
        codeStates['offsite_expense_table4ffd6'] = offsite_expense_table4ffd6Props,
        codeStates['setoffsite_expense_table4ffd6'] = setoffsite_expense_table4ffd6Props,
        codeStates['claim_id'] = claim_idb67db,
        codeStates['setclaim_id'] = setclaim_idb67db,
        codeStates['expense_name'] = expense_name1040c,
        codeStates['setexpense_name'] = setexpense_name1040c,
        codeStates['category_total_amount'] = category_total_amount54e36,
        codeStates['setcategory_total_amount'] = setcategory_total_amount54e36,
        codeStates['trs_status'] = trs_status6f7ad,
        codeStates['settrs_status'] = settrs_status6f7ad,
        codeStates['formatted_date'] = formatted_date7ebf5,
        codeStates['setformatted_date'] = setformatted_date7ebf5,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const offsite_expense_table4ffd6Ref = useRef<any>(null);
  const handleClearSearch = () => {
    offsite_expense_table4ffd6Ref.current?.setSearchParams();
    offsite_expense_table4ffd6Ref.current?.handleSearch({});
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
        !Array.isArray(offsite_expense_table4ffd6) &&
        Object.keys(offsite_expense_table4ffd6)?.length > 0
      ) {
        setoffsite_expense_table4ffd6({})
        setoffsite_expense_table4ffd6Props((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [offsite_expense_table4ffd6Props?.refresh])


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
        gridRow: '59 / 173',
      
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
          setdashboard_for_user_v1((pre:any)=>({...pre,_selectedGroup_:"offsite_expense_table"}))
        }}
    >
      <div className='flex flex-col h-full w-full min-w-0 overflow-auto'>
        <div className='flex flex-1 w-full min-h-0'>
       {<Tableoffsite_expense_table headerButtonsRenders={renderBUttons}
        tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} paginationDetails={paginationDetails} open={open} setOpen={setOpen} ref={offsite_expense_table4ffd6Ref} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData} setIsProcessing={setIsProcessing} groupData={groupData} controlData={controlData}/>}
      </div>
      </div>
    </div>
 )
}

export default Groupoffsite_expense_table
