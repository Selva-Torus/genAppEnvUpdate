

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
import Textdaily_expense  from "./Textdaily_expense";
import TextInputclaim_expense_type  from "./TextInputclaim_expense_type";
import TextInputexpense_name  from "./TextInputexpense_name";
import DatePickerexpense_date  from "./DatePickerexpense_date";
import Dropdownclaim_category  from "./Dropdownclaim_category";
import TextInputcategory_total_amount  from "./TextInputcategory_total_amount";
import Textattachment  from "./Textattachment";
import Documentuploaderreceipt_image  from "./Documentuploaderreceipt_image";
import TextAreacomments  from "./TextAreacomments";
import Textenabletext  from "./Textenabletext";
import Switchis_comment_enabled  from "./Switchis_comment_enabled";
import ButtonClear  from "./ButtonClear";
import ButtonSave  from "./ButtonSave";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Grouprequest_daily_group = ({lockedData={},setLockedData,primaryTableData={}, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,dropdownData,setDropdownData,paginationDetails,encryptionFlagPageData, nodeData, setNodeData,isFormOpen=false}:any) => {
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
  const securityData:any={
  "Template 1": {
    "allowedControls": [
      "daily_expense",
      "claim_expense_type",
      "expense_name",
      "expense_date",
      "claim_category",
      "category_total_amount",
      "attachment",
      "receipt_image",
      "comments",
      "enabletext",
      "is_comment_enabled",
      "clear",
      "save"
    ],
    "allowedGroups": [
      "canvas",
      "request_daily_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Employee": {
    "allowedControls": [
      "daily_expense",
      "expense_name",
      "expense_date",
      "claim_category",
      "category_total_amount",
      "attachment",
      "receipt_image",
      "comments",
      "enabletext",
      "is_comment_enabled",
      "clear",
      "save"
    ],
    "allowedGroups": [
      "canvas",
      "request_daily_group"
    ],
    "blockedControls": [
      "claim_expense_type"
    ],
    "readOnlyControls": []
  },
  "Manager": {
    "allowedControls": [
      "is_comment_enabled"
    ],
    "allowedGroups": [],
    "blockedControls": [
      "daily_expense",
      "claim_expense_type",
      "expense_name",
      "expense_date",
      "claim_category",
      "category_total_amount",
      "attachment",
      "receipt_image",
      "comments",
      "enabletext",
      "clear",
      "save"
    ],
    "readOnlyControls": []
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
  const {request_daily_group44e40, setrequest_daily_group44e40}= useContext(TotalContext) as TotalContextProps;
  const {request_daily_group44e40Props, setrequest_daily_group44e40Props}= useContext(TotalContext) as TotalContextProps;
  const {daily_expensefb8cc, setdaily_expensefb8cc}= useContext(TotalContext) as TotalContextProps;
  const {claim_expense_type22d67, setclaim_expense_type22d67}= useContext(TotalContext) as TotalContextProps;
  const {expense_name5f562, setexpense_name5f562}= useContext(TotalContext) as TotalContextProps;
  const {expense_date5f45e, setexpense_date5f45e}= useContext(TotalContext) as TotalContextProps;
  const {claim_categoryc7c5e, setclaim_categoryc7c5e}= useContext(TotalContext) as TotalContextProps;
  const {category_total_amount9782f, setcategory_total_amount9782f}= useContext(TotalContext) as TotalContextProps;
  const {attachment04414, setattachment04414}= useContext(TotalContext) as TotalContextProps;
  const {receipt_image6afe2, setreceipt_image6afe2}= useContext(TotalContext) as TotalContextProps;
  const {commentsf2394, setcommentsf2394}= useContext(TotalContext) as TotalContextProps;
  const {enabletextb4878, setenabletextb4878}= useContext(TotalContext) as TotalContextProps;
  const {is_comment_enabled7244d, setis_comment_enabled7244d}= useContext(TotalContext) as TotalContextProps;
  const {clear14ae7, setclear14ae7}= useContext(TotalContext) as TotalContextProps;
  const {saved507e, setsaved507e}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [open, setOpen] = React.useState(false);
  async function securityCheck() {
  /////////////
    if(securityData[accessProfile]?.['readOnlyControls'].includes("daily_expense")){
      setdaily_expensefb8cc({...daily_expensefb8cc,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("claim_expense_type")){
      setclaim_expense_type22d67({...claim_expense_type22d67,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("expense_name")){
      setexpense_name5f562({...expense_name5f562,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("expense_date")){
      setexpense_date5f45e({...expense_date5f45e,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("claim_category")){
      setclaim_categoryc7c5e({...claim_categoryc7c5e,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("category_total_amount")){
      setcategory_total_amount9782f({...category_total_amount9782f,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("attachment")){
      setattachment04414({...attachment04414,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("receipt_image")){
      setreceipt_image6afe2({...receipt_image6afe2,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("comments")){
      setcommentsf2394({...commentsf2394,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("enabletext")){
      setenabletextb4878({...enabletextb4878,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("is_comment_enabled")){
      setis_comment_enabled7244d({...is_comment_enabled7244d,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("clear")){
      setclear14ae7({...clear14ae7,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("save")){
      setsaved507e({...saved507e,isDisabled:true});
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
      codeStates['request_daily_group']  = request_daily_group44e40,
      codeStates['setrequest_daily_group'] = setrequest_daily_group44e40,

    codeExecution(code,codeStates);
    } 
  }


    const handleOnload=()=>{
  }
  const handleOnChange=()=>{

  }
  const request_daily_group44e40Ref = useRef<any>(null);
  const handleClearSearch = () => {
    request_daily_group44e40Ref.current?.setSearchParams();
    request_daily_group44e40Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(request_daily_group44e40) && Object.keys(request_daily_group44e40)?.length>0)
      {
        setrequest_daily_group44e40({})
      }
    }else 
      prevRefreshRef.current= true
  }, [request_daily_group44e40Props?.refresh])

  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '1 / 210',
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
          {securityData[accessProfile].allowedControls.includes("daily_expense") ?<Textdaily_expense   /* fb8cc */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {securityData[accessProfile].allowedControls.includes("claim_expense_type") ?<TextInputclaim_expense_type   /* 22d67 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {securityData[accessProfile].allowedControls.includes("expense_name") ?<TextInputexpense_name   /* 5f562 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {securityData[accessProfile].allowedControls.includes("expense_date") ?<DatePickerexpense_date   /* 5f45e */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {securityData[accessProfile].allowedControls.includes("claim_category") ?<Dropdownclaim_category   /* c7c5e */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} dropdownData={dropdownData} setDropdownData={setDropdownData} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {securityData[accessProfile].allowedControls.includes("category_total_amount") ?<TextInputcategory_total_amount   /* 9782f */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
          {securityData[accessProfile].allowedControls.includes("attachment") ?<Textattachment   /* 04414 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {securityData[accessProfile].allowedControls.includes("receipt_image") ?<Documentuploaderreceipt_image   /* 6afe2 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {securityData[accessProfile].allowedControls.includes("comments") ?<TextAreacomments   /* f2394 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData}/>: <div></div>}
          {securityData[accessProfile].allowedControls.includes("enabletext") ?<Textenabletext   /* b4878 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {securityData[accessProfile].allowedControls.includes("is_comment_enabled")?<Switchis_comment_enabled  /* 7244d */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {        (("clear" in ButtonGoRuleData)?ButtonGoRuleData["clear"]:true) && 
          securityData[accessProfile].allowedControls.includes("clear")  ?            <ButtonClear lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData}/>: <div></div>} 
        {        (("save" in ButtonGoRuleData)?ButtonGoRuleData["save"]:true) && 
          securityData[accessProfile].allowedControls.includes("save")  ?            <ButtonSave lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData}/>: <div></div>} 
    </div>
 )
}

export default Grouprequest_daily_group
