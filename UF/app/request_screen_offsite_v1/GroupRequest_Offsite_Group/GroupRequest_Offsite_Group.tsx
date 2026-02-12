

'use client'
import React,{ useEffect, useState,useContext, useRef } from 'react';
import { AxiosService } from '@/app/components/axiosService';
import { uf_authorizationCheckDto } from '@/app/interfaces/interfaces';
import { codeExecution } from '@/app/utils/codeExecution';
import { useRouter } from 'next/navigation';
import { getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import Groupclaims_detail_table  from "../Groupclaims_detail_table/Groupclaims_detail_table";
import { Button } from '@/components/Button';
import { Text } from '@/components/Text';
import { Icon } from '@/components/Icon';
import { Modal } from '@/components/Modal';
import { eventBus } from '@/app/eventBus';
import clsx from "clsx";
import { useHandleDfdRefresh } from '@/context/dfdRefreshContext';
import { CommonHeaderAndTooltip } from '@/components/CommonHeaderAndTooltip';
import Textoffsite_expense  from "./Textoffsite_expense";
import TextInputclaim_expense_type  from "./TextInputclaim_expense_type";
import TextInputexpense_name  from "./TextInputexpense_name";
import DatePickerfrom_date  from "./DatePickerfrom_date";
import DatePickerto_date  from "./DatePickerto_date";
import Dropdownclaim_category  from "./Dropdownclaim_category";
import TextInputcategory_total_amount  from "./TextInputcategory_total_amount";
import Textattachment  from "./Textattachment";
import Documentuploaderreceipt_image  from "./Documentuploaderreceipt_image";
import TextAreacomments  from "./TextAreacomments";
import Textenable  from "./Textenable";
import Switchis_comment_enabled  from "./Switchis_comment_enabled";
import ButtonClear  from "./ButtonClear";
import ButtonAdd  from "./ButtonAdd";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const GroupRequest_Offsite_Group = ({lockedData={},setLockedData,primaryTableData={}, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,dropdownData,setDropdownData,paginationDetails,encryptionFlagPageData, nodeData, setNodeData,isFormOpen=false}:any) => {
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
  const securityData:any={
  "Template 1": {
    "allowedControls": [
      "offsite_expense",
      "claim_expense_type",
      "expense_name",
      "from_date",
      "to_date",
      "claim_category",
      "category_total_amount",
      "attachment",
      "receipt_image",
      "comments",
      "enable",
      "is_comment_enabled",
      "clear",
      "add"
    ],
    "allowedGroups": [
      "canvas",
      "request_offsite_group",
      "claims_detail_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Employee": {
    "allowedControls": [
      "offsite_expense",
      "expense_name",
      "from_date",
      "to_date",
      "claim_category",
      "category_total_amount",
      "attachment",
      "receipt_image",
      "comments",
      "enable",
      "is_comment_enabled",
      "clear",
      "add"
    ],
    "allowedGroups": [
      "canvas",
      "request_offsite_group",
      "claims_detail_table"
    ],
    "blockedControls": [
      "claim_expense_type"
    ],
    "readOnlyControls": []
  },
  "Manager": {
    "allowedControls": [
      "attachment",
      "enable",
      "is_comment_enabled"
    ],
    "allowedGroups": [],
    "blockedControls": [
      "offsite_expense",
      "claim_expense_type",
      "expense_name",
      "from_date",
      "to_date",
      "claim_category",
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
  const {request_offsite_group429cb, setrequest_offsite_group429cb}= useContext(TotalContext) as TotalContextProps;
  const {request_offsite_group429cbProps, setrequest_offsite_group429cbProps}= useContext(TotalContext) as TotalContextProps;
  const {offsite_expense39c39, setoffsite_expense39c39}= useContext(TotalContext) as TotalContextProps;
  const {claim_expense_type51f6e, setclaim_expense_type51f6e}= useContext(TotalContext) as TotalContextProps;
  const {expense_namebf755, setexpense_namebf755}= useContext(TotalContext) as TotalContextProps;
  const {from_date6f9c3, setfrom_date6f9c3}= useContext(TotalContext) as TotalContextProps;
  const {to_date6db82, setto_date6db82}= useContext(TotalContext) as TotalContextProps;
  const {claim_categorya4a14, setclaim_categorya4a14}= useContext(TotalContext) as TotalContextProps;
  const {category_total_amounte603b, setcategory_total_amounte603b}= useContext(TotalContext) as TotalContextProps;
  const {attachmentc9c51, setattachmentc9c51}= useContext(TotalContext) as TotalContextProps;
  const {receipt_imageafe30, setreceipt_imageafe30}= useContext(TotalContext) as TotalContextProps;
  const {comments65b18, setcomments65b18}= useContext(TotalContext) as TotalContextProps;
  const {enableeff29, setenableeff29}= useContext(TotalContext) as TotalContextProps;
  const {is_comment_enabled5ca5f, setis_comment_enabled5ca5f}= useContext(TotalContext) as TotalContextProps;
  const {clear2b3e6, setclear2b3e6}= useContext(TotalContext) as TotalContextProps;
  const {add5cae4, setadd5cae4}= useContext(TotalContext) as TotalContextProps;
  const {claims_detail_tablef8143, setclaims_detail_tablef8143}= useContext(TotalContext) as TotalContextProps;
  const {claims_detail_tablef8143Props, setclaims_detail_tablef8143Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [open, setOpen] = React.useState(false);
  async function securityCheck() {
  /////////////
    if(securityData[accessProfile]?.['readOnlyControls'].includes("offsite_expense")){
      setoffsite_expense39c39({...offsite_expense39c39,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("claim_expense_type")){
      setclaim_expense_type51f6e({...claim_expense_type51f6e,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("expense_name")){
      setexpense_namebf755({...expense_namebf755,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("from_date")){
      setfrom_date6f9c3({...from_date6f9c3,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("to_date")){
      setto_date6db82({...to_date6db82,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("claim_category")){
      setclaim_categorya4a14({...claim_categorya4a14,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("category_total_amount")){
      setcategory_total_amounte603b({...category_total_amounte603b,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("attachment")){
      setattachmentc9c51({...attachmentc9c51,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("receipt_image")){
      setreceipt_imageafe30({...receipt_imageafe30,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("comments")){
      setcomments65b18({...comments65b18,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("enable")){
      setenableeff29({...enableeff29,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("is_comment_enabled")){
      setis_comment_enabled5ca5f({...is_comment_enabled5ca5f,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("clear")){
      setclear2b3e6({...clear2b3e6,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("add")){
      setadd5cae4({...add5cae4,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("claims_detail_table")){
      setclaims_detail_tablef8143({...claims_detail_tablef8143,isDisabled:true});
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
      codeStates['request_offsite_group']  = request_offsite_group429cb,
      codeStates['setrequest_offsite_group'] = setrequest_offsite_group429cb,
      codeStates['claims_detail_table']  = claims_detail_tablef8143,
      codeStates['setclaims_detail_table'] = setclaims_detail_tablef8143,

    codeExecution(code,codeStates);
    } 
  }


    const handleOnload=()=>{
  }
  const handleOnChange=()=>{

  }
  const request_offsite_group429cbRef = useRef<any>(null);
  const handleClearSearch = () => {
    request_offsite_group429cbRef.current?.setSearchParams();
    request_offsite_group429cbRef.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(request_offsite_group429cb) && Object.keys(request_offsite_group429cb)?.length>0)
      {
        setrequest_offsite_group429cb({})
      }
    }else 
      prevRefreshRef.current= true
  }, [request_offsite_group429cbProps?.refresh])

  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '3 / 402',
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
        {securityData[accessProfile]?.allowedGroups?.includes("claims_detail_table")  &&<Groupclaims_detail_table  
          lockedData={lockedData} 
          setLockedData={setLockedData} 
          primaryTableData={primaryTableData}
          setPrimaryTableData={setPrimaryTableData}
          checkToAdd={checkToAdd} 
          setCheckToAdd={setCheckToAdd}  
          refetch={refetch}
          setRefetch={setRefetch}
          dropdownData={dropdownData} 
          setDropdownData={setDropdownData}
          encryptionFlagPageData={encryptionFlagPageData}
          paginationDetails={paginationDetails}
        />}
          {securityData[accessProfile].allowedControls.includes("offsite_expense") ?<Textoffsite_expense   /* 39c39 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {securityData[accessProfile].allowedControls.includes("claim_expense_type") ?<TextInputclaim_expense_type   /* 51f6e */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {securityData[accessProfile].allowedControls.includes("expense_name") ?<TextInputexpense_name   /* bf755 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {securityData[accessProfile].allowedControls.includes("from_date") ?<DatePickerfrom_date   /* 6f9c3 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {securityData[accessProfile].allowedControls.includes("to_date") ?<DatePickerto_date   /* 6db82 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {securityData[accessProfile].allowedControls.includes("claim_category") ?<Dropdownclaim_category   /* a4a14 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} dropdownData={dropdownData} setDropdownData={setDropdownData} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {securityData[accessProfile].allowedControls.includes("category_total_amount") ?<TextInputcategory_total_amount   /* e603b */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
          {securityData[accessProfile].allowedControls.includes("attachment") ?<Textattachment   /* c9c51 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {securityData[accessProfile].allowedControls.includes("receipt_image") ?<Documentuploaderreceipt_image   /* afe30 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {securityData[accessProfile].allowedControls.includes("comments") ?<TextAreacomments   /* 65b18 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData}/>: <div></div>}
          {securityData[accessProfile].allowedControls.includes("enable") ?<Textenable   /* eff29 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {securityData[accessProfile].allowedControls.includes("is_comment_enabled")?<Switchis_comment_enabled  /* 5ca5f */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {        (("clear" in ButtonGoRuleData)?ButtonGoRuleData["clear"]:true) && 
          securityData[accessProfile].allowedControls.includes("clear")  ?            <ButtonClear lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData}/>: <div></div>} 
        {        (("add" in ButtonGoRuleData)?ButtonGoRuleData["add"]:true) && 
          securityData[accessProfile].allowedControls.includes("add")  ?            <ButtonAdd lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData}/>: <div></div>} 
    </div>
 )
}

export default GroupRequest_Offsite_Group
