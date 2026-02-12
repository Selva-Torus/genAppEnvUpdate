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
  const {request_offsite_group429cb, setrequest_offsite_group429cb}= useContext(TotalContext) as TotalContextProps  
  const {request_offsite_group429cbProps, setrequest_offsite_group429cbProps}= useContext(TotalContext) as TotalContextProps  
  const {offsite_expense39c39, setoffsite_expense39c39}= useContext(TotalContext) as TotalContextProps  
  const {claim_expense_type51f6e, setclaim_expense_type51f6e}= useContext(TotalContext) as TotalContextProps  
  const {expense_namebf755, setexpense_namebf755}= useContext(TotalContext) as TotalContextProps  
  const {from_date6f9c3, setfrom_date6f9c3}= useContext(TotalContext) as TotalContextProps  
  const {to_date6db82, setto_date6db82}= useContext(TotalContext) as TotalContextProps  
  const {claim_categorya4a14, setclaim_categorya4a14}= useContext(TotalContext) as TotalContextProps  
  const {category_total_amounte603b, setcategory_total_amounte603b}= useContext(TotalContext) as TotalContextProps  
  const {attachmentc9c51, setattachmentc9c51}= useContext(TotalContext) as TotalContextProps  
  const {receipt_imageafe30, setreceipt_imageafe30}= useContext(TotalContext) as TotalContextProps  
  const {comments65b18, setcomments65b18}= useContext(TotalContext) as TotalContextProps  
  const {enableeff29, setenableeff29}= useContext(TotalContext) as TotalContextProps  
  const {is_comment_enabled5ca5f, setis_comment_enabled5ca5f}= useContext(TotalContext) as TotalContextProps  
  const {clear2b3e6, setclear2b3e6}= useContext(TotalContext) as TotalContextProps  
  const {add5cae4, setadd5cae4}= useContext(TotalContext) as TotalContextProps  
  const {claims_detail_tablef8143, setclaims_detail_tablef8143}= useContext(TotalContext) as TotalContextProps  
  const {claims_detail_tablef8143Props, setclaims_detail_tablef8143Props}= useContext(TotalContext) as TotalContextProps  

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

  setrequest_offsite_group429cb((prev: any) => ({ ...prev, to_date: isoDate }))
}



const handleBlur=async () => {
  
    let code:any="";
    if (code != '') {
    let codeStates: any = {};
      codeStates['request_offsite_group']  = request_offsite_group429cb;
      codeStates['setrequest_offsite_group'] = setrequest_offsite_group429cb;
      codeStates['claims_detail_table']  = claims_detail_tablef8143;
      codeStates['setclaims_detail_table'] = setclaims_detail_tablef8143;
  codeExecution(code,codeStates);
  }
}

useEffect(()=>{
  setrequest_offsite_group429cbProps((pre:any)=>({...pre,validation:true}))
 },[to_date6db82?.refresh])

  useEffect(()=>{
      handleBlur()
  },[validateRefetch.value])

if (to_date6db82?.isHidden) {
  return <></>
}

return (
  <div 
  style={{gridColumn: `13 / 20`,gridRow: `48 / 64`, gap:``, height: `100%`, overflow: 'auto'}} >
    <DatePicker
      className=""
      //label={keyset("")}
      value={request_offsite_group429cb?.to_date}
      onUpdate= {handleUpdate}
      onBlur= {()=>handleBlur()} 
      readOnly=  {to_date6db82?.isDisabled ? true : false}
      disabled= {to_date6db82?.isDisabled ? true : false}
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
