

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
import Tableoffsite_expense_user_table  from './Tableoffsite_expense_user_table';  
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupoffsite_expense_user_table = ({lockedData={},setLockedData,primaryTableData={}, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,dropdownData,setDropdownData,paginationDetails,encryptionFlagPageData, nodeData, setNodeData,isFormOpen=false}:any) => {
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
      "expense_name",
      "claim_category",
      "category_total_amount",
      "formatted_date",
      "trs_status"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "offsite_expense_user_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Employee": {
    "allowedControls": [
      "claim_id",
      "expense_name",
      "claim_category",
      "category_total_amount",
      "formatted_date",
      "trs_status"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "offsite_expense_user_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Manager": {
    "allowedControls": [],
    "allowedGroups": [],
    "blockedControls": [
      "claim_id",
      "expense_name",
      "claim_category",
      "category_total_amount",
      "formatted_date",
      "trs_status"
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
  const {groupe78de, setgroupe78de}= useContext(TotalContext) as TotalContextProps;
  const {groupe78deProps, setgroupe78deProps}= useContext(TotalContext) as TotalContextProps;
  const {offsite_expense_user_table94f29, setoffsite_expense_user_table94f29}= useContext(TotalContext) as TotalContextProps;
  const {offsite_expense_user_table94f29Props, setoffsite_expense_user_table94f29Props}= useContext(TotalContext) as TotalContextProps;
  const {claim_idadd32, setclaim_idadd32}= useContext(TotalContext) as TotalContextProps;
  const {expense_name0255e, setexpense_name0255e}= useContext(TotalContext) as TotalContextProps;
  const {claim_category8981c, setclaim_category8981c}= useContext(TotalContext) as TotalContextProps;
  const {category_total_amounta8a33, setcategory_total_amounta8a33}= useContext(TotalContext) as TotalContextProps;
  const {formatted_date0d1c9, setformatted_date0d1c9}= useContext(TotalContext) as TotalContextProps;
  const {trs_statusf43c9, settrs_statusf43c9}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [open, setOpen] = React.useState(false);
  async function securityCheck() {
  /////////////
    if(securityData[accessProfile]?.['readOnlyControls'].includes("claim_id")){
      setclaim_idadd32({...claim_idadd32,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("expense_name")){
      setexpense_name0255e({...expense_name0255e,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("claim_category")){
      setclaim_category8981c({...claim_category8981c,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("category_total_amount")){
      setcategory_total_amounta8a33({...category_total_amounta8a33,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("formatted_date")){
      setformatted_date0d1c9({...formatted_date0d1c9,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("trs_status")){
      settrs_statusf43c9({...trs_statusf43c9,isDisabled:true});
    }
  //////////////
  }


    const handleOnload=()=>{
  }
  const handleOnChange=()=>{

  }
  const offsite_expense_user_table94f29Ref = useRef<any>(null);
  const handleClearSearch = () => {
    offsite_expense_user_table94f29Ref.current?.setSearchParams();
    offsite_expense_user_table94f29Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(offsite_expense_user_table94f29) && Object.keys(offsite_expense_user_table94f29)?.length>0)
      {
        setoffsite_expense_user_table94f29({})
      }
    }else 
      prevRefreshRef.current= true
  }, [offsite_expense_user_table94f29Props?.refresh])

  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '21 / 172',
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
          <div className=' flex flex-1 w-full min-h-0  '>
        {<Tableoffsite_expense_user_table lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} open={open} setOpen={setOpen} ref={offsite_expense_user_table94f29Ref} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData}/>}
        </div>
        </div>
      </CommonHeaderAndTooltip>
    </div>
 )
}

export default Groupoffsite_expense_user_table
