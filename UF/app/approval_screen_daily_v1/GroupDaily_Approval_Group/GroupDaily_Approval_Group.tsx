

'use client'
import React,{ useEffect, useState,useContext, useRef } from 'react';
import { AxiosService } from '@/app/components/axiosService';
import { uf_authorizationCheckDto } from '@/app/interfaces/interfaces';
import { codeExecution } from '@/app/utils/codeExecution';
import { useRouter } from 'next/navigation';
import { getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { Button } from '@/components/Button';
import { Text } from '@/components/Text';
import { Icon } from '@/components/Icon';
import { Modal } from '@/components/Modal';
import { eventBus } from '@/app/eventBus';
import clsx from "clsx";
import { useHandleDfdRefresh } from '@/context/dfdRefreshContext';
import { CommonHeaderAndTooltip } from '@/components/CommonHeaderAndTooltip';
import Textdaily_expenses  from "./Textdaily_expenses";
import TextInputexpense_name  from "./TextInputexpense_name";
import DatePickerexpense_date  from "./DatePickerexpense_date";
import TextInputclaim_category  from "./TextInputclaim_category";
import TextInputcategory_total_amount  from "./TextInputcategory_total_amount";
import DocumentViewerreceipt_image  from "./DocumentViewerreceipt_image";
import TextAreacomments  from "./TextAreacomments";
import TextAreamanager_comments  from "./TextAreamanager_comments";
import TextENABLE  from "./TextENABLE";
import Switchis_comment_enabled  from "./Switchis_comment_enabled";
import ButtonReject  from "./ButtonReject";
import ButtonApprove  from "./ButtonApprove";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const GroupDaily_Approval_Group = ({lockedData={},setLockedData,primaryTableData={}, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,dropdownData,setDropdownData,paginationDetails,encryptionFlagPageData, nodeData, setNodeData,isFormOpen=false}:any) => {
  const token:string = getCookie('token'); 
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const handleDfdRefresh = useHandleDfdRefresh();
  const code:any = ``;
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
  const securityData:any={
  "Template 1": {
    "allowedControls": [
      "daily_expenses",
      "expense_name",
      "expense_date",
      "claim_category",
      "category_total_amount",
      "receipt_image",
      "comments",
      "manager_comments",
      "enable",
      "is_comment_enabled",
      "reject",
      "approve"
    ],
    "allowedGroups": [
      "canvas",
      "daily_approval_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Employee": {
    "allowedControls": [
      "enable",
      "is_comment_enabled"
    ],
    "allowedGroups": [],
    "blockedControls": [
      "daily_expenses",
      "expense_name",
      "expense_date",
      "claim_category",
      "category_total_amount",
      "receipt_image",
      "comments",
      "manager_comments",
      "reject",
      "approve"
    ],
    "readOnlyControls": []
  },
  "Manager": {
    "allowedControls": [
      "daily_expenses",
      "expense_name",
      "expense_date",
      "claim_category",
      "category_total_amount",
      "receipt_image",
      "comments",
      "manager_comments",
      "enable",
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
      "daily_expenses",
      "expense_name",
      "expense_date",
      "claim_category",
      "category_total_amount",
      "comments"
    ]
  }
};
  const prevRefreshRef = useRef(false);
  const [allowedComponent,setAllowedComponent]=useState<any>("");
  const toast=useInfoMsg();
  const confirmMsgFlag: boolean = false;
  const [allCode,setAllCode]=useState<any>("");
  const routes = useRouter();
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState(false);
  const [ButtonGoRuleData,setButtonGoRuleData]=useState<any>({})
 /////////////
   //another screen
  const {daily_approval_group69531, setdaily_approval_group69531}= useContext(TotalContext) as TotalContextProps;
  const {daily_approval_group69531Props, setdaily_approval_group69531Props}= useContext(TotalContext) as TotalContextProps;
  const {daily_expenses89868, setdaily_expenses89868}= useContext(TotalContext) as TotalContextProps;
  const {expense_name88ccc, setexpense_name88ccc}= useContext(TotalContext) as TotalContextProps;
  const {expense_datee8c94, setexpense_datee8c94}= useContext(TotalContext) as TotalContextProps;
  const {claim_category46dd0, setclaim_category46dd0}= useContext(TotalContext) as TotalContextProps;
  const {category_total_amountcf2e2, setcategory_total_amountcf2e2}= useContext(TotalContext) as TotalContextProps;
  const {receipt_image33fd1, setreceipt_image33fd1}= useContext(TotalContext) as TotalContextProps;
  const {comments9336d, setcomments9336d}= useContext(TotalContext) as TotalContextProps;
  const {manager_commentsd309a, setmanager_commentsd309a}= useContext(TotalContext) as TotalContextProps;
  const {enable666c8, setenable666c8}= useContext(TotalContext) as TotalContextProps;
  const {is_comment_enablede20a4, setis_comment_enablede20a4}= useContext(TotalContext) as TotalContextProps;
  const {reject28a4c, setreject28a4c}= useContext(TotalContext) as TotalContextProps;
  const {approve28765, setapprove28765}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [open, setOpen] = React.useState(false);
  async function securityCheck() {
  /////////////
    if(securityData[accessProfile]?.['readOnlyControls'].includes("daily_expenses")){
      setdaily_expenses89868({...daily_expenses89868,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("expense_name")){
      setexpense_name88ccc({...expense_name88ccc,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("expense_date")){
      setexpense_datee8c94({...expense_datee8c94,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("claim_category")){
      setclaim_category46dd0({...claim_category46dd0,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("category_total_amount")){
      setcategory_total_amountcf2e2({...category_total_amountcf2e2,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("receipt_image")){
      setreceipt_image33fd1({...receipt_image33fd1,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("comments")){
      setcomments9336d({...comments9336d,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("manager_comments")){
      setmanager_commentsd309a({...manager_commentsd309a,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("enable")){
      setenable666c8({...enable666c8,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("is_comment_enabled")){
      setis_comment_enablede20a4({...is_comment_enablede20a4,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("reject")){
      setreject28a4c({...reject28a4c,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("approve")){
      setapprove28765({...approve28765,isDisabled:true});
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
      codeStates['daily_approval_group']  = daily_approval_group69531,
      codeStates['setdaily_approval_group'] = setdaily_approval_group69531,

    codeExecution(code,codeStates);
    } 
  }


    const handleOnload=()=>{
  }
  const handleOnChange=()=>{

  }
  const daily_approval_group69531Ref = useRef<any>(null);
  const handleClearSearch = () => {
    daily_approval_group69531Ref.current?.setSearchParams();
    daily_approval_group69531Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(daily_approval_group69531) && Object.keys(daily_approval_group69531)?.length>0)
      {
        setdaily_approval_group69531({})
      }
    }else 
      prevRefreshRef.current= true
  }, [daily_approval_group69531Props?.refresh])

  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '1 / 235',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '0px',
        backgroundImage:"url('')",
        backgroundColor:'',
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
      className={`flex flex-col overflow-auto rounded-md ${isDark ? 'text-white' : 'text-black'}`}
    >
          {securityData[accessProfile].allowedControls.includes("daily_expenses") ?<Textdaily_expenses   /* 89868 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {securityData[accessProfile].allowedControls.includes("expense_name") ?<TextInputexpense_name   /* 88ccc */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {securityData[accessProfile].allowedControls.includes("expense_date") ?<DatePickerexpense_date   /* e8c94 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {securityData[accessProfile].allowedControls.includes("claim_category") ?<TextInputclaim_category   /* 46dd0 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {securityData[accessProfile].allowedControls.includes("category_total_amount") ?<TextInputcategory_total_amount   /* cf2e2 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {securityData[accessProfile].allowedControls.includes("receipt_image") ?<DocumentViewerreceipt_image   /* 33fd1 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {securityData[accessProfile].allowedControls.includes("comments") ?<TextAreacomments   /* 9336d */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData}/>: <div></div>}
        {securityData[accessProfile].allowedControls.includes("manager_comments") ?<TextAreamanager_comments   /* d309a */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData}/>: <div></div>}
          {securityData[accessProfile].allowedControls.includes("enable") ?<TextENABLE   /* 666c8 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {securityData[accessProfile].allowedControls.includes("is_comment_enabled")?<Switchis_comment_enabled  /* e20a4 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {        (("reject" in ButtonGoRuleData)?ButtonGoRuleData["reject"]:true) && 
          securityData[accessProfile].allowedControls.includes("reject")  ?            <ButtonReject lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData}/>: <div></div>} 
        {        (("approve" in ButtonGoRuleData)?ButtonGoRuleData["approve"]:true) && 
          securityData[accessProfile].allowedControls.includes("approve")  ?            <ButtonApprove lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData}/>: <div></div>} 
    </div>
 )
}

export default GroupDaily_Approval_Group
