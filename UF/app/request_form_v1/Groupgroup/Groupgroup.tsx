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
import Groupgroup_two  from "../Groupgroup_two/Groupgroup_two";
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
import Textdailyexpense  from "./Textdailyexpense";
import TextInputexpense_name  from "./TextInputexpense_name";
import DatePickerexpense_date  from "./DatePickerexpense_date";
import Dropdownclaim_category  from "./Dropdownclaim_category";
import TextInputcategory_total_amount  from "./TextInputcategory_total_amount";
import Documentuploaderreceipt_image  from "./Documentuploaderreceipt_image";
import TextAreacomments  from "./TextAreacomments";
import Switchswitch  from "./Switchswitch";
import Checkboxcheckbox  from "./Checkboxcheckbox";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupgroup = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_claims_dfd_v1Props, setdfd_claims_dfd_v1Props} = useContext(TotalContext) as TotalContextProps;
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
  "checker": {
    "allowedControls": [
      "dailyexpense",
      "expense_name",
      "expense_date",
      "claim_category",
      "category_total_amount",
      "receipt_image",
      "comments",
      "switch",
      "checkbox"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "group_two"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Employee": {
    "allowedControls": [
      "dailyexpense",
      "expense_name",
      "expense_date",
      "claim_category",
      "category_total_amount",
      "receipt_image",
      "comments",
      "switch",
      "checkbox"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "group_two"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "maker": {
    "allowedControls": [
      "dailyexpense",
      "expense_name",
      "expense_date",
      "claim_category",
      "category_total_amount",
      "receipt_image",
      "comments",
      "switch",
      "checkbox"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "group_two"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Manager": {
    "allowedControls": [
      "dailyexpense",
      "expense_name",
      "expense_date",
      "claim_category",
      "category_total_amount",
      "receipt_image",
      "comments",
      "switch",
      "checkbox"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "group_two"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  }
};
  const prevRefreshRef = useRef(false);
  const handleOnloadCalledRef = useRef(false);
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
  const {group571d2, setgroup571d2}= useContext(TotalContext) as TotalContextProps;
  const {group571d2Props, setgroup571d2Props}= useContext(TotalContext) as TotalContextProps;
  const {dailyexpense64a4c, setdailyexpense64a4c}= useContext(TotalContext) as TotalContextProps;
  const {expense_name136a1, setexpense_name136a1}= useContext(TotalContext) as TotalContextProps;
  const {expense_date7e93b, setexpense_date7e93b}= useContext(TotalContext) as TotalContextProps;
  const {claim_categoryf1c64, setclaim_categoryf1c64}= useContext(TotalContext) as TotalContextProps;
  const {category_total_amount395dd, setcategory_total_amount395dd}= useContext(TotalContext) as TotalContextProps;
  const {receipt_imageb2aec, setreceipt_imageb2aec}= useContext(TotalContext) as TotalContextProps;
  const {commentse3b5b, setcommentse3b5b}= useContext(TotalContext) as TotalContextProps;
  const {group_two6135c, setgroup_two6135c}= useContext(TotalContext) as TotalContextProps;
  const {group_two6135cProps, setgroup_two6135cProps}= useContext(TotalContext) as TotalContextProps;
  const {switch7e8ff, setswitch7e8ff}= useContext(TotalContext) as TotalContextProps;
  const {checkbox53e8f, setcheckbox53e8f}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {request_form_v1, setrequest_form_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT001:FNGK:AF:FNK:UF-UFW:CATK:TAM:AFGK:TA:AFK:Request_form:AFVK:v1',
    [user],
    'GroupGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "5a69b1d62572431ab2933ca7cf0571d2");
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
    setgroup571d2Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("dailyexpense")){
        setdailyexpense64a4c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(dailyexpense64a4c?.isDisabled==null)
      {
        setdailyexpense64a4c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("expense_name")){
        setexpense_name136a1((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(expense_name136a1?.isDisabled==null)
      {
        setexpense_name136a1((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("expense_date")){
        setexpense_date7e93b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(expense_date7e93b?.isDisabled==null)
      {
        setexpense_date7e93b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("claim_category")){
        setclaim_categoryf1c64((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(claim_categoryf1c64?.isDisabled==null)
      {
        setclaim_categoryf1c64((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("category_total_amount")){
        setcategory_total_amount395dd((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(category_total_amount395dd?.isDisabled==null)
      {
        setcategory_total_amount395dd((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("receipt_image")){
        setreceipt_imageb2aec((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(receipt_imageb2aec?.isDisabled==null)
      {
        setreceipt_imageb2aec((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("comments")){
        setcommentse3b5b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(commentse3b5b?.isDisabled==null)
      {
        setcommentse3b5b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("group_two")){
        setgroup_two6135c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(group_two6135c?.isDisabled==null)
      {
        setgroup_two6135c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("switch")){
        setswitch7e8ff((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(switch7e8ff?.isDisabled==null)
      {
        setswitch7e8ff((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("checkbox")){
        setcheckbox53e8f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(checkbox53e8f?.isDisabled==null)
      {
        setcheckbox53e8f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['group'] = group571d2,
        codeStates['setgroup'] = setgroup571d2,
        codeStates['group571d2'] = group571d2Props,
        codeStates['setgroup571d2'] = setgroup571d2Props,
        codeStates['dailyexpense'] = dailyexpense64a4c,
        codeStates['setdailyexpense'] = setdailyexpense64a4c,
        codeStates['expense_name'] = expense_name136a1,
        codeStates['setexpense_name'] = setexpense_name136a1,
        codeStates['expense_date'] = expense_date7e93b,
        codeStates['setexpense_date'] = setexpense_date7e93b,
        codeStates['claim_category'] = claim_categoryf1c64,
        codeStates['setclaim_category'] = setclaim_categoryf1c64,
        codeStates['category_total_amount'] = category_total_amount395dd,
        codeStates['setcategory_total_amount'] = setcategory_total_amount395dd,
        codeStates['receipt_image'] = receipt_imageb2aec,
        codeStates['setreceipt_image'] = setreceipt_imageb2aec,
        codeStates['comments'] = commentse3b5b,
        codeStates['setcomments'] = setcommentse3b5b,
        codeStates['group_two'] = group_two6135c,
        codeStates['setgroup_two'] = setgroup_two6135c,
        codeStates['group_two6135c'] = group_two6135cProps,
        codeStates['setgroup_two6135c'] = setgroup_two6135cProps,
        codeStates['switch'] = switch7e8ff,
        codeStates['setswitch'] = setswitch7e8ff,
        codeStates['checkbox'] = checkbox53e8f,
        codeStates['setcheckbox'] = setcheckbox53e8f,

    codeExecution(code,codeStates);
    } 
  }


    const handleOnload=()=>{
  }
  const handleOnChange=()=>{

  }

  const handleOnClick= async (selectedItem:any, selectedIndex?: number)=>{
    handleCustomCode()
    
  }
  const handleCustomCode=async () => {
    let customCode:any=""
    if (allCode != '') {
      let codeStates: any = {};
        codeStates['group'] = group571d2,
        codeStates['setgroup'] = setgroup571d2,
        codeStates['group571d2'] = group571d2Props,
        codeStates['setgroup571d2'] = setgroup571d2Props,
        codeStates['dailyexpense'] = dailyexpense64a4c,
        codeStates['setdailyexpense'] = setdailyexpense64a4c,
        codeStates['expense_name'] = expense_name136a1,
        codeStates['setexpense_name'] = setexpense_name136a1,
        codeStates['expense_date'] = expense_date7e93b,
        codeStates['setexpense_date'] = setexpense_date7e93b,
        codeStates['claim_category'] = claim_categoryf1c64,
        codeStates['setclaim_category'] = setclaim_categoryf1c64,
        codeStates['category_total_amount'] = category_total_amount395dd,
        codeStates['setcategory_total_amount'] = setcategory_total_amount395dd,
        codeStates['receipt_image'] = receipt_imageb2aec,
        codeStates['setreceipt_image'] = setreceipt_imageb2aec,
        codeStates['comments'] = commentse3b5b,
        codeStates['setcomments'] = setcommentse3b5b,
        codeStates['group_two'] = group_two6135c,
        codeStates['setgroup_two'] = setgroup_two6135c,
        codeStates['group_two6135c'] = group_two6135cProps,
        codeStates['setgroup_two6135c'] = setgroup_two6135cProps,
        codeStates['switch'] = switch7e8ff,
        codeStates['setswitch'] = setswitch7e8ff,
        codeStates['checkbox'] = checkbox53e8f,
        codeStates['setcheckbox'] = setcheckbox53e8f,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const group571d2Ref = useRef<any>(null);
  const handleClearSearch = () => {
    group571d2Ref.current?.setSearchParams();
    group571d2Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    if (!handleOnloadCalledRef.current) {
      handleOnloadCalledRef.current = true
      handleOnload()
    }
    if (prevRefreshRef.current) {
      if (
        !Array.isArray(group571d2) &&
        Object.keys(group571d2)?.length > 0
      ) {
        setgroup571d2({})
      }
    } else prevRefreshRef.current = true
  }, [group571d2Props?.refresh])

  useEffect(() => {
    securityCheck()
  }, [token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '2 / 24',
        gridRow: '4 / 262',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '0px',
        backgroundColor:'#c4ede5',
        backgroundImage:"url('')",
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
      className={`flex flex-col overflow-auto rounded-md  ${isDark ? 'text-white' : 'text-black'}  ${request_form_v1?._selectedGroup_=="group" ? 'border-2 border-solid !border-[#c93131]': ''}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setrequest_form_v1((pre:any)=>({...pre,_selectedGroup_:"group"}))
        }}
    >
        {allowedComponent.includes("group_two")  &&<Groupgroup_two  
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
          {allowedControls.includes("dailyexpense") ?<Textdailyexpense   /* 64a4c */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("expense_name") ?<TextInputexpense_name   /* 136a1 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("expense_date") ?<DatePickerexpense_date   /* 7e93b */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("claim_category") ?<Dropdownclaim_category   /* f1c64 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("category_total_amount") ?<TextInputcategory_total_amount   /* 395dd */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("receipt_image") ?<Documentuploaderreceipt_image   /* b2aec */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("comments") ?<TextAreacomments   /* e3b5b */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("switch")?<Switchswitch  /* 7e8ff */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("checkbox") ?<Checkboxcheckbox   /* 53e8f */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupgroup
