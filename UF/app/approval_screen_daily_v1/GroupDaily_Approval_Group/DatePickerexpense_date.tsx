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


const DatePickerexpense_date = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData}:any) => {
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
  const {daily_approval_group69531, setdaily_approval_group69531}= useContext(TotalContext) as TotalContextProps  
  const {daily_approval_group69531Props, setdaily_approval_group69531Props}= useContext(TotalContext) as TotalContextProps  
  const {daily_expenses89868, setdaily_expenses89868}= useContext(TotalContext) as TotalContextProps  
  const {expense_name88ccc, setexpense_name88ccc}= useContext(TotalContext) as TotalContextProps  
  const {expense_datee8c94, setexpense_datee8c94}= useContext(TotalContext) as TotalContextProps  
  const {claim_category46dd0, setclaim_category46dd0}= useContext(TotalContext) as TotalContextProps  
  const {category_total_amountcf2e2, setcategory_total_amountcf2e2}= useContext(TotalContext) as TotalContextProps  
  const {receipt_image33fd1, setreceipt_image33fd1}= useContext(TotalContext) as TotalContextProps  
  const {comments9336d, setcomments9336d}= useContext(TotalContext) as TotalContextProps  
  const {manager_commentsd309a, setmanager_commentsd309a}= useContext(TotalContext) as TotalContextProps  
  const {enable666c8, setenable666c8}= useContext(TotalContext) as TotalContextProps  
  const {is_comment_enablede20a4, setis_comment_enablede20a4}= useContext(TotalContext) as TotalContextProps  
  const {reject28a4c, setreject28a4c}= useContext(TotalContext) as TotalContextProps  
  const {approve28765, setapprove28765}= useContext(TotalContext) as TotalContextProps  

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
  setValidate((pre:any)=>({...pre,expense_date:undefined}))

  setdaily_approval_group69531((prev: any) => ({ ...prev, expense_date: isoDate }))
}



const handleBlur=async () => {
  
    let code:any="";
    if (code != '') {
    let codeStates: any = {};
      codeStates['daily_approval_group']  = daily_approval_group69531;
      codeStates['setdaily_approval_group'] = setdaily_approval_group69531;
  codeExecution(code,codeStates);
  }
}

useEffect(()=>{
  setdaily_approval_group69531Props((pre:any)=>({...pre,validation:true}))
 },[expense_datee8c94?.refresh])

  useEffect(()=>{
      handleBlur()
  },[validateRefetch.value])

if (expense_datee8c94?.isHidden) {
  return <></>
}

return (
  <div 
  style={{gridColumn: `3 / 9`,gridRow: `51 / 70`, gap:``, height: `100%`, overflow: 'auto'}} >
    <DatePicker
      className=""
      //label={keyset("")}
      value={daily_approval_group69531?.expense_date}
      onUpdate= {handleUpdate}
      onBlur= {()=>handleBlur()} 
      readOnly=  {expense_datee8c94?.isDisabled ? true : false}
      disabled= {expense_datee8c94?.isDisabled ? true : false}
      contentAlign={"center"}
      headerPosition='top'
      headerText="Expense Date"
      validationState={validate?.expense_date ? "invalid" : undefined}
      errorMessage={error}
      />
  </div>
  )
}

export default DatePickerexpense_date
