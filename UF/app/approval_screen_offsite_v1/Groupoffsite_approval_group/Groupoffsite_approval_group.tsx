

'use client'
import React,{ useEffect, useState,useContext, useRef } from 'react';
import { AxiosService } from '@/app/components/axiosService';
import { uf_authorizationCheckDto } from '@/app/interfaces/interfaces';
import { codeExecution } from '@/app/utils/codeExecution';
import { useRouter } from 'next/navigation';
import { getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import Groupclaim_detail_table  from "../Groupclaim_detail_table/Groupclaim_detail_table";
import { Button } from '@/components/Button';
import { Text } from '@/components/Text';
import { Icon } from '@/components/Icon';
import { Modal } from '@/components/Modal';
import { eventBus } from '@/app/eventBus';
import clsx from "clsx";
import { useHandleDfdRefresh } from '@/context/dfdRefreshContext';
import { CommonHeaderAndTooltip } from '@/components/CommonHeaderAndTooltip';
import Textoffsite_expense  from "./Textoffsite_expense";
import TextInputexpense_name  from "./TextInputexpense_name";
import DatePickerfrom_date  from "./DatePickerfrom_date";
import DatePickerto_date  from "./DatePickerto_date";
import TextInputclaim_category  from "./TextInputclaim_category";
import TextInputcategory_total_amount  from "./TextInputcategory_total_amount";
import DocumentViewerreceipt_image  from "./DocumentViewerreceipt_image";
import TextAreacomments  from "./TextAreacomments";
import TextAreamanager_comments  from "./TextAreamanager_comments";
import TextEnable  from "./TextEnable";
import Switchis_comment_enabled  from "./Switchis_comment_enabled";
import ButtonReject  from "./ButtonReject";
import ButtonApprove  from "./ButtonApprove";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupoffsite_approval_group = ({lockedData={},setLockedData,primaryTableData={}, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,dropdownData,setDropdownData,paginationDetails,encryptionFlagPageData, nodeData, setNodeData,isFormOpen=false}:any) => {
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
      "expense_name",
      "from_date",
      "to_date",
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
      "canvas"
    ],
    "blockedControls": [],
    "readOnlyControls": [
      "offsite_expense",
      "expense_name",
      "from_date",
      "to_date",
      "claim_category",
      "category_total_amount",
      "receipt_image",
      "comments",
      "manager_comments",
      "reject",
      "approve"
    ]
  },
  "Employee": {
    "allowedControls": [
      "enable",
      "is_comment_enabled"
    ],
    "allowedGroups": [],
    "blockedControls": [
      "offsite_expense",
      "expense_name",
      "from_date",
      "to_date",
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
      "offsite_expense",
      "expense_name",
      "from_date",
      "to_date",
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
      "offsite_approval_group",
      "claim_detail_table"
    ],
    "blockedControls": [],
    "readOnlyControls": [
      "offsite_expense",
      "expense_name",
      "from_date",
      "to_date",
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
  const {offsite_approval_group8d6cc, setoffsite_approval_group8d6cc}= useContext(TotalContext) as TotalContextProps;
  const {offsite_approval_group8d6ccProps, setoffsite_approval_group8d6ccProps}= useContext(TotalContext) as TotalContextProps;
  const {offsite_expense4be82, setoffsite_expense4be82}= useContext(TotalContext) as TotalContextProps;
  const {expense_name084c7, setexpense_name084c7}= useContext(TotalContext) as TotalContextProps;
  const {from_dated8c1b, setfrom_dated8c1b}= useContext(TotalContext) as TotalContextProps;
  const {to_date0c15a, setto_date0c15a}= useContext(TotalContext) as TotalContextProps;
  const {claim_categoryac401, setclaim_categoryac401}= useContext(TotalContext) as TotalContextProps;
  const {category_total_amountdd7c0, setcategory_total_amountdd7c0}= useContext(TotalContext) as TotalContextProps;
  const {receipt_image3968d, setreceipt_image3968d}= useContext(TotalContext) as TotalContextProps;
  const {commentse0ef7, setcommentse0ef7}= useContext(TotalContext) as TotalContextProps;
  const {manager_comments4bec2, setmanager_comments4bec2}= useContext(TotalContext) as TotalContextProps;
  const {enabled5c19, setenabled5c19}= useContext(TotalContext) as TotalContextProps;
  const {is_comment_enabledf9731, setis_comment_enabledf9731}= useContext(TotalContext) as TotalContextProps;
  const {claim_detail_table1835f, setclaim_detail_table1835f}= useContext(TotalContext) as TotalContextProps;
  const {claim_detail_table1835fProps, setclaim_detail_table1835fProps}= useContext(TotalContext) as TotalContextProps;
  const {reject74228, setreject74228}= useContext(TotalContext) as TotalContextProps;
  const {approve098ea, setapprove098ea}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [open, setOpen] = React.useState(false);
  async function securityCheck() {
  /////////////
    if(securityData[accessProfile]?.['readOnlyControls'].includes("offsite_expense")){
      setoffsite_expense4be82({...offsite_expense4be82,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("expense_name")){
      setexpense_name084c7({...expense_name084c7,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("from_date")){
      setfrom_dated8c1b({...from_dated8c1b,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("to_date")){
      setto_date0c15a({...to_date0c15a,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("claim_category")){
      setclaim_categoryac401({...claim_categoryac401,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("category_total_amount")){
      setcategory_total_amountdd7c0({...category_total_amountdd7c0,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("receipt_image")){
      setreceipt_image3968d({...receipt_image3968d,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("comments")){
      setcommentse0ef7({...commentse0ef7,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("manager_comments")){
      setmanager_comments4bec2({...manager_comments4bec2,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("enable")){
      setenabled5c19({...enabled5c19,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("is_comment_enabled")){
      setis_comment_enabledf9731({...is_comment_enabledf9731,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("claim_detail_table")){
      setclaim_detail_table1835f({...claim_detail_table1835f,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("reject")){
      setreject74228({...reject74228,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("approve")){
      setapprove098ea({...approve098ea,isDisabled:true});
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
      codeStates['offsite_approval_group']  = offsite_approval_group8d6cc,
      codeStates['setoffsite_approval_group'] = setoffsite_approval_group8d6cc,
      codeStates['claim_detail_table']  = claim_detail_table1835f,
      codeStates['setclaim_detail_table'] = setclaim_detail_table1835f,

    codeExecution(code,codeStates);
    } 
  }


    const handleOnload=()=>{
  }
  const handleOnChange=()=>{

  }
  const offsite_approval_group8d6ccRef = useRef<any>(null);
  const handleClearSearch = () => {
    offsite_approval_group8d6ccRef.current?.setSearchParams();
    offsite_approval_group8d6ccRef.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(offsite_approval_group8d6cc) && Object.keys(offsite_approval_group8d6cc)?.length>0)
      {
        setoffsite_approval_group8d6cc({})
      }
    }else 
      prevRefreshRef.current= true
  }, [offsite_approval_group8d6ccProps?.refresh])

  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '3 / 378',
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
        {securityData[accessProfile]?.allowedGroups?.includes("claim_detail_table")  &&<Groupclaim_detail_table  
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
          {securityData[accessProfile].allowedControls.includes("offsite_expense") ?<Textoffsite_expense   /* 4be82 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {securityData[accessProfile].allowedControls.includes("expense_name") ?<TextInputexpense_name   /* 084c7 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {securityData[accessProfile].allowedControls.includes("from_date") ?<DatePickerfrom_date   /* d8c1b */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {securityData[accessProfile].allowedControls.includes("to_date") ?<DatePickerto_date   /* 0c15a */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {securityData[accessProfile].allowedControls.includes("claim_category") ?<TextInputclaim_category   /* ac401 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {securityData[accessProfile].allowedControls.includes("category_total_amount") ?<TextInputcategory_total_amount   /* dd7c0 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {securityData[accessProfile].allowedControls.includes("receipt_image") ?<DocumentViewerreceipt_image   /* 3968d */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {securityData[accessProfile].allowedControls.includes("comments") ?<TextAreacomments   /* e0ef7 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData}/>: <div></div>}
        {securityData[accessProfile].allowedControls.includes("manager_comments") ?<TextAreamanager_comments   /* 4bec2 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData}/>: <div></div>}
          {securityData[accessProfile].allowedControls.includes("enable") ?<TextEnable   /* d5c19 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {securityData[accessProfile].allowedControls.includes("is_comment_enabled")?<Switchis_comment_enabled  /* f9731 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {        (("reject" in ButtonGoRuleData)?ButtonGoRuleData["reject"]:true) && 
          securityData[accessProfile].allowedControls.includes("reject")  ?            <ButtonReject lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData}/>: <div></div>} 
        {        (("approve" in ButtonGoRuleData)?ButtonGoRuleData["approve"]:true) && 
          securityData[accessProfile].allowedControls.includes("approve")  ?            <ButtonApprove lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData}/>: <div></div>} 
    </div>
 )
}

export default Groupoffsite_approval_group
