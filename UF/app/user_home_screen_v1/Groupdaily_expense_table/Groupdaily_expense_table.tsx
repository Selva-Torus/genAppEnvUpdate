

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
import Tabledaily_expense_table  from './Tabledaily_expense_table';  
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupdaily_expense_table = ({lockedData={},setLockedData,primaryTableData={}, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,dropdownData,setDropdownData,paginationDetails,encryptionFlagPageData, nodeData, setNodeData,isFormOpen=false}:any) => {
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
  const {dfd_card_data_v1Props, setdfd_card_data_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "claim_category",
      "amount",
      "status",
      "date"
    ],
    "allowedGroups": [
      "canvas",
      "user_grp",
      "daily_expense_table",
      "offsite_expense_table"
    ],
    "blockedControls": [
      "c_id"
    ],
    "readOnlyControls": []
  },
  "Employee": {
    "allowedControls": [
      "claim_category",
      "amount",
      "status",
      "date"
    ],
    "allowedGroups": [
      "canvas",
      "user_grp",
      "daily_expense_table",
      "offsite_expense_table"
    ],
    "blockedControls": [
      "c_id"
    ],
    "readOnlyControls": []
  },
  "Manager": {
    "allowedControls": [],
    "allowedGroups": [],
    "blockedControls": [
      "c_id",
      "claim_category",
      "amount",
      "status",
      "date"
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
  const {user_grpd6690, setuser_grpd6690}= useContext(TotalContext) as TotalContextProps;
  const {user_grpd6690Props, setuser_grpd6690Props}= useContext(TotalContext) as TotalContextProps;
  const {daily_expense_table13758, setdaily_expense_table13758}= useContext(TotalContext) as TotalContextProps;
  const {daily_expense_table13758Props, setdaily_expense_table13758Props}= useContext(TotalContext) as TotalContextProps;
  const {c_id1095d, setc_id1095d}= useContext(TotalContext) as TotalContextProps;
  const {claim_category16bdb, setclaim_category16bdb}= useContext(TotalContext) as TotalContextProps;
  const {amountc124c, setamountc124c}= useContext(TotalContext) as TotalContextProps;
  const {status3fa4d, setstatus3fa4d}= useContext(TotalContext) as TotalContextProps;
  const {date5e32f, setdate5e32f}= useContext(TotalContext) as TotalContextProps;
  const {offsite_expense_table4ffd6, setoffsite_expense_table4ffd6}= useContext(TotalContext) as TotalContextProps;
  const {offsite_expense_table4ffd6Props, setoffsite_expense_table4ffd6Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [open, setOpen] = React.useState(false);
  async function securityCheck() {
  /////////////
    if(securityData[accessProfile]?.['readOnlyControls'].includes("c_id")){
      setc_id1095d({...c_id1095d,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("claim_category")){
      setclaim_category16bdb({...claim_category16bdb,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("amount")){
      setamountc124c({...amountc124c,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("status")){
      setstatus3fa4d({...status3fa4d,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("date")){
      setdate5e32f({...date5e32f,isDisabled:true});
    }
  //////////////
  }


    const handleOnload=()=>{
  }
  const handleOnChange=()=>{

  }
  const daily_expense_table13758Ref = useRef<any>(null);
  const handleClearSearch = () => {
    daily_expense_table13758Ref.current?.setSearchParams();
    daily_expense_table13758Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(daily_expense_table13758) && Object.keys(daily_expense_table13758)?.length>0)
      {
        setdaily_expense_table13758({})
      }
    }else 
      prevRefreshRef.current= true
  }, [daily_expense_table13758Props?.refresh])

  return (
    <div 
      style={{          
        gridColumn: '1 / 12',
        gridRow: '59 / 172',
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
        {<Tabledaily_expense_table lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} open={open} setOpen={setOpen} ref={daily_expense_table13758Ref} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData}/>}
        </div>
        </div>
      </CommonHeaderAndTooltip>
    </div>
 )
}

export default Groupdaily_expense_table
