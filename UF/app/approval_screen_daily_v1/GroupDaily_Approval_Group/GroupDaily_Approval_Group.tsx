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
import Textdaily_expense  from "./Textdaily_expense";
import TextInputexpense_name  from "./TextInputexpense_name";
import TextInputemail  from "./TextInputemail";
import TextInputclaim_category  from "./TextInputclaim_category";
import TextInputcategory_total_amount  from "./TextInputcategory_total_amount";
import DatePickerexpense_date  from "./DatePickerexpense_date";
import DocumentViewerreceipt_image  from "./DocumentViewerreceipt_image";
import TextAreacomments  from "./TextAreacomments";
import TextENABLE  from "./TextENABLE";
import TextAreamanager_comments  from "./TextAreamanager_comments";
import Switchis_comment_enabled  from "./Switchis_comment_enabled";
import ButtonReject  from "./ButtonReject";
import ButtonApprove  from "./ButtonApprove";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupdaily_approval_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_claims_v1Props, setdfd_claims_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "daily_expense",
      "expense_name",
      "email",
      "claim_category",
      "category_total_amount",
      "expense_date",
      "receipt_image",
      "comments",
      "enable",
      "manager_comments",
      "is_comment_enabled",
      "reject",
      "approve"
    ],
    "allowedGroups": [],
    "blockedControls": [],
    "readOnlyControls": [
      "daily_expense",
      "expense_name",
      "email",
      "claim_category",
      "category_total_amount",
      "expense_date",
      "receipt_image",
      "comments",
      "enable",
      "manager_comments",
      "is_comment_enabled",
      "reject",
      "approve"
    ]
  },
  "Manager": {
    "allowedControls": [
      "daily_expense",
      "expense_name",
      "email",
      "claim_category",
      "category_total_amount",
      "expense_date",
      "receipt_image",
      "comments",
      "enable",
      "manager_comments",
      "is_comment_enabled",
      "reject",
      "approve"
    ],
    "allowedGroups": [
      "canvas",
      "daily_approval_group"
    ],
    "blockedControls": [],
    "readOnlyControls": [
      "daily_expense",
      "expense_name",
      "email",
      "claim_category",
      "category_total_amount",
      "receipt_image",
      "comments"
    ]
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
  const {daily_approval_group69531, setdaily_approval_group69531}= useContext(TotalContext) as TotalContextProps;
  const {daily_approval_group69531Props, setdaily_approval_group69531Props}= useContext(TotalContext) as TotalContextProps;
  const {daily_expense89868, setdaily_expense89868}= useContext(TotalContext) as TotalContextProps;
  const {expense_name88ccc, setexpense_name88ccc}= useContext(TotalContext) as TotalContextProps;
  const {email74f9a, setemail74f9a}= useContext(TotalContext) as TotalContextProps;
  const {claim_category46dd0, setclaim_category46dd0}= useContext(TotalContext) as TotalContextProps;
  const {category_total_amountcf2e2, setcategory_total_amountcf2e2}= useContext(TotalContext) as TotalContextProps;
  const {expense_date08e2f, setexpense_date08e2f}= useContext(TotalContext) as TotalContextProps;
  const {receipt_image3cd01, setreceipt_image3cd01}= useContext(TotalContext) as TotalContextProps;
  const {comments9336d, setcomments9336d}= useContext(TotalContext) as TotalContextProps;
  const {enable666c8, setenable666c8}= useContext(TotalContext) as TotalContextProps;
  const {manager_commentsd309a, setmanager_commentsd309a}= useContext(TotalContext) as TotalContextProps;
  const {is_comment_enablede20a4, setis_comment_enablede20a4}= useContext(TotalContext) as TotalContextProps;
  const {reject28a4c, setreject28a4c}= useContext(TotalContext) as TotalContextProps;
  const {approve28765, setapprove28765}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {approval_screen_daily_v1, setapproval_screen_daily_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:Trs:AFGK:RF:AFK:Approval_Screen_Daily:AFVK:v1',
    [user],
    'GroupDailyApprovalGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "91dcb5fe99014c21add21a4d00669531");
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
    setdaily_approval_group69531Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("daily_expense")){
        setdaily_expense89868((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(daily_expense89868?.isDisabled==null)
      {
        setdaily_expense89868((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("expense_name")){
        setexpense_name88ccc((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(expense_name88ccc?.isDisabled==null)
      {
        setexpense_name88ccc((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("email")){
        setemail74f9a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(email74f9a?.isDisabled==null)
      {
        setemail74f9a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("claim_category")){
        setclaim_category46dd0((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(claim_category46dd0?.isDisabled==null)
      {
        setclaim_category46dd0((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("category_total_amount")){
        setcategory_total_amountcf2e2((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(category_total_amountcf2e2?.isDisabled==null)
      {
        setcategory_total_amountcf2e2((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("expense_date")){
        setexpense_date08e2f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(expense_date08e2f?.isDisabled==null)
      {
        setexpense_date08e2f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("receipt_image")){
        setreceipt_image3cd01((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(receipt_image3cd01?.isDisabled==null)
      {
        setreceipt_image3cd01((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("comments")){
        setcomments9336d((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(comments9336d?.isDisabled==null)
      {
        setcomments9336d((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("enable")){
        setenable666c8((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(enable666c8?.isDisabled==null)
      {
        setenable666c8((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("manager_comments")){
        setmanager_commentsd309a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(manager_commentsd309a?.isDisabled==null)
      {
        setmanager_commentsd309a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("is_comment_enabled")){
        setis_comment_enablede20a4((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(is_comment_enablede20a4?.isDisabled==null)
      {
        setis_comment_enablede20a4((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("reject")){
        setreject28a4c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(reject28a4c?.isDisabled==null)
      {
        setreject28a4c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("approve")){
        setapprove28765((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(approve28765?.isDisabled==null)
      {
        setapprove28765((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['daily_approval_group'] = daily_approval_group69531,
        codeStates['setdaily_approval_group'] = setdaily_approval_group69531,
        codeStates['daily_approval_group69531'] = daily_approval_group69531Props,
        codeStates['setdaily_approval_group69531'] = setdaily_approval_group69531Props,
        codeStates['daily_expense'] = daily_expense89868,
        codeStates['setdaily_expense'] = setdaily_expense89868,
        codeStates['expense_name'] = expense_name88ccc,
        codeStates['setexpense_name'] = setexpense_name88ccc,
        codeStates['email'] = email74f9a,
        codeStates['setemail'] = setemail74f9a,
        codeStates['claim_category'] = claim_category46dd0,
        codeStates['setclaim_category'] = setclaim_category46dd0,
        codeStates['category_total_amount'] = category_total_amountcf2e2,
        codeStates['setcategory_total_amount'] = setcategory_total_amountcf2e2,
        codeStates['expense_date'] = expense_date08e2f,
        codeStates['setexpense_date'] = setexpense_date08e2f,
        codeStates['receipt_image'] = receipt_image3cd01,
        codeStates['setreceipt_image'] = setreceipt_image3cd01,
        codeStates['comments'] = comments9336d,
        codeStates['setcomments'] = setcomments9336d,
        codeStates['enable'] = enable666c8,
        codeStates['setenable'] = setenable666c8,
        codeStates['manager_comments'] = manager_commentsd309a,
        codeStates['setmanager_comments'] = setmanager_commentsd309a,
        codeStates['is_comment_enabled'] = is_comment_enablede20a4,
        codeStates['setis_comment_enabled'] = setis_comment_enablede20a4,
        codeStates['reject'] = reject28a4c,
        codeStates['setreject'] = setreject28a4c,
        codeStates['approve'] = approve28765,
        codeStates['setapprove'] = setapprove28765,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "91dcb5fe99014c21add21a4d00669531");
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
        codeStates['daily_approval_group'] = daily_approval_group69531,
        codeStates['setdaily_approval_group'] = setdaily_approval_group69531,
        codeStates['daily_approval_group69531'] = daily_approval_group69531Props,
        codeStates['setdaily_approval_group69531'] = setdaily_approval_group69531Props,
        codeStates['daily_expense'] = daily_expense89868,
        codeStates['setdaily_expense'] = setdaily_expense89868,
        codeStates['expense_name'] = expense_name88ccc,
        codeStates['setexpense_name'] = setexpense_name88ccc,
        codeStates['email'] = email74f9a,
        codeStates['setemail'] = setemail74f9a,
        codeStates['claim_category'] = claim_category46dd0,
        codeStates['setclaim_category'] = setclaim_category46dd0,
        codeStates['category_total_amount'] = category_total_amountcf2e2,
        codeStates['setcategory_total_amount'] = setcategory_total_amountcf2e2,
        codeStates['expense_date'] = expense_date08e2f,
        codeStates['setexpense_date'] = setexpense_date08e2f,
        codeStates['receipt_image'] = receipt_image3cd01,
        codeStates['setreceipt_image'] = setreceipt_image3cd01,
        codeStates['comments'] = comments9336d,
        codeStates['setcomments'] = setcomments9336d,
        codeStates['enable'] = enable666c8,
        codeStates['setenable'] = setenable666c8,
        codeStates['manager_comments'] = manager_commentsd309a,
        codeStates['setmanager_comments'] = setmanager_commentsd309a,
        codeStates['is_comment_enabled'] = is_comment_enablede20a4,
        codeStates['setis_comment_enabled'] = setis_comment_enablede20a4,
        codeStates['reject'] = reject28a4c,
        codeStates['setreject'] = setreject28a4c,
        codeStates['approve'] = approve28765,
        codeStates['setapprove'] = setapprove28765,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const daily_approval_group69531Ref = useRef<any>(null);
  const handleClearSearch = () => {
    daily_approval_group69531Ref.current?.setSearchParams();
    daily_approval_group69531Ref.current?.handleSearch({});
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
        !Array.isArray(daily_approval_group69531) &&
        Object.keys(daily_approval_group69531)?.length > 0
      ) {
        setdaily_approval_group69531({})
        setdaily_approval_group69531Props((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [daily_approval_group69531Props?.refresh])


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
        gridRow: '1 / 315',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '0px',
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
          setapproval_screen_daily_v1((pre:any)=>({...pre,_selectedGroup_:"daily_approval_group"}))
        }}
    >
          {allowedControls.includes("daily_expense") ?<Textdaily_expense   /* 89868 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("expense_name") ?<TextInputexpense_name   /* 88ccc */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("email") ?<TextInputemail   /* 74f9a */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("claim_category") ?<TextInputclaim_category   /* 46dd0 */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("category_total_amount") ?<TextInputcategory_total_amount   /* cf2e2 */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("expense_date") ?<DatePickerexpense_date   /* 08e2f */ lockedData={lockedData} setLockedData={setLockedData}checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("receipt_image") ?<DocumentViewerreceipt_image   /*3cd01 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("comments") ?<TextAreacomments   /* 9336d */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
          {allowedControls.includes("enable") ?<TextENABLE   /* 666c8 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("manager_comments") ?<TextAreamanager_comments   /* d309a */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("is_comment_enabled")?<Switchis_comment_enabled  /* e20a4 */  lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {        ((ruleData?.length>0 && "reject" in ButtonGoRuleData)?ButtonGoRuleData["reject"]:true) && 
          allowedControls.includes("reject")  ?            <ButtonReject tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "approve" in ButtonGoRuleData)?ButtonGoRuleData["approve"]:true) && 
          allowedControls.includes("approve")  ?            <ButtonApprove tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
    </div>
 )
}

export default Groupdaily_approval_group
