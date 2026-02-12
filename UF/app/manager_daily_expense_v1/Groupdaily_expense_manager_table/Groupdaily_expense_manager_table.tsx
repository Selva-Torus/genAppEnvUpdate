

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
import Tabledaily_expense_manager_table  from './Tabledaily_expense_manager_table';  
import ButtonReject  from "./ButtonReject";
import ButtonApprove  from "./ButtonApprove";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupdaily_expense_manager_table = ({lockedData={},setLockedData,primaryTableData={}, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,dropdownData,setDropdownData,paginationDetails,encryptionFlagPageData, nodeData, setNodeData,isFormOpen=false}:any) => {
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
  const securityData:any={
  "Template 1": {
    "allowedControls": [],
    "allowedGroups": [],
    "blockedControls": [
      "claim_id",
      "trs_created_by",
      "expense_name",
      "claim_category",
      "category_total_amount",
      "expense_date",
      "trs_status",
      "reject",
      "approve"
    ],
    "readOnlyControls": []
  },
  "Employee": {
    "allowedControls": [],
    "allowedGroups": [],
    "blockedControls": [
      "claim_id",
      "trs_created_by",
      "expense_name",
      "claim_category",
      "category_total_amount",
      "expense_date",
      "trs_status",
      "reject",
      "approve"
    ],
    "readOnlyControls": []
  },
  "Manager": {
    "allowedControls": [
      "claim_id",
      "trs_created_by",
      "expense_name",
      "claim_category",
      "category_total_amount",
      "expense_date",
      "trs_status",
      "reject",
      "approve"
    ],
    "allowedGroups": [
      "canvas",
      "grp",
      "daily_expense_manager_table"
    ],
    "blockedControls": [],
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
  const {grp63e95, setgrp63e95}= useContext(TotalContext) as TotalContextProps;
  const {grp63e95Props, setgrp63e95Props}= useContext(TotalContext) as TotalContextProps;
  const {daily_expense_manager_tablee3342, setdaily_expense_manager_tablee3342}= useContext(TotalContext) as TotalContextProps;
  const {daily_expense_manager_tablee3342Props, setdaily_expense_manager_tablee3342Props}= useContext(TotalContext) as TotalContextProps;
  const {claim_id7ec53, setclaim_id7ec53}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_by1f8f9, settrs_created_by1f8f9}= useContext(TotalContext) as TotalContextProps;
  const {expense_name78eca, setexpense_name78eca}= useContext(TotalContext) as TotalContextProps;
  const {claim_category8466d, setclaim_category8466d}= useContext(TotalContext) as TotalContextProps;
  const {category_total_amount22435, setcategory_total_amount22435}= useContext(TotalContext) as TotalContextProps;
  const {expense_date20458, setexpense_date20458}= useContext(TotalContext) as TotalContextProps;
  const {trs_status9f4b4, settrs_status9f4b4}= useContext(TotalContext) as TotalContextProps;
  const {reject4d3f0, setreject4d3f0}= useContext(TotalContext) as TotalContextProps;
  const {approve819e1, setapprove819e1}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [open, setOpen] = React.useState(false);
  async function securityCheck() {
  /////////////
    if(securityData[accessProfile]?.['readOnlyControls'].includes("claim_id")){
      setclaim_id7ec53({...claim_id7ec53,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("trs_created_by")){
      settrs_created_by1f8f9({...trs_created_by1f8f9,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("expense_name")){
      setexpense_name78eca({...expense_name78eca,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("claim_category")){
      setclaim_category8466d({...claim_category8466d,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("category_total_amount")){
      setcategory_total_amount22435({...category_total_amount22435,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("expense_date")){
      setexpense_date20458({...expense_date20458,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("trs_status")){
      settrs_status9f4b4({...trs_status9f4b4,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("reject")){
      setreject4d3f0({...reject4d3f0,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("approve")){
      setapprove819e1({...approve819e1,isDisabled:true});
    }
  //////////////
  }


    const handleOnload=()=>{
  }
  const handleOnChange=()=>{

  }
  const daily_expense_manager_tablee3342Ref = useRef<any>(null);
  const handleClearSearch = () => {
    daily_expense_manager_tablee3342Ref.current?.setSearchParams();
    daily_expense_manager_tablee3342Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(daily_expense_manager_tablee3342) && Object.keys(daily_expense_manager_tablee3342)?.length>0)
      {
        setdaily_expense_manager_tablee3342({})
      }
    }else 
      prevRefreshRef.current= true
  }, [daily_expense_manager_tablee3342Props?.refresh])

  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '11 / 121',
        overflow: 'visible',
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
        <CommonHeaderAndTooltip
        >
        <div className='flex flex-col h-full'>
        <div
          className='flex flex-shrink-0 justify-end gap-1 p-2 h-[60px]'>
        {        (("reject" in ButtonGoRuleData)?ButtonGoRuleData["reject"]:true) && 
          securityData[accessProfile].allowedControls.includes("reject")  ?          <div className="w-[10%]"><ButtonReject lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData}/></div>: <div></div>} 
        {        (("approve" in ButtonGoRuleData)?ButtonGoRuleData["approve"]:true) && 
          securityData[accessProfile].allowedControls.includes("approve")  ?          <div className="w-[10%]"><ButtonApprove lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData}/></div>: <div></div>} 
      </div>
          <div className=' flex flex-1 w-full min-h-0  '>
        {<Tabledaily_expense_manager_table lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} open={open} setOpen={setOpen} ref={daily_expense_manager_tablee3342Ref} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData}/>}
        </div>
        </div>
      </CommonHeaderAndTooltip>
    </div>
 )
}

export default Groupdaily_expense_manager_table
