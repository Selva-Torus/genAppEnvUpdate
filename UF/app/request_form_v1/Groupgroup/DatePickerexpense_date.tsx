

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
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
import * as v from 'valibot';


const DatePickerexpense_date = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
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
  const {group571d2, setgroup571d2}= useContext(TotalContext) as TotalContextProps  
  const {group571d2Props, setgroup571d2Props}= useContext(TotalContext) as TotalContextProps  
  const {dailyexpense64a4c, setdailyexpense64a4c}= useContext(TotalContext) as TotalContextProps  
  const {expense_name136a1, setexpense_name136a1}= useContext(TotalContext) as TotalContextProps  
  const {expense_date7e93b, setexpense_date7e93b}= useContext(TotalContext) as TotalContextProps  
  const {claim_categoryf1c64, setclaim_categoryf1c64}= useContext(TotalContext) as TotalContextProps  
  const {category_total_amount395dd, setcategory_total_amount395dd}= useContext(TotalContext) as TotalContextProps  
  const {receipt_imageb2aec, setreceipt_imageb2aec}= useContext(TotalContext) as TotalContextProps  
  const {commentse3b5b, setcommentse3b5b}= useContext(TotalContext) as TotalContextProps  
  const {group_two6135c, setgroup_two6135c}= useContext(TotalContext) as TotalContextProps  
  const {group_two6135cProps, setgroup_two6135cProps}= useContext(TotalContext) as TotalContextProps  
  const {switch7e8ff, setswitch7e8ff}= useContext(TotalContext) as TotalContextProps  
  const {checkbox53e8f, setcheckbox53e8f}= useContext(TotalContext) as TotalContextProps  
  //////////////


  // Validation
  const [error, setError] = useState<string>('');
  let schemaArray :any =[];


const handleUpdate = async(date: any) => {
  try{
  //setIsProcessing(true);
  setError('')
  setValidate((pre:any)=>({...pre,Request_form_v1:{...pre?.Request_form_v1,expense_date:undefined}}));
  if (!date) {
    setgroup571d2((prev: any) => ({ ...prev, expense_date: null }));
    return;
  }
  const now = new Date();
  const [year, month, day] = date.split('-').map(Number);
  const combined = new Date(Date.UTC(year, month - 1, day, now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds()));
  const isoDate = combined.toISOString();
  setgroup571d2((prev: any) => ({ ...prev, expense_date: isoDate }))
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
        "5a69b1d62572431ab2933ca7cf0571d2",
        "5632ff5fd13545eca69e5a335f37e93b"
      );
    code=orchestrationData?.data?.code
    if (code != '') {
    let codeStates: any = {};
    codeStates['group'] = group571d2,
    codeStates['setgroup'] = setgroup571d2,
    codeStates['group571d2'] = group571d2Props,
    codeStates['setgroup571d2'] = setgroup571d2Props,
    codeStates['dailyexpense'] = dailyexpense64a4c,
    codeStates['setdailyexpense'] = setdailyexpense64a4c,
    codeStates['expense_name'] = expense_name136a1,
    codeStates['setexpense_name'] = setexpense_name136a1,
    codeStates['expense_date'] = expense_date7e93b,
    codeStates['setexpense_date'] = setexpense_date7e93b,
    codeStates['claim_category'] = claim_categoryf1c64,
    codeStates['setclaim_category'] = setclaim_categoryf1c64,
    codeStates['category_total_amount'] = category_total_amount395dd,
    codeStates['setcategory_total_amount'] = setcategory_total_amount395dd,
    codeStates['receipt_image'] = receipt_imageb2aec,
    codeStates['setreceipt_image'] = setreceipt_imageb2aec,
    codeStates['comments'] = commentse3b5b,
    codeStates['setcomments'] = setcommentse3b5b,
    codeStates['group_two'] = group_two6135c,
    codeStates['setgroup_two'] = setgroup_two6135c,
    codeStates['group_two6135c'] = group_two6135cProps,
    codeStates['setgroup_two6135c'] = setgroup_two6135cProps,
    codeStates['switch'] = switch7e8ff,
    codeStates['setswitch'] = setswitch7e8ff,
    codeStates['checkbox'] = checkbox53e8f,
    codeStates['setcheckbox'] = setcheckbox53e8f,
    codeStates['toast'] = toast;
    codeExecution(code,codeStates);
  }
}

useEffect(()=>{
  setgroup571d2Props((pre:any)=>({...pre,validation:true}))
 },[expense_date7e93b?.refresh])

useEffect(()=>{
  handleBlur();
},[validateRefetch.value])


if (expense_date7e93b?.isHidden) {
  return <></>
}
return (
  <div 
  style={{gridColumn: `5 / 20`,gridRow: `36 / 52`, gap:``, height: `100%`, overflow: 'auto'}} >
    <DatePicker
      className=""
      //label={keyset("")}
      value={group571d2?.expense_date}
      onUpdate= {handleUpdate}
      onBlur= {()=>handleBlur()} 
      required={ false }
      readOnly=  {expense_date7e93b?.isDisabled ? true : false}
      disabled= {expense_date7e93b?.isDisabled ? true : false}
      contentAlign={"center"}
      headerPosition='top'
      headerText="Expense Date"
      dateValidation=""
      validationState={validate?.Request_form_v1?.expense_date ? "invalid" : undefined}
      errorMessage={error}
      />
  </div>
  )
}

export default DatePickerexpense_date
