

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
// page import
import PageApprovalScreenDailypage from '@/app/approval_screen_daily_v1/approval_screen_daily_v1page';
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
      "cl_id",
      "trs_created_by",
      "claim_category",
      "total_amount",
      "status",
      "expense_date"
    ],
    "allowedGroups": [
      "canvas",
      "manager_group",
      "daily_expense_table",
      "offsite_expense_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Employee": {
    "allowedControls": [],
    "allowedGroups": [],
    "blockedControls": [
      "cl_id",
      "trs_created_by",
      "claim_category",
      "total_amount",
      "status",
      "expense_date"
    ],
    "readOnlyControls": []
  },
  "Manager": {
    "allowedControls": [
      "trs_created_by",
      "claim_category",
      "total_amount",
      "status",
      "expense_date"
    ],
    "allowedGroups": [
      "canvas",
      "manager_group",
      "daily_expense_table",
      "offsite_expense_table"
    ],
    "blockedControls": [
      "cl_id"
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
  const {manager_group41477, setmanager_group41477}= useContext(TotalContext) as TotalContextProps;
  const {manager_group41477Props, setmanager_group41477Props}= useContext(TotalContext) as TotalContextProps;
  const {daily_expense_table91568, setdaily_expense_table91568}= useContext(TotalContext) as TotalContextProps;
  const {daily_expense_table91568Props, setdaily_expense_table91568Props}= useContext(TotalContext) as TotalContextProps;
  const {cl_id570c3, setcl_id570c3}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_byae57b, settrs_created_byae57b}= useContext(TotalContext) as TotalContextProps;
  const {claim_category090da, setclaim_category090da}= useContext(TotalContext) as TotalContextProps;
  const {total_amountc033a, settotal_amountc033a}= useContext(TotalContext) as TotalContextProps;
  const {status49843, setstatus49843}= useContext(TotalContext) as TotalContextProps;
  const {expense_date0a4c3, setexpense_date0a4c3}= useContext(TotalContext) as TotalContextProps;
  const {offsite_expense_table1e924, setoffsite_expense_table1e924}= useContext(TotalContext) as TotalContextProps;
  const {offsite_expense_table1e924Props, setoffsite_expense_table1e924Props}= useContext(TotalContext) as TotalContextProps;
  const {daily_approval_group69531, setdaily_approval_group69531}= useContext(TotalContext) as TotalContextProps;
  const {daily_approval_group69531Props, setdaily_approval_group69531Props}= useContext(TotalContext) as TotalContextProps;
  const {expense_name084c7, setexpense_name084c7}= useContext(TotalContext) as TotalContextProps;
  const {offsite_approval_group8d6cc, setoffsite_approval_group8d6cc}= useContext(TotalContext) as TotalContextProps;
  const {offsite_approval_group8d6ccProps, setoffsite_approval_group8d6ccProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [open, setOpen] = React.useState(false);
  async function securityCheck() {
  /////////////
    if(securityData[accessProfile]?.['readOnlyControls'].includes("cl_id")){
      setdaily_expense_table91568({...daily_expense_table91568,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("trs_created_by")){
      setcl_id570c3({...cl_id570c3,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("claim_category")){
      settrs_created_byae57b({...trs_created_byae57b,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("total_amount")){
      setclaim_category090da({...claim_category090da,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("status")){
      settotal_amountc033a({...total_amountc033a,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("expense_date")){
      setstatus49843({...status49843,isDisabled:true});
    }
  //////////////
  }


    const handleOnload=()=>{
  }
  const handleOnChange=()=>{

  }
  const daily_expense_table91568Ref = useRef<any>(null);
  const handleClearSearch = () => {
    daily_expense_table91568Ref.current?.setSearchParams();
    daily_expense_table91568Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(daily_expense_table91568) && Object.keys(daily_expense_table91568)?.length>0)
      {
        setdaily_expense_table91568({})
      }
    }else 
      prevRefreshRef.current= true
  }, [daily_expense_table91568Props?.refresh])

  return (
    <div 
      style={{          
        gridColumn: '1 / 12',
        gridRow: '55 / 181',
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
      <Modal 
      open={showProfileAsModalOpen} 
      onClose={() => setShowProfileAsModalOpen(false)} 
      title={"Approval_Screen_Daily"}
      className='w-[800px] h-[] bg-gray-50 mx-auto rounded-lg shadow-xl p-5 overflow-auto'>
        <PageApprovalScreenDailypage/>
      </Modal>
        <CommonHeaderAndTooltip
        >
        <div className='flex flex-col h-full'>
          <div className=' flex flex-1 w-full min-h-0  '>
        {<Tabledaily_expense_table lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} open={open} setOpen={setOpen} ref={daily_expense_table91568Ref} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData}/>}
        </div>
        </div>
      </CommonHeaderAndTooltip>
    </div>
 )
}

export default Groupdaily_expense_table
