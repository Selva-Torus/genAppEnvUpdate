'use client'
import React, { useState,useContext,useEffect } from 'react'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import i18n from '@/app/components/i18n';
import { getCookie } from '@/app/components/cookieMgment';
import { codeExecution } from '@/app/utils/codeExecution';
import { AxiosService } from '@/app/components/axiosService';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useRouter } from 'next/navigation'
import { eventBus } from '@/app/eventBus';
import { DatePicker } from '@/components/DatePicker';
import { Text } from '@/components/Text';
import { Modal } from '@/components/Modal';
import { getFilterProps, getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { useHandleDfdRefresh } from '@/context/dfdRefreshContext';
import * as v from 'valibot';


const DatePickerto_date = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData}:any) => {
  const token:string = getCookie('token');
  const {validateRefetch , setValidateRefetch} = useContext(TotalContext) as TotalContextProps;
  const {validate , setValidate} = useContext(TotalContext) as TotalContextProps;
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const handleDfdRefresh = useHandleDfdRefresh();
  
  const keyset:any=i18n.keyset("language");
  const toast:any=useInfoMsg();
  const routes = useRouter();
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
    
  /////////////
   //another screen
  const {offsite_approval_group8d6cc, setoffsite_approval_group8d6cc}= useContext(TotalContext) as TotalContextProps  
  const {offsite_approval_group8d6ccProps, setoffsite_approval_group8d6ccProps}= useContext(TotalContext) as TotalContextProps  
  const {offsite_expense4be82, setoffsite_expense4be82}= useContext(TotalContext) as TotalContextProps  
  const {expense_name084c7, setexpense_name084c7}= useContext(TotalContext) as TotalContextProps  
  const {from_dated8c1b, setfrom_dated8c1b}= useContext(TotalContext) as TotalContextProps  
  const {to_date0c15a, setto_date0c15a}= useContext(TotalContext) as TotalContextProps  
  const {claim_categoryac401, setclaim_categoryac401}= useContext(TotalContext) as TotalContextProps  
  const {category_total_amountdd7c0, setcategory_total_amountdd7c0}= useContext(TotalContext) as TotalContextProps  
  const {receipt_image3968d, setreceipt_image3968d}= useContext(TotalContext) as TotalContextProps  
  const {commentse0ef7, setcommentse0ef7}= useContext(TotalContext) as TotalContextProps  
  const {manager_comments4bec2, setmanager_comments4bec2}= useContext(TotalContext) as TotalContextProps  
  const {enabled5c19, setenabled5c19}= useContext(TotalContext) as TotalContextProps  
  const {is_comment_enabledf9731, setis_comment_enabledf9731}= useContext(TotalContext) as TotalContextProps  
  const {claim_detail_table1835f, setclaim_detail_table1835f}= useContext(TotalContext) as TotalContextProps  
  const {claim_detail_table1835fProps, setclaim_detail_table1835fProps}= useContext(TotalContext) as TotalContextProps  
  const {reject74228, setreject74228}= useContext(TotalContext) as TotalContextProps  
  const {approve098ea, setapprove098ea}= useContext(TotalContext) as TotalContextProps  

  //////////////

  // Validation 
  const [error, setError] = useState<string>('');
  let schemaArray :any =[];

const handleUpdate = async(date: any) => {
  const selectedDate = new Date(date);
  const IST_OFFSET = 5.5 * 60 * 60 * 1000; 
  const indiaTime = new Date(selectedDate.getTime() + IST_OFFSET);
  const isoDate = indiaTime.toISOString();

  setError('')
  setValidate((pre:any)=>({...pre,to_date:undefined}))

  setoffsite_approval_group8d6cc((prev: any) => ({ ...prev, to_date: isoDate }))
}



const handleBlur=async () => {
  
    let code:any="";
    if (code != '') {
    let codeStates: any = {};
      codeStates['offsite_approval_group']  = offsite_approval_group8d6cc;
      codeStates['setoffsite_approval_group'] = setoffsite_approval_group8d6cc;
      codeStates['claim_detail_table']  = claim_detail_table1835f;
      codeStates['setclaim_detail_table'] = setclaim_detail_table1835f;
  codeExecution(code,codeStates);
  }
}

useEffect(()=>{
  setoffsite_approval_group8d6ccProps((pre:any)=>({...pre,validation:true}))
 },[to_date0c15a?.refresh])

  useEffect(()=>{
      handleBlur()
  },[validateRefetch.value])

if (to_date0c15a?.isHidden) {
  return <></>
}

return (
  <div 
  style={{gridColumn: `12 / 22`,gridRow: `51 / 67`, gap:``, height: `100%`, overflow: 'auto'}} >
    <DatePicker
      className=""
      //label={keyset("")}
      value={offsite_approval_group8d6cc?.to_date}
      onUpdate= {handleUpdate}
      onBlur= {()=>handleBlur()} 
      readOnly=  {to_date0c15a?.isDisabled ? true : false}
      disabled= {to_date0c15a?.isDisabled ? true : false}
      contentAlign={"center"}
      headerPosition='top'
      headerText="To Date"
      validationState={validate?.to_date ? "invalid" : undefined}
      errorMessage={error}
      />
  </div>
  )
}

export default DatePickerto_date
