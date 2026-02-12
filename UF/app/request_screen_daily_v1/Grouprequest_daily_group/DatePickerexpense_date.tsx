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
  const {request_daily_group44e40, setrequest_daily_group44e40}= useContext(TotalContext) as TotalContextProps  
  const {request_daily_group44e40Props, setrequest_daily_group44e40Props}= useContext(TotalContext) as TotalContextProps  
  const {daily_expensefb8cc, setdaily_expensefb8cc}= useContext(TotalContext) as TotalContextProps  
  const {claim_expense_type22d67, setclaim_expense_type22d67}= useContext(TotalContext) as TotalContextProps  
  const {expense_name5f562, setexpense_name5f562}= useContext(TotalContext) as TotalContextProps  
  const {expense_date5f45e, setexpense_date5f45e}= useContext(TotalContext) as TotalContextProps  
  const {claim_categoryc7c5e, setclaim_categoryc7c5e}= useContext(TotalContext) as TotalContextProps  
  const {category_total_amount9782f, setcategory_total_amount9782f}= useContext(TotalContext) as TotalContextProps  
  const {attachment04414, setattachment04414}= useContext(TotalContext) as TotalContextProps  
  const {receipt_image6afe2, setreceipt_image6afe2}= useContext(TotalContext) as TotalContextProps  
  const {commentsf2394, setcommentsf2394}= useContext(TotalContext) as TotalContextProps  
  const {enabletextb4878, setenabletextb4878}= useContext(TotalContext) as TotalContextProps  
  const {is_comment_enabled7244d, setis_comment_enabled7244d}= useContext(TotalContext) as TotalContextProps  
  const {clear14ae7, setclear14ae7}= useContext(TotalContext) as TotalContextProps  
  const {saved507e, setsaved507e}= useContext(TotalContext) as TotalContextProps  

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

  setrequest_daily_group44e40((prev: any) => ({ ...prev, expense_date: isoDate }))
}



const handleBlur=async () => {
  
    let code:any="";
    if (code != '') {
    let codeStates: any = {};
      codeStates['request_daily_group']  = request_daily_group44e40;
      codeStates['setrequest_daily_group'] = setrequest_daily_group44e40;
  codeExecution(code,codeStates);
  }
}

useEffect(()=>{
  setrequest_daily_group44e40Props((pre:any)=>({...pre,validation:true}))
 },[expense_date5f45e?.refresh])

  useEffect(()=>{
      handleBlur()
  },[validateRefetch.value])

if (expense_date5f45e?.isHidden) {
  return <></>
}

return (
  <div 
  style={{gridColumn: `5 / 20`,gridRow: `39 / 56`, gap:``, height: `100%`, overflow: 'auto'}} >
    <DatePicker
      className=""
      //label={keyset("")}
      value={request_daily_group44e40?.expense_date}
      onUpdate= {handleUpdate}
      onBlur= {()=>handleBlur()} 
      readOnly=  {expense_date5f45e?.isDisabled ? true : false}
      disabled= {expense_date5f45e?.isDisabled ? true : false}
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
