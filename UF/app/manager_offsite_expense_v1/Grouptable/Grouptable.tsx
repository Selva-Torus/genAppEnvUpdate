

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
import Tabletable  from './Tabletable';  
import ButtonReject  from "./ButtonReject";
import ButtonApprove  from "./ButtonApprove";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Grouptable = ({lockedData={},setLockedData,primaryTableData={}, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,dropdownData,setDropdownData,paginationDetails,encryptionFlagPageData, nodeData, setNodeData,isFormOpen=false}:any) => {
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
    "allowedControls": [
      "claim_id",
      "reject",
      "approve",
      "trs_created_by",
      "expense_name",
      "claim_category",
      "category_total_amount",
      "formatted_date",
      "trs_status"
    ],
    "allowedGroups": [
      "canvas",
      "grp",
      "table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Employee": {
    "allowedControls": [],
    "allowedGroups": [],
    "blockedControls": [
      "claim_id",
      "reject",
      "approve",
      "trs_created_by",
      "expense_name",
      "claim_category",
      "category_total_amount",
      "formatted_date",
      "trs_status"
    ],
    "readOnlyControls": []
  },
  "Manager": {
    "allowedControls": [
      "claim_id",
      "reject",
      "approve",
      "trs_created_by",
      "expense_name",
      "claim_category",
      "category_total_amount",
      "formatted_date",
      "trs_status"
    ],
    "allowedGroups": [
      "canvas",
      "grp",
      "table"
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
  const {grpdeda0, setgrpdeda0}= useContext(TotalContext) as TotalContextProps;
  const {grpdeda0Props, setgrpdeda0Props}= useContext(TotalContext) as TotalContextProps;
  const {table98ff5, settable98ff5}= useContext(TotalContext) as TotalContextProps;
  const {table98ff5Props, settable98ff5Props}= useContext(TotalContext) as TotalContextProps;
  const {claim_id56078, setclaim_id56078}= useContext(TotalContext) as TotalContextProps;
  const {rejecte566a, setrejecte566a}= useContext(TotalContext) as TotalContextProps;
  const {approve5709e, setapprove5709e}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_by8053b, settrs_created_by8053b}= useContext(TotalContext) as TotalContextProps;
  const {expense_name94440, setexpense_name94440}= useContext(TotalContext) as TotalContextProps;
  const {claim_category9ec61, setclaim_category9ec61}= useContext(TotalContext) as TotalContextProps;
  const {category_total_amount689b8, setcategory_total_amount689b8}= useContext(TotalContext) as TotalContextProps;
  const {formatted_date1030f, setformatted_date1030f}= useContext(TotalContext) as TotalContextProps;
  const {trs_status759b6, settrs_status759b6}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [open, setOpen] = React.useState(false);
  async function securityCheck() {
  /////////////
    if(securityData[accessProfile]?.['readOnlyControls'].includes("claim_id")){
      setclaim_id56078({...claim_id56078,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("reject")){
      setrejecte566a({...rejecte566a,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("approve")){
      setapprove5709e({...approve5709e,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("trs_created_by")){
      settrs_created_by8053b({...trs_created_by8053b,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("expense_name")){
      setexpense_name94440({...expense_name94440,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("claim_category")){
      setclaim_category9ec61({...claim_category9ec61,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("category_total_amount")){
      setcategory_total_amount689b8({...category_total_amount689b8,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("formatted_date")){
      setformatted_date1030f({...formatted_date1030f,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("trs_status")){
      settrs_status759b6({...trs_status759b6,isDisabled:true});
    }
  //////////////
  }


    const handleOnload=()=>{
  }
  const handleOnChange=()=>{

  }
  const table98ff5Ref = useRef<any>(null);
  const handleClearSearch = () => {
    table98ff5Ref.current?.setSearchParams();
    table98ff5Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(table98ff5) && Object.keys(table98ff5)?.length>0)
      {
        settable98ff5({})
      }
    }else 
      prevRefreshRef.current= true
  }, [table98ff5Props?.refresh])

  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '10 / 143',
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
        {<Tabletable lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} open={open} setOpen={setOpen} ref={table98ff5Ref} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData}/>}
        </div>
        </div>
      </CommonHeaderAndTooltip>
    </div>
 )
}

export default Grouptable
