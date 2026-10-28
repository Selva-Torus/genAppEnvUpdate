

'use client'
import React, { useState,useContext,useEffect,useRef } from 'react'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import i18n from '@/app/components/i18n';
import { useGlobal } from '@/context/GlobalContext'
import { codeExecution } from '@/app/utils/codeExecution';
import { AxiosService } from '@/app/components/axiosService';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useRouter } from 'next/navigation'
import { DatePicker } from '@/components/DatePicker';
import { Text } from '@/components/Text';
import { Modal } from '@/components/Modal';
import { eventBus } from '@/app/eventBus';
import { getFilterProps, getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { useHandleDfdRefresh } from '@/context/dfdRefreshContext';
import { eventDecisionTable } from '@/app/utils/evaluateDecisionTable';
import decodeToken from '@/app/components/decodeToken';
import UOmapperData from '@/context/dfdmapperContolnames.json';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
import * as v from 'valibot';


const DatePickerto_date = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
  const { token } = useGlobal();
  const {validateRefetch , setValidateRefetch} = useContext(TotalContext) as TotalContextProps;
  const {validate , setValidate} = useContext(TotalContext) as TotalContextProps;
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const [isRequiredData,setIsRequiredData]=useState<boolean>(false)
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const handleDfdRefresh = useHandleDfdRefresh();
  const decodedTokenObj:any = decodeToken(token);
 
  const keyset:any=i18n.keyset("language");
  const toast:any=useInfoMsg();
  const routes = useRouter();
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  //showComponentAsPopup || showArtifactAsModal
    
  /////////////
   //another screen
  const {offsite_approval_group8d6cc, setoffsite_approval_group8d6cc}= useContext(TotalContext) as TotalContextProps  
  const {offsite_approval_group8d6ccProps, setoffsite_approval_group8d6ccProps}= useContext(TotalContext) as TotalContextProps  
  const {offsite_expense4be82, setoffsite_expense4be82}= useContext(TotalContext) as TotalContextProps  
  const {expense_name084c7, setexpense_name084c7}= useContext(TotalContext) as TotalContextProps  
  const {email070ac, setemail070ac}= useContext(TotalContext) as TotalContextProps  
  const {from_dateb920f, setfrom_dateb920f}= useContext(TotalContext) as TotalContextProps  
  const {to_date5ca82, setto_date5ca82}= useContext(TotalContext) as TotalContextProps  
  const {claim_categoryac401, setclaim_categoryac401}= useContext(TotalContext) as TotalContextProps  
  const {category_total_amountdd7c0, setcategory_total_amountdd7c0}= useContext(TotalContext) as TotalContextProps  
  const {receipt_image3a832, setreceipt_image3a832}= useContext(TotalContext) as TotalContextProps  
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
  try{
  //setIsProcessing(true);
  setError('')
  setValidate((pre:any)=>({...pre,Approval_Screen_Offsite_v1:{...pre?.Approval_Screen_Offsite_v1,to_date:undefined}}));
  if (!date) {
    setoffsite_approval_group8d6cc((prev: any) => ({ ...prev, to_date: null }));
    return;
  }
  const now = new Date();
  const [year, month, day] = date.split('-').map(Number);
  const combined = new Date(Date.UTC(year, month - 1, day, now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds()));
  const isoDate = combined.toISOString();
  setoffsite_approval_group8d6cc((prev: any) => ({ ...prev, to_date: isoDate }))
  }catch (err: any) {
    //setIsProcessing(false);
    if(typeof err == 'string')
      toast(err, 'danger');
    else
      toast(err?.response?.data?.errorDetails?.message, 'danger');
  }finally{
    //setIsProcessing(false);
  }
}



const handleBlur=async () => {
    //validation
    let code:any;
    const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "279c2b7585c947c9abdc712d6a18d6cc",
        "ae201daf0e6b48f09ca0af196c35ca82"
      );
    code=orchestrationData?.data?.code
    if (code != '') {
    let codeStates: any = {};
    codeStates['offsite_approval_group'] = offsite_approval_group8d6cc,
    codeStates['setoffsite_approval_group'] = setoffsite_approval_group8d6cc,
    codeStates['offsite_approval_group8d6cc'] = offsite_approval_group8d6ccProps,
    codeStates['setoffsite_approval_group8d6cc'] = setoffsite_approval_group8d6ccProps,
    codeStates['offsite_expense'] = offsite_expense4be82,
    codeStates['setoffsite_expense'] = setoffsite_expense4be82,
    codeStates['expense_name'] = expense_name084c7,
    codeStates['setexpense_name'] = setexpense_name084c7,
    codeStates['email'] = email070ac,
    codeStates['setemail'] = setemail070ac,
    codeStates['from_date'] = from_dateb920f,
    codeStates['setfrom_date'] = setfrom_dateb920f,
    codeStates['to_date'] = to_date5ca82,
    codeStates['setto_date'] = setto_date5ca82,
    codeStates['claim_category'] = claim_categoryac401,
    codeStates['setclaim_category'] = setclaim_categoryac401,
    codeStates['category_total_amount'] = category_total_amountdd7c0,
    codeStates['setcategory_total_amount'] = setcategory_total_amountdd7c0,
    codeStates['receipt_image'] = receipt_image3a832,
    codeStates['setreceipt_image'] = setreceipt_image3a832,
    codeStates['comments'] = commentse0ef7,
    codeStates['setcomments'] = setcommentse0ef7,
    codeStates['manager_comments'] = manager_comments4bec2,
    codeStates['setmanager_comments'] = setmanager_comments4bec2,
    codeStates['enable'] = enabled5c19,
    codeStates['setenable'] = setenabled5c19,
    codeStates['is_comment_enabled'] = is_comment_enabledf9731,
    codeStates['setis_comment_enabled'] = setis_comment_enabledf9731,
    codeStates['claim_detail_table'] = claim_detail_table1835f,
    codeStates['setclaim_detail_table'] = setclaim_detail_table1835f,
    codeStates['claim_detail_table1835f'] = claim_detail_table1835fProps,
    codeStates['setclaim_detail_table1835f'] = setclaim_detail_table1835fProps,
    codeStates['reject'] = reject74228,
    codeStates['setreject'] = setreject74228,
    codeStates['approve'] = approve098ea,
    codeStates['setapprove'] = setapprove098ea,
    codeStates['toast'] = toast;
    codeExecution(code,codeStates);
  }
}

useEffect(()=>{
  setoffsite_approval_group8d6ccProps((pre:any)=>({...pre,validation:true}))
 },[to_date5ca82?.refresh])

useEffect(()=>{
  handleBlur();
},[validateRefetch.value])


if (to_date5ca82?.isHidden) {
  return <></>
}
return (
  <div 
  style={{gridColumn: `12 / 22`,gridRow: `71 / 87`, gap:``, height: `100%`, overflow: 'auto'}} >
    <DatePicker
      className=""
      //label={keyset("")}
      value={offsite_approval_group8d6cc?.to_date}
      onUpdate= {handleUpdate}
      onBlur= {()=>handleBlur()} 
      required={ false }
      readOnly=  {to_date5ca82?.isDisabled ? true : false}
      disabled= {to_date5ca82?.isDisabled ? true : false}
      contentAlign={"center"}
      headerPosition='top'
      headerText="To Date"
      dateValidation=""
      validationState={validate?.Approval_Screen_Offsite_v1?.to_date ? "invalid" : undefined}
      errorMessage={error}
      />
  </div>
  )
}

export default DatePickerto_date
