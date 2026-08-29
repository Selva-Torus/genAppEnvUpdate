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
import DatePickerexpense_date  from "./DatePickerexpense_date";
import Dropdownclaim_category  from "./Dropdownclaim_category";
import TextInputcategory_total_amount  from "./TextInputcategory_total_amount";
import Documentuploaderreceipt_image  from "./Documentuploaderreceipt_image";
import TextAreacomments  from "./TextAreacomments";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupgrouparray = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_group_array_dsd_v1Props, setdfd_group_array_dsd_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "expense_date",
      "claim_category",
      "category_total_amount",
      "receipt_image",
      "comments"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "grouparray"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Manager": {
    "allowedControls": [
      "daily_expense",
      "expense_name",
      "email",
      "expense_date",
      "claim_category",
      "category_total_amount",
      "receipt_image",
      "comments"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "grouparray"
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
  const {grouparray494e0_0, setgrouparray494e0_0}= useContext(TotalContext) as TotalContextProps;
  const {grouparray494e0_0Props, setgrouparray494e0_0Props}= useContext(TotalContext) as TotalContextProps;
  const {grouparray494e0_1, setgrouparray494e0_1}= useContext(TotalContext) as TotalContextProps;
  const {grouparray494e0_1Props, setgrouparray494e0_1Props}= useContext(TotalContext) as TotalContextProps;
  const {grouparray494e0_2, setgrouparray494e0_2}= useContext(TotalContext) as TotalContextProps;
  const {grouparray494e0_2Props, setgrouparray494e0_2Props}= useContext(TotalContext) as TotalContextProps;
  const {grouparray494e0_3, setgrouparray494e0_3}= useContext(TotalContext) as TotalContextProps;
  const {grouparray494e0_3Props, setgrouparray494e0_3Props}= useContext(TotalContext) as TotalContextProps;
  const {grouparray494e0_4, setgrouparray494e0_4}= useContext(TotalContext) as TotalContextProps;
  const {grouparray494e0_4Props, setgrouparray494e0_4Props}= useContext(TotalContext) as TotalContextProps;
  const {grouparray494e0_5, setgrouparray494e0_5}= useContext(TotalContext) as TotalContextProps;
  const {grouparray494e0_5Props, setgrouparray494e0_5Props}= useContext(TotalContext) as TotalContextProps;
  const {group84b9c, setgroup84b9c}= useContext(TotalContext) as TotalContextProps;
  const {group84b9cProps, setgroup84b9cProps}= useContext(TotalContext) as TotalContextProps;
  const {grouparray494e0, setgrouparray494e0}= useContext(TotalContext) as TotalContextProps;
  const {grouparray494e0Props, setgrouparray494e0Props}= useContext(TotalContext) as TotalContextProps;
  const {daily_expense3c178, setdaily_expense3c178}= useContext(TotalContext) as TotalContextProps;
  const {expense_namec83ee, setexpense_namec83ee}= useContext(TotalContext) as TotalContextProps;
  const {email0c3ca, setemail0c3ca}= useContext(TotalContext) as TotalContextProps;
  const {expense_datee6e16, setexpense_datee6e16}= useContext(TotalContext) as TotalContextProps;
  const {claim_categoryf03f1, setclaim_categoryf03f1}= useContext(TotalContext) as TotalContextProps;
  const {category_total_amount49375, setcategory_total_amount49375}= useContext(TotalContext) as TotalContextProps;
  const {receipt_image4f1bf, setreceipt_image4f1bf}= useContext(TotalContext) as TotalContextProps;
  const {comments7171e, setcomments7171e}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {grouparray_v1, setgrouparray_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT001:FNGK:AF:FNK:UF-UFW:CATK:TAM:AFGK:TA:AFK:GroupArray:AFVK:v1',
    [user],
    'GroupGrouparray',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "05177fac499640d4bf45a199a95494e0");
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
    setgrouparray494e0Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("daily_expense")){
        setdaily_expense3c178((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(daily_expense3c178?.isDisabled==null)
      {
        setdaily_expense3c178((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("expense_name")){
        setexpense_namec83ee((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(expense_namec83ee?.isDisabled==null)
      {
        setexpense_namec83ee((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("email")){
        setemail0c3ca((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(email0c3ca?.isDisabled==null)
      {
        setemail0c3ca((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("expense_date")){
        setexpense_datee6e16((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(expense_datee6e16?.isDisabled==null)
      {
        setexpense_datee6e16((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("claim_category")){
        setclaim_categoryf03f1((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(claim_categoryf03f1?.isDisabled==null)
      {
        setclaim_categoryf03f1((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("category_total_amount")){
        setcategory_total_amount49375((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(category_total_amount49375?.isDisabled==null)
      {
        setcategory_total_amount49375((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("receipt_image")){
        setreceipt_image4f1bf((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(receipt_image4f1bf?.isDisabled==null)
      {
        setreceipt_image4f1bf((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("comments")){
        setcomments7171e((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(comments7171e?.isDisabled==null)
      {
        setcomments7171e((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['grouparray49'] = grouparray494e0_0,
        codeStates['setgrouparray49'] = setgrouparray494e0_0,
        codeStates['grouparray494e0_0'] = grouparray494e0_0Props,
        codeStates['setgrouparray494e0_0'] = setgrouparray494e0_0Props,
        codeStates['grouparray49'] = grouparray494e0_1,
        codeStates['setgrouparray49'] = setgrouparray494e0_1,
        codeStates['grouparray494e0_1'] = grouparray494e0_1Props,
        codeStates['setgrouparray494e0_1'] = setgrouparray494e0_1Props,
        codeStates['grouparray49'] = grouparray494e0_2,
        codeStates['setgrouparray49'] = setgrouparray494e0_2,
        codeStates['grouparray494e0_2'] = grouparray494e0_2Props,
        codeStates['setgrouparray494e0_2'] = setgrouparray494e0_2Props,
        codeStates['grouparray49'] = grouparray494e0_3,
        codeStates['setgrouparray49'] = setgrouparray494e0_3,
        codeStates['grouparray494e0_3'] = grouparray494e0_3Props,
        codeStates['setgrouparray494e0_3'] = setgrouparray494e0_3Props,
        codeStates['grouparray49'] = grouparray494e0_4,
        codeStates['setgrouparray49'] = setgrouparray494e0_4,
        codeStates['grouparray494e0_4'] = grouparray494e0_4Props,
        codeStates['setgrouparray494e0_4'] = setgrouparray494e0_4Props,
        codeStates['grouparray49'] = grouparray494e0_5,
        codeStates['setgrouparray49'] = setgrouparray494e0_5,
        codeStates['grouparray494e0_5'] = grouparray494e0_5Props,
        codeStates['setgrouparray494e0_5'] = setgrouparray494e0_5Props,
        codeStates['group'] = group84b9c,
        codeStates['setgroup'] = setgroup84b9c,
        codeStates['group84b9c'] = group84b9cProps,
        codeStates['setgroup84b9c'] = setgroup84b9cProps,
        codeStates['grouparray'] = grouparray494e0,
        codeStates['setgrouparray'] = setgrouparray494e0,
        codeStates['grouparray494e0'] = grouparray494e0Props,
        codeStates['setgrouparray494e0'] = setgrouparray494e0Props,
        codeStates['daily_expense'] = daily_expense3c178,
        codeStates['setdaily_expense'] = setdaily_expense3c178,
        codeStates['expense_name'] = expense_namec83ee,
        codeStates['setexpense_name'] = setexpense_namec83ee,
        codeStates['email'] = email0c3ca,
        codeStates['setemail'] = setemail0c3ca,
        codeStates['expense_date'] = expense_datee6e16,
        codeStates['setexpense_date'] = setexpense_datee6e16,
        codeStates['claim_category'] = claim_categoryf03f1,
        codeStates['setclaim_category'] = setclaim_categoryf03f1,
        codeStates['category_total_amount'] = category_total_amount49375,
        codeStates['setcategory_total_amount'] = setcategory_total_amount49375,
        codeStates['receipt_image'] = receipt_image4f1bf,
        codeStates['setreceipt_image'] = setreceipt_image4f1bf,
        codeStates['comments'] = comments7171e,
        codeStates['setcomments'] = setcomments7171e,

    codeExecution(code,codeStates);
    } 
  }

  function handleConfirmOnLoad(){
  }

    const handleOnload=()=>{
      // copyFormData for group
      setgroup84b9c((prev:any) => ({ ...prev, ...grouparray494e0 }));
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
        codeStates['grouparray49'] = grouparray494e0_0,
        codeStates['setgrouparray49'] = setgrouparray494e0_0,
        codeStates['grouparray494e0_0'] = grouparray494e0_0Props,
        codeStates['setgrouparray494e0_0'] = setgrouparray494e0_0Props,
        codeStates['grouparray49'] = grouparray494e0_1,
        codeStates['setgrouparray49'] = setgrouparray494e0_1,
        codeStates['grouparray494e0_1'] = grouparray494e0_1Props,
        codeStates['setgrouparray494e0_1'] = setgrouparray494e0_1Props,
        codeStates['grouparray49'] = grouparray494e0_2,
        codeStates['setgrouparray49'] = setgrouparray494e0_2,
        codeStates['grouparray494e0_2'] = grouparray494e0_2Props,
        codeStates['setgrouparray494e0_2'] = setgrouparray494e0_2Props,
        codeStates['grouparray49'] = grouparray494e0_3,
        codeStates['setgrouparray49'] = setgrouparray494e0_3,
        codeStates['grouparray494e0_3'] = grouparray494e0_3Props,
        codeStates['setgrouparray494e0_3'] = setgrouparray494e0_3Props,
        codeStates['grouparray49'] = grouparray494e0_4,
        codeStates['setgrouparray49'] = setgrouparray494e0_4,
        codeStates['grouparray494e0_4'] = grouparray494e0_4Props,
        codeStates['setgrouparray494e0_4'] = setgrouparray494e0_4Props,
        codeStates['grouparray49'] = grouparray494e0_5,
        codeStates['setgrouparray49'] = setgrouparray494e0_5,
        codeStates['grouparray494e0_5'] = grouparray494e0_5Props,
        codeStates['setgrouparray494e0_5'] = setgrouparray494e0_5Props,
        codeStates['group'] = group84b9c,
        codeStates['setgroup'] = setgroup84b9c,
        codeStates['group84b9c'] = group84b9cProps,
        codeStates['setgroup84b9c'] = setgroup84b9cProps,
        codeStates['grouparray'] = grouparray494e0,
        codeStates['setgrouparray'] = setgrouparray494e0,
        codeStates['grouparray494e0'] = grouparray494e0Props,
        codeStates['setgrouparray494e0'] = setgrouparray494e0Props,
        codeStates['daily_expense'] = daily_expense3c178,
        codeStates['setdaily_expense'] = setdaily_expense3c178,
        codeStates['expense_name'] = expense_namec83ee,
        codeStates['setexpense_name'] = setexpense_namec83ee,
        codeStates['email'] = email0c3ca,
        codeStates['setemail'] = setemail0c3ca,
        codeStates['expense_date'] = expense_datee6e16,
        codeStates['setexpense_date'] = setexpense_datee6e16,
        codeStates['claim_category'] = claim_categoryf03f1,
        codeStates['setclaim_category'] = setclaim_categoryf03f1,
        codeStates['category_total_amount'] = category_total_amount49375,
        codeStates['setcategory_total_amount'] = setcategory_total_amount49375,
        codeStates['receipt_image'] = receipt_image4f1bf,
        codeStates['setreceipt_image'] = setreceipt_image4f1bf,
        codeStates['comments'] = comments7171e,
        codeStates['setcomments'] = setcomments7171e,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const grouparray494e0_0Ref = useRef<any>(null);
  const handleClearSearch = () => {
    grouparray494e0_0Ref.current?.setSearchParams();
    grouparray494e0_0Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    if (!handleOnloadCalledRef.current) {
      handleOnloadCalledRef.current = true
      handleOnload()
    }
    if (prevRefreshRef.current) {
      if (
        !Array.isArray(grouparray494e0_0) &&
        Object.keys(grouparray494e0_0)?.length > 0
      ) {
        setgrouparray494e0_0({})
      }
    } else prevRefreshRef.current = true
  }, [grouparray494e0_0Props?.refresh])

  useEffect(() => {
    securityCheck()
  }, [token])

  useEffect(() => {      
    handleOnload()
    handleOnChange()
  }, [grouparray494e0])

  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridRow: 'span 187', 
        gridColumn: 'span 22',  
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '0px',
        backgroundColor:'#cfd2dd',
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
          setgrouparray_v1((pre:any)=>({...pre,_selectedGroup_:"grouparray"}))
        }}
    >
          {allowedControls.includes("daily_expense") ?<Textdaily_expense   /* 3c178 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("expense_name") ?<TextInputexpense_name   /* c83ee */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("email") ?<TextInputemail   /* 0c3ca */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("expense_date") ?<DatePickerexpense_date   /* e6e16 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("claim_category") ?<Dropdownclaim_category   /* f03f1 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("category_total_amount") ?<TextInputcategory_total_amount   /* 49375 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("receipt_image") ?<Documentuploaderreceipt_image   /* 4f1bf */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("comments") ?<TextAreacomments   /* 7171e */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
    </div>
 )
}

export default Groupgrouparray
