

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
import Tableclaim_detail_table  from './Tableclaim_detail_table';  
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupclaim_detail_table = ({lockedData={},setLockedData,primaryTableData={}, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,dropdownData,setDropdownData,paginationDetails,encryptionFlagPageData, nodeData, setNodeData,isFormOpen=false}:any) => {
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
      "claim_detail_id",
      "expense_category",
      "expense_description",
      "expense_date",
      "expense_amount"
    ],
    "allowedGroups": [
      "canvas"
    ],
    "blockedControls": [],
    "readOnlyControls": [
      "claim_detail_id",
      "expense_category",
      "expense_description",
      "expense_date",
      "expense_amount"
    ]
  },
  "Employee": {
    "allowedControls": [],
    "allowedGroups": [],
    "blockedControls": [
      "claim_detail_id",
      "expense_category",
      "expense_description",
      "expense_date",
      "expense_amount"
    ],
    "readOnlyControls": []
  },
  "Manager": {
    "allowedControls": [
      "claim_detail_id",
      "expense_category",
      "expense_description",
      "expense_date",
      "expense_amount"
    ],
    "allowedGroups": [
      "canvas",
      "offsite_approval_group",
      "claim_detail_table"
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
  const {offsite_approval_group8d6cc, setoffsite_approval_group8d6cc}= useContext(TotalContext) as TotalContextProps;
  const {offsite_approval_group8d6ccProps, setoffsite_approval_group8d6ccProps}= useContext(TotalContext) as TotalContextProps;
  const {claim_detail_table1835f, setclaim_detail_table1835f}= useContext(TotalContext) as TotalContextProps;
  const {claim_detail_table1835fProps, setclaim_detail_table1835fProps}= useContext(TotalContext) as TotalContextProps;
  const {claim_detail_idcd216, setclaim_detail_idcd216}= useContext(TotalContext) as TotalContextProps;
  const {expense_category71ccd, setexpense_category71ccd}= useContext(TotalContext) as TotalContextProps;
  const {expense_description84301, setexpense_description84301}= useContext(TotalContext) as TotalContextProps;
  const {expense_date2649c, setexpense_date2649c}= useContext(TotalContext) as TotalContextProps;
  const {expense_amount6b94f, setexpense_amount6b94f}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [open, setOpen] = React.useState(false);
  async function securityCheck() {
  /////////////
    if(securityData[accessProfile]?.['readOnlyControls'].includes("claim_detail_id")){
      setclaim_detail_idcd216({...claim_detail_idcd216,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("expense_category")){
      setexpense_category71ccd({...expense_category71ccd,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("expense_description")){
      setexpense_description84301({...expense_description84301,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("expense_date")){
      setexpense_date2649c({...expense_date2649c,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("expense_amount")){
      setexpense_amount6b94f({...expense_amount6b94f,isDisabled:true});
    }
  //////////////
  }


    const handleOnload=()=>{
  }
  const handleOnChange=()=>{

  }
  const claim_detail_table1835fRef = useRef<any>(null);
  const handleClearSearch = () => {
    claim_detail_table1835fRef.current?.setSearchParams();
    claim_detail_table1835fRef.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(claim_detail_table1835f) && Object.keys(claim_detail_table1835f)?.length>0)
      {
        setclaim_detail_table1835f({})
      }
    }else 
      prevRefreshRef.current= true
  }, [claim_detail_table1835fProps?.refresh])

  return (
    <div 
      style={{          
        gridColumn: '2 / 22',
        gridRow: '231 / 318',
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
        {<Tableclaim_detail_table lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} open={open} setOpen={setOpen} ref={claim_detail_table1835fRef} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData}/>}
        </div>
        </div>
      </CommonHeaderAndTooltip>
    </div>
 )
}

export default Groupclaim_detail_table
