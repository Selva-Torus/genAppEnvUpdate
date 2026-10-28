

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


const DatePickerexpense_date = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
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
  const {request_daily_group44e40, setrequest_daily_group44e40}= useContext(TotalContext) as TotalContextProps  
  const {request_daily_group44e40Props, setrequest_daily_group44e40Props}= useContext(TotalContext) as TotalContextProps  
  const {daily_expensefb8cc, setdaily_expensefb8cc}= useContext(TotalContext) as TotalContextProps  
  const {claim_expense_type22d67, setclaim_expense_type22d67}= useContext(TotalContext) as TotalContextProps  
  const {expense_name5f562, setexpense_name5f562}= useContext(TotalContext) as TotalContextProps  
  const {emailaf076, setemailaf076}= useContext(TotalContext) as TotalContextProps  
  const {expense_date92269, setexpense_date92269}= useContext(TotalContext) as TotalContextProps  
  const {claim_categoryf1fb6, setclaim_categoryf1fb6}= useContext(TotalContext) as TotalContextProps  
  const {category_total_amount9782f, setcategory_total_amount9782f}= useContext(TotalContext) as TotalContextProps  
  const {attachment04414, setattachment04414}= useContext(TotalContext) as TotalContextProps  
  const {receipt_image6afe2, setreceipt_image6afe2}= useContext(TotalContext) as TotalContextProps  
  const {enabletextb4878, setenabletextb4878}= useContext(TotalContext) as TotalContextProps  
  const {commentsf2394, setcommentsf2394}= useContext(TotalContext) as TotalContextProps  
  const {iscommentenabled7244d, setiscommentenabled7244d}= useContext(TotalContext) as TotalContextProps  
  const {clear14ae7, setclear14ae7}= useContext(TotalContext) as TotalContextProps  
  const {saved507e, setsaved507e}= useContext(TotalContext) as TotalContextProps  
  //////////////


  // Validation
  const [error, setError] = useState<string>('');
  let schemaArray :any =[];


const handleUpdate = async(date: any) => {
  try{
  //setIsProcessing(true);
  setError('')
  setValidate((pre:any)=>({...pre,Request_Screen_Daily_v1:{...pre?.Request_Screen_Daily_v1,expense_date:undefined}}));
  if (!date) {
    setrequest_daily_group44e40((prev: any) => ({ ...prev, expense_date: null }));
    return;
  }
  const now = new Date();
  const [year, month, day] = date.split('-').map(Number);
  const combined = new Date(Date.UTC(year, month - 1, day, now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds()));
  const isoDate = combined.toISOString();
  setrequest_daily_group44e40((prev: any) => ({ ...prev, expense_date: isoDate }))
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
        "483e1dce061b49cebe0c9e46b0844e40",
        "e40909bbfed74180902a610114c92269"
      );
    code=orchestrationData?.data?.code
    if (code != '') {
    let codeStates: any = {};
    codeStates['request_daily_group'] = request_daily_group44e40,
    codeStates['setrequest_daily_group'] = setrequest_daily_group44e40,
    codeStates['request_daily_group44e40'] = request_daily_group44e40Props,
    codeStates['setrequest_daily_group44e40'] = setrequest_daily_group44e40Props,
    codeStates['daily_expense'] = daily_expensefb8cc,
    codeStates['setdaily_expense'] = setdaily_expensefb8cc,
    codeStates['claim_expense_type'] = claim_expense_type22d67,
    codeStates['setclaim_expense_type'] = setclaim_expense_type22d67,
    codeStates['expense_name'] = expense_name5f562,
    codeStates['setexpense_name'] = setexpense_name5f562,
    codeStates['email'] = emailaf076,
    codeStates['setemail'] = setemailaf076,
    codeStates['expense_date'] = expense_date92269,
    codeStates['setexpense_date'] = setexpense_date92269,
    codeStates['claim_category'] = claim_categoryf1fb6,
    codeStates['setclaim_category'] = setclaim_categoryf1fb6,
    codeStates['category_total_amount'] = category_total_amount9782f,
    codeStates['setcategory_total_amount'] = setcategory_total_amount9782f,
    codeStates['attachment'] = attachment04414,
    codeStates['setattachment'] = setattachment04414,
    codeStates['receipt_image'] = receipt_image6afe2,
    codeStates['setreceipt_image'] = setreceipt_image6afe2,
    codeStates['enabletext'] = enabletextb4878,
    codeStates['setenabletext'] = setenabletextb4878,
    codeStates['comments'] = commentsf2394,
    codeStates['setcomments'] = setcommentsf2394,
    codeStates['iscommentenabled'] = iscommentenabled7244d,
    codeStates['setiscommentenabled'] = setiscommentenabled7244d,
    codeStates['clear'] = clear14ae7,
    codeStates['setclear'] = setclear14ae7,
    codeStates['save'] = saved507e,
    codeStates['setsave'] = setsaved507e,
    codeStates['toast'] = toast;
    codeExecution(code,codeStates);
  }
}

useEffect(()=>{
  setrequest_daily_group44e40Props((pre:any)=>({...pre,validation:true}))
 },[expense_date92269?.refresh])

useEffect(()=>{
  handleBlur();
},[validateRefetch.value])


if (expense_date92269?.isHidden) {
  return <></>
}
return (
  <div 
  style={{gridColumn: `5 / 20`,gridRow: `59 / 75`, gap:``, height: `100%`, overflow: 'auto'}} >
    <DatePicker
      className=""
      //label={keyset("")}
      value={request_daily_group44e40?.expense_date}
      onUpdate= {handleUpdate}
      onBlur= {()=>handleBlur()} 
      required={ false }
      readOnly=  {expense_date92269?.isDisabled ? true : false}
      disabled= {expense_date92269?.isDisabled ? true : false}
      contentAlign={"center"}
      headerPosition='top'
      headerText="Expense Date"
      dateValidation=""
      validationState={validate?.Request_Screen_Daily_v1?.expense_date ? "invalid" : undefined}
      errorMessage={error}
      />
  </div>
  )
}

export default DatePickerexpense_date
