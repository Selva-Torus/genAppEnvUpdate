

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
  const {daily_approval_group69531, setdaily_approval_group69531}= useContext(TotalContext) as TotalContextProps  
  const {daily_approval_group69531Props, setdaily_approval_group69531Props}= useContext(TotalContext) as TotalContextProps  
  const {daily_expense89868, setdaily_expense89868}= useContext(TotalContext) as TotalContextProps  
  const {expense_name88ccc, setexpense_name88ccc}= useContext(TotalContext) as TotalContextProps  
  const {email74f9a, setemail74f9a}= useContext(TotalContext) as TotalContextProps  
  const {claim_category46dd0, setclaim_category46dd0}= useContext(TotalContext) as TotalContextProps  
  const {category_total_amountcf2e2, setcategory_total_amountcf2e2}= useContext(TotalContext) as TotalContextProps  
  const {expense_date08e2f, setexpense_date08e2f}= useContext(TotalContext) as TotalContextProps  
  const {receipt_image3cd01, setreceipt_image3cd01}= useContext(TotalContext) as TotalContextProps  
  const {comments9336d, setcomments9336d}= useContext(TotalContext) as TotalContextProps  
  const {enable666c8, setenable666c8}= useContext(TotalContext) as TotalContextProps  
  const {manager_commentsd309a, setmanager_commentsd309a}= useContext(TotalContext) as TotalContextProps  
  const {is_comment_enablede20a4, setis_comment_enablede20a4}= useContext(TotalContext) as TotalContextProps  
  const {reject28a4c, setreject28a4c}= useContext(TotalContext) as TotalContextProps  
  const {approve28765, setapprove28765}= useContext(TotalContext) as TotalContextProps  
  //////////////


  // Validation
  const [error, setError] = useState<string>('');
  let schemaArray :any =[];


const handleUpdate = async(date: any) => {
  try{
  //setIsProcessing(true);
  setError('')
  setValidate((pre:any)=>({...pre,Approval_Screen_Daily_v1:{...pre?.Approval_Screen_Daily_v1,expense_date:undefined}}));
  if (!date) {
    setdaily_approval_group69531((prev: any) => ({ ...prev, expense_date: null }));
    return;
  }
  const now = new Date();
  const [year, month, day] = date.split('-').map(Number);
  const combined = new Date(Date.UTC(year, month - 1, day, now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds()));
  const isoDate = combined.toISOString();
  setdaily_approval_group69531((prev: any) => ({ ...prev, expense_date: isoDate }))
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
        "91dcb5fe99014c21add21a4d00669531",
        "8bcbde66ffd74815ba3deb487eb08e2f"
      );
    code=orchestrationData?.data?.code
    if (code != '') {
    let codeStates: any = {};
    codeStates['daily_approval_group'] = daily_approval_group69531,
    codeStates['setdaily_approval_group'] = setdaily_approval_group69531,
    codeStates['daily_approval_group69531'] = daily_approval_group69531Props,
    codeStates['setdaily_approval_group69531'] = setdaily_approval_group69531Props,
    codeStates['daily_expense'] = daily_expense89868,
    codeStates['setdaily_expense'] = setdaily_expense89868,
    codeStates['expense_name'] = expense_name88ccc,
    codeStates['setexpense_name'] = setexpense_name88ccc,
    codeStates['email'] = email74f9a,
    codeStates['setemail'] = setemail74f9a,
    codeStates['claim_category'] = claim_category46dd0,
    codeStates['setclaim_category'] = setclaim_category46dd0,
    codeStates['category_total_amount'] = category_total_amountcf2e2,
    codeStates['setcategory_total_amount'] = setcategory_total_amountcf2e2,
    codeStates['expense_date'] = expense_date08e2f,
    codeStates['setexpense_date'] = setexpense_date08e2f,
    codeStates['receipt_image'] = receipt_image3cd01,
    codeStates['setreceipt_image'] = setreceipt_image3cd01,
    codeStates['comments'] = comments9336d,
    codeStates['setcomments'] = setcomments9336d,
    codeStates['enable'] = enable666c8,
    codeStates['setenable'] = setenable666c8,
    codeStates['manager_comments'] = manager_commentsd309a,
    codeStates['setmanager_comments'] = setmanager_commentsd309a,
    codeStates['is_comment_enabled'] = is_comment_enablede20a4,
    codeStates['setis_comment_enabled'] = setis_comment_enablede20a4,
    codeStates['reject'] = reject28a4c,
    codeStates['setreject'] = setreject28a4c,
    codeStates['approve'] = approve28765,
    codeStates['setapprove'] = setapprove28765,
    codeStates['toast'] = toast;
    codeExecution(code,codeStates);
  }
}

useEffect(()=>{
  setdaily_approval_group69531Props((pre:any)=>({...pre,validation:true}))
 },[expense_date08e2f?.refresh])

useEffect(()=>{
  handleBlur();
},[validateRefetch.value])


if (expense_date08e2f?.isHidden) {
  return <></>
}
return (
  <div 
  style={{gridColumn: `3 / 8`,gridRow: `72 / 90`, gap:``, height: `100%`, overflow: 'auto'}} >
    <DatePicker
      className=""
      //label={keyset("")}
      value={daily_approval_group69531?.expense_date}
      onUpdate= {handleUpdate}
      onBlur= {()=>handleBlur()} 
      required={ false }
      readOnly=  {expense_date08e2f?.isDisabled ? true : false}
      disabled= {expense_date08e2f?.isDisabled ? true : false}
      contentAlign={"center"}
      headerPosition='top'
      headerText="Expense Date"
      dateValidation=""
      validationState={validate?.Approval_Screen_Daily_v1?.expense_date ? "invalid" : undefined}
      errorMessage={error}
      />
  </div>
  )
}

export default DatePickerexpense_date
