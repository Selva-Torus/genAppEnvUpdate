

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
import PageApprovalScreenOffsitepage from '@/app/approval_screen_offsite_v1/approval_screen_offsite_v1page';
import Tableoffsite_expense_table  from './Tableoffsite_expense_table';  
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupoffsite_expense_table = ({lockedData={},setLockedData,primaryTableData={}, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,dropdownData,setDropdownData,paginationDetails,encryptionFlagPageData, nodeData, setNodeData,isFormOpen=false}:any) => {
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
      "claim_id",
      "expense_name",
      "category_total_amount",
      "trs_status",
      "formatted_date"
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
      "claim_id",
      "expense_name",
      "category_total_amount",
      "trs_status",
      "formatted_date"
    ],
    "readOnlyControls": []
  },
  "Manager": {
    "allowedControls": [
      "expense_name",
      "category_total_amount",
      "trs_status",
      "formatted_date"
    ],
    "allowedGroups": [
      "canvas",
      "manager_group",
      "daily_expense_table",
      "offsite_expense_table"
    ],
    "blockedControls": [
      "claim_id"
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
  const {offsite_expense_table1e924, setoffsite_expense_table1e924}= useContext(TotalContext) as TotalContextProps;
  const {offsite_expense_table1e924Props, setoffsite_expense_table1e924Props}= useContext(TotalContext) as TotalContextProps;
  const {claim_id4a599, setclaim_id4a599}= useContext(TotalContext) as TotalContextProps;
  const {expense_namec8f13, setexpense_namec8f13}= useContext(TotalContext) as TotalContextProps;
  const {category_total_amountfb61b, setcategory_total_amountfb61b}= useContext(TotalContext) as TotalContextProps;
  const {trs_status79b0b, settrs_status79b0b}= useContext(TotalContext) as TotalContextProps;
  const {formatted_date46435, setformatted_date46435}= useContext(TotalContext) as TotalContextProps;
  const {claim_detail_table1835f, setclaim_detail_table1835f}= useContext(TotalContext) as TotalContextProps;
  const {claim_detail_table1835fProps, setclaim_detail_table1835fProps}= useContext(TotalContext) as TotalContextProps;
  const {offsite_approval_group8d6cc, setoffsite_approval_group8d6cc}= useContext(TotalContext) as TotalContextProps;
  const {offsite_approval_group8d6ccProps, setoffsite_approval_group8d6ccProps}= useContext(TotalContext) as TotalContextProps;
  const {reject74228, setreject74228}= useContext(TotalContext) as TotalContextProps;
  const {approve098ea, setapprove098ea}= useContext(TotalContext) as TotalContextProps;
  const {manager_comments4bec2, setmanager_comments4bec2}= useContext(TotalContext) as TotalContextProps;
  const {expense_name084c7, setexpense_name084c7}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [open, setOpen] = React.useState(false);
  async function securityCheck() {
  /////////////
    if(securityData[accessProfile]?.['readOnlyControls'].includes("claim_id")){
      setoffsite_expense_table1e924({...offsite_expense_table1e924,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("expense_name")){
      setclaim_id4a599({...claim_id4a599,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("category_total_amount")){
      setexpense_namec8f13({...expense_namec8f13,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("trs_status")){
      setcategory_total_amountfb61b({...category_total_amountfb61b,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("formatted_date")){
      settrs_status79b0b({...trs_status79b0b,isDisabled:true});
    }
  //////////////
  }


    const handleOnload=()=>{
  }
  const handleOnChange=()=>{

  }
  const offsite_expense_table1e924Ref = useRef<any>(null);
  const handleClearSearch = () => {
    offsite_expense_table1e924Ref.current?.setSearchParams();
    offsite_expense_table1e924Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(offsite_expense_table1e924) && Object.keys(offsite_expense_table1e924)?.length>0)
      {
        setoffsite_expense_table1e924({})
      }
    }else 
      prevRefreshRef.current= true
  }, [offsite_expense_table1e924Props?.refresh])

  return (
    <div 
      style={{          
        gridColumn: '13 / 25',
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
      title={"Approval_Screen_Offsite"}
      className='w-[800px] h-[] bg-gray-50 mx-auto rounded-lg shadow-xl p-5 overflow-auto'>
        <PageApprovalScreenOffsitepage/>
      </Modal>
        <CommonHeaderAndTooltip
        >
        <div className='flex flex-col h-full'>
          <div className=' flex flex-1 w-full min-h-0  '>
        {<Tableoffsite_expense_table lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} open={open} setOpen={setOpen} ref={offsite_expense_table1e924Ref} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData}/>}
        </div>
        </div>
      </CommonHeaderAndTooltip>
    </div>
 )
}

export default Groupoffsite_expense_table
