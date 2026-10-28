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
import Groupclaimsdetailtable  from "../Groupclaimsdetailtable/Groupclaimsdetailtable";
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
import Textoffsite_expense  from "./Textoffsite_expense";
import TextInputclaim_expense_type  from "./TextInputclaim_expense_type";
import TextInputexpense_name  from "./TextInputexpense_name";
import TextInputemail  from "./TextInputemail";
import DatePickerfrom_date  from "./DatePickerfrom_date";
import DatePickerto_date  from "./DatePickerto_date";
import Dropdownclaim_category  from "./Dropdownclaim_category";
import TextInputcategory_total_amount  from "./TextInputcategory_total_amount";
import Textattachment  from "./Textattachment";
import Documentuploaderreceipt_image  from "./Documentuploaderreceipt_image";
import Textenable  from "./Textenable";
import TextAreacomments  from "./TextAreacomments";
import Switchis_comment_enabled  from "./Switchis_comment_enabled";
import ButtonClear  from "./ButtonClear";
import ButtonAdd  from "./ButtonAdd";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Grouprequest_offsite_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_claims_detail_v1Props, setdfd_claims_detail_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_code_description_v1Props, setdfd_code_description_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "offsite_expense",
      "expense_name",
      "email",
      "from_date",
      "to_date",
      "claim_category",
      "category_total_amount",
      "attachment",
      "receipt_image",
      "enable",
      "comments",
      "is_comment_enabled",
      "clear",
      "add"
    ],
    "allowedGroups": [
      "canvas",
      "request_offsite_group",
      "claimsdetailtable"
    ],
    "blockedControls": [
      "claim_expense_type"
    ],
    "readOnlyControls": []
  },
  "Manager": {
    "allowedControls": [
      "email",
      "from_date",
      "to_date",
      "claim_category",
      "attachment",
      "enable",
      "is_comment_enabled"
    ],
    "allowedGroups": [],
    "blockedControls": [
      "offsite_expense",
      "claim_expense_type",
      "expense_name",
      "category_total_amount",
      "receipt_image",
      "comments",
      "clear",
      "add"
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
  const {request_offsite_group429cb, setrequest_offsite_group429cb}= useContext(TotalContext) as TotalContextProps;
  const {request_offsite_group429cbProps, setrequest_offsite_group429cbProps}= useContext(TotalContext) as TotalContextProps;
  const {offsite_expense39c39, setoffsite_expense39c39}= useContext(TotalContext) as TotalContextProps;
  const {claim_expense_type51f6e, setclaim_expense_type51f6e}= useContext(TotalContext) as TotalContextProps;
  const {expense_namebf755, setexpense_namebf755}= useContext(TotalContext) as TotalContextProps;
  const {emailad8a5, setemailad8a5}= useContext(TotalContext) as TotalContextProps;
  const {from_datee96b6, setfrom_datee96b6}= useContext(TotalContext) as TotalContextProps;
  const {to_dateaf8c4, setto_dateaf8c4}= useContext(TotalContext) as TotalContextProps;
  const {claim_categoryb2e83, setclaim_categoryb2e83}= useContext(TotalContext) as TotalContextProps;
  const {category_total_amounte603b, setcategory_total_amounte603b}= useContext(TotalContext) as TotalContextProps;
  const {attachmentc9c51, setattachmentc9c51}= useContext(TotalContext) as TotalContextProps;
  const {receipt_imageafe30, setreceipt_imageafe30}= useContext(TotalContext) as TotalContextProps;
  const {enableeff29, setenableeff29}= useContext(TotalContext) as TotalContextProps;
  const {comments65b18, setcomments65b18}= useContext(TotalContext) as TotalContextProps;
  const {is_comment_enabled5ca5f, setis_comment_enabled5ca5f}= useContext(TotalContext) as TotalContextProps;
  const {clear2b3e6, setclear2b3e6}= useContext(TotalContext) as TotalContextProps;
  const {add5cae4, setadd5cae4}= useContext(TotalContext) as TotalContextProps;
  const {claimsdetailtablef8143, setclaimsdetailtablef8143}= useContext(TotalContext) as TotalContextProps;
  const {claimsdetailtablef8143Props, setclaimsdetailtablef8143Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {request_screen_offsite_v1, setrequest_screen_offsite_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:Trs:AFGK:RF:AFK:Request_Screen_Offsite:AFVK:v1',
    [user],
    'GroupRequestOffsiteGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "4d39522ee30443598090fe9ac0c429cb");
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
    setrequest_offsite_group429cbProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("offsite_expense")){
        setoffsite_expense39c39((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(offsite_expense39c39?.isDisabled==null)
      {
        setoffsite_expense39c39((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("claim_expense_type")){
        setclaim_expense_type51f6e((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(claim_expense_type51f6e?.isDisabled==null)
      {
        setclaim_expense_type51f6e((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("expense_name")){
        setexpense_namebf755((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(expense_namebf755?.isDisabled==null)
      {
        setexpense_namebf755((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("email")){
        setemailad8a5((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(emailad8a5?.isDisabled==null)
      {
        setemailad8a5((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("from_date")){
        setfrom_datee96b6((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(from_datee96b6?.isDisabled==null)
      {
        setfrom_datee96b6((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("to_date")){
        setto_dateaf8c4((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(to_dateaf8c4?.isDisabled==null)
      {
        setto_dateaf8c4((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("claim_category")){
        setclaim_categoryb2e83((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(claim_categoryb2e83?.isDisabled==null)
      {
        setclaim_categoryb2e83((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("category_total_amount")){
        setcategory_total_amounte603b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(category_total_amounte603b?.isDisabled==null)
      {
        setcategory_total_amounte603b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("attachment")){
        setattachmentc9c51((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(attachmentc9c51?.isDisabled==null)
      {
        setattachmentc9c51((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("receipt_image")){
        setreceipt_imageafe30((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(receipt_imageafe30?.isDisabled==null)
      {
        setreceipt_imageafe30((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("enable")){
        setenableeff29((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(enableeff29?.isDisabled==null)
      {
        setenableeff29((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("comments")){
        setcomments65b18((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(comments65b18?.isDisabled==null)
      {
        setcomments65b18((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("is_comment_enabled")){
        setis_comment_enabled5ca5f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(is_comment_enabled5ca5f?.isDisabled==null)
      {
        setis_comment_enabled5ca5f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("clear")){
        setclear2b3e6((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(clear2b3e6?.isDisabled==null)
      {
        setclear2b3e6((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("add")){
        setadd5cae4((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(add5cae4?.isDisabled==null)
      {
        setadd5cae4((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("claimsdetailtable")){
        setclaimsdetailtablef8143Props((pre:any)=>({...pre,...claimsdetailtablef8143,isDisabled:true}));

    }else
    {
      if(claimsdetailtablef8143?.isDisabled==null)
      {
        setclaimsdetailtablef8143Props((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['request_offsite_group'] = request_offsite_group429cb,
        codeStates['setrequest_offsite_group'] = setrequest_offsite_group429cb,
        codeStates['request_offsite_group429cb'] = request_offsite_group429cbProps,
        codeStates['setrequest_offsite_group429cb'] = setrequest_offsite_group429cbProps,
        codeStates['offsite_expense'] = offsite_expense39c39,
        codeStates['setoffsite_expense'] = setoffsite_expense39c39,
        codeStates['claim_expense_type'] = claim_expense_type51f6e,
        codeStates['setclaim_expense_type'] = setclaim_expense_type51f6e,
        codeStates['expense_name'] = expense_namebf755,
        codeStates['setexpense_name'] = setexpense_namebf755,
        codeStates['email'] = emailad8a5,
        codeStates['setemail'] = setemailad8a5,
        codeStates['from_date'] = from_datee96b6,
        codeStates['setfrom_date'] = setfrom_datee96b6,
        codeStates['to_date'] = to_dateaf8c4,
        codeStates['setto_date'] = setto_dateaf8c4,
        codeStates['claim_category'] = claim_categoryb2e83,
        codeStates['setclaim_category'] = setclaim_categoryb2e83,
        codeStates['category_total_amount'] = category_total_amounte603b,
        codeStates['setcategory_total_amount'] = setcategory_total_amounte603b,
        codeStates['attachment'] = attachmentc9c51,
        codeStates['setattachment'] = setattachmentc9c51,
        codeStates['receipt_image'] = receipt_imageafe30,
        codeStates['setreceipt_image'] = setreceipt_imageafe30,
        codeStates['enable'] = enableeff29,
        codeStates['setenable'] = setenableeff29,
        codeStates['comments'] = comments65b18,
        codeStates['setcomments'] = setcomments65b18,
        codeStates['is_comment_enabled'] = is_comment_enabled5ca5f,
        codeStates['setis_comment_enabled'] = setis_comment_enabled5ca5f,
        codeStates['clear'] = clear2b3e6,
        codeStates['setclear'] = setclear2b3e6,
        codeStates['add'] = add5cae4,
        codeStates['setadd'] = setadd5cae4,
        codeStates['claimsdetailtable'] = claimsdetailtablef8143,
        codeStates['setclaimsdetailtable'] = setclaimsdetailtablef8143,
        codeStates['claimsdetailtablef8143'] = claimsdetailtablef8143Props,
        codeStates['setclaimsdetailtablef8143'] = setclaimsdetailtablef8143Props,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "4d39522ee30443598090fe9ac0c429cb");
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
        codeStates['request_offsite_group'] = request_offsite_group429cb,
        codeStates['setrequest_offsite_group'] = setrequest_offsite_group429cb,
        codeStates['request_offsite_group429cb'] = request_offsite_group429cbProps,
        codeStates['setrequest_offsite_group429cb'] = setrequest_offsite_group429cbProps,
        codeStates['offsite_expense'] = offsite_expense39c39,
        codeStates['setoffsite_expense'] = setoffsite_expense39c39,
        codeStates['claim_expense_type'] = claim_expense_type51f6e,
        codeStates['setclaim_expense_type'] = setclaim_expense_type51f6e,
        codeStates['expense_name'] = expense_namebf755,
        codeStates['setexpense_name'] = setexpense_namebf755,
        codeStates['email'] = emailad8a5,
        codeStates['setemail'] = setemailad8a5,
        codeStates['from_date'] = from_datee96b6,
        codeStates['setfrom_date'] = setfrom_datee96b6,
        codeStates['to_date'] = to_dateaf8c4,
        codeStates['setto_date'] = setto_dateaf8c4,
        codeStates['claim_category'] = claim_categoryb2e83,
        codeStates['setclaim_category'] = setclaim_categoryb2e83,
        codeStates['category_total_amount'] = category_total_amounte603b,
        codeStates['setcategory_total_amount'] = setcategory_total_amounte603b,
        codeStates['attachment'] = attachmentc9c51,
        codeStates['setattachment'] = setattachmentc9c51,
        codeStates['receipt_image'] = receipt_imageafe30,
        codeStates['setreceipt_image'] = setreceipt_imageafe30,
        codeStates['enable'] = enableeff29,
        codeStates['setenable'] = setenableeff29,
        codeStates['comments'] = comments65b18,
        codeStates['setcomments'] = setcomments65b18,
        codeStates['is_comment_enabled'] = is_comment_enabled5ca5f,
        codeStates['setis_comment_enabled'] = setis_comment_enabled5ca5f,
        codeStates['clear'] = clear2b3e6,
        codeStates['setclear'] = setclear2b3e6,
        codeStates['add'] = add5cae4,
        codeStates['setadd'] = setadd5cae4,
        codeStates['claimsdetailtable'] = claimsdetailtablef8143,
        codeStates['setclaimsdetailtable'] = setclaimsdetailtablef8143,
        codeStates['claimsdetailtablef8143'] = claimsdetailtablef8143Props,
        codeStates['setclaimsdetailtablef8143'] = setclaimsdetailtablef8143Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const request_offsite_group429cbRef = useRef<any>(null);
  const handleClearSearch = () => {
    request_offsite_group429cbRef.current?.setSearchParams();
    request_offsite_group429cbRef.current?.handleSearch({});
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
        !Array.isArray(request_offsite_group429cb) &&
        Object.keys(request_offsite_group429cb)?.length > 0
      ) {
        setrequest_offsite_group429cb({})
        setrequest_offsite_group429cbProps((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [request_offsite_group429cbProps?.refresh])


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
        gridRow: '1 / 319',
      
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
          setrequest_screen_offsite_v1((pre:any)=>({...pre,_selectedGroup_:"request_offsite_group"}))
        }}
    >
        {allowedComponent.includes("claimsdetailtable")  &&<Groupclaimsdetailtable  
          lockedData={lockedData} 
          setLockedData={setLockedData} 
          tableData={tableData}
          setTableData={setTableData}
          primaryTableData={primaryTableData}
          setPrimaryTableData={setPrimaryTableData}
          checkToAdd={checkToAdd} 
          setCheckToAdd={setCheckToAdd}  
          refetch={refetch}
          setRefetch={setRefetch}
          encryptionFlagPageData={encryptionFlagPageData}
          paginationDetails={paginationDetails}
          setIsProcessing={setIsProcessing}
          groupData={groupData}
          controlData={controlData}        />}
          {allowedControls.includes("offsite_expense") ?<Textoffsite_expense   /* 39c39 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("claim_expense_type") ?<TextInputclaim_expense_type   /* 51f6e */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("expense_name") ?<TextInputexpense_name   /* bf755 */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("email") ?<TextInputemail   /* ad8a5 */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("from_date") ?<DatePickerfrom_date   /* e96b6 */ lockedData={lockedData} setLockedData={setLockedData}checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("to_date") ?<DatePickerto_date   /* af8c4 */ lockedData={lockedData} setLockedData={setLockedData}checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("claim_category") ?<Dropdownclaim_category   /* b2e83 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("category_total_amount") ?<TextInputcategory_total_amount   /* e603b */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("attachment") ?<Textattachment   /* c9c51 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("receipt_image") ?<Documentuploaderreceipt_image   /* afe30 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("enable") ?<Textenable   /* eff29 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("comments") ?<TextAreacomments   /* 65b18 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("is_comment_enabled")?<Switchis_comment_enabled  /* 5ca5f */  lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {        ((ruleData?.length>0 && "clear" in ButtonGoRuleData)?ButtonGoRuleData["clear"]:true) && 
          allowedControls.includes("clear")  ?            <ButtonClear tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "add" in ButtonGoRuleData)?ButtonGoRuleData["add"]:true) && 
          allowedControls.includes("add")  ?            <ButtonAdd tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
    </div>
 )
}

export default Grouprequest_offsite_group
