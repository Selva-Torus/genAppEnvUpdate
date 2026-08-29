

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
  const {grouparray494e0_0, setgrouparray494e0_0}= useContext(TotalContext) as TotalContextProps  
  const {grouparray494e0_0Props, setgrouparray494e0_0Props}= useContext(TotalContext) as TotalContextProps  
  const {grouparray494e0_1, setgrouparray494e0_1}= useContext(TotalContext) as TotalContextProps  
  const {grouparray494e0_1Props, setgrouparray494e0_1Props}= useContext(TotalContext) as TotalContextProps  
  const {grouparray494e0_2, setgrouparray494e0_2}= useContext(TotalContext) as TotalContextProps  
  const {grouparray494e0_2Props, setgrouparray494e0_2Props}= useContext(TotalContext) as TotalContextProps  
  const {grouparray494e0_3, setgrouparray494e0_3}= useContext(TotalContext) as TotalContextProps  
  const {grouparray494e0_3Props, setgrouparray494e0_3Props}= useContext(TotalContext) as TotalContextProps  
  const {grouparray494e0_4, setgrouparray494e0_4}= useContext(TotalContext) as TotalContextProps  
  const {grouparray494e0_4Props, setgrouparray494e0_4Props}= useContext(TotalContext) as TotalContextProps  
  const {grouparray494e0_5, setgrouparray494e0_5}= useContext(TotalContext) as TotalContextProps  
  const {grouparray494e0_5Props, setgrouparray494e0_5Props}= useContext(TotalContext) as TotalContextProps  
  const {group84b9c, setgroup84b9c}= useContext(TotalContext) as TotalContextProps  
  const {group84b9cProps, setgroup84b9cProps}= useContext(TotalContext) as TotalContextProps  
  const {grouparray494e0, setgrouparray494e0}= useContext(TotalContext) as TotalContextProps  
  const {grouparray494e0Props, setgrouparray494e0Props}= useContext(TotalContext) as TotalContextProps  
  const {daily_expense3c178, setdaily_expense3c178}= useContext(TotalContext) as TotalContextProps  
  const {expense_namec83ee, setexpense_namec83ee}= useContext(TotalContext) as TotalContextProps  
  const {email0c3ca, setemail0c3ca}= useContext(TotalContext) as TotalContextProps  
  const {expense_datee6e16, setexpense_datee6e16}= useContext(TotalContext) as TotalContextProps  
  const {claim_categoryf03f1, setclaim_categoryf03f1}= useContext(TotalContext) as TotalContextProps  
  const {category_total_amount49375, setcategory_total_amount49375}= useContext(TotalContext) as TotalContextProps  
  const {receipt_image4f1bf, setreceipt_image4f1bf}= useContext(TotalContext) as TotalContextProps  
  const {comments7171e, setcomments7171e}= useContext(TotalContext) as TotalContextProps  
  //////////////


  // Validation
  const [error, setError] = useState<string>('');
  let schemaArray :any =[];


const handleUpdate = async(date: any) => {
  try{
  //setIsProcessing(true);
  setError('')
  setValidate((pre:any)=>({...pre,GroupArray_v1:{...pre?.GroupArray_v1,expense_date:undefined}}));
  if (!date) {
    setgrouparray494e0_1((prev: any) => ({ ...prev, expense_date: null }));
    return;
  }
  const now = new Date();
  const [year, month, day] = date.split('-').map(Number);
  const combined = new Date(Date.UTC(year, month - 1, day, now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds()));
  const isoDate = combined.toISOString();
  setgrouparray494e0_1((prev: any) => ({ ...prev, expense_date: isoDate }))
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
        "05177fac499640d4bf45a199a95494e0",
        "bbf5be6f5131438696a9477fcade6e16"
      );
    code=orchestrationData?.data?.code
    if (code != '') {
    let codeStates: any = {};
    codeStates['grouparray49'] = grouparray494e0_0,
    codeStates['setgrouparray49'] = setgrouparray494e0_0,
    codeStates['grouparray494e0_0'] = grouparray494e0_0Props,
    codeStates['setgrouparray494e0_0'] = setgrouparray494e0_0Props,
    codeStates['grouparray49'] = grouparray494e0_1,
    codeStates['setgrouparray49'] = setgrouparray494e0_1,
    codeStates['grouparray494e0_1'] = grouparray494e0_1Props,
    codeStates['setgrouparray494e0_1'] = setgrouparray494e0_1Props,
    codeStates['grouparray49'] = grouparray494e0_2,
    codeStates['setgrouparray49'] = setgrouparray494e0_2,
    codeStates['grouparray494e0_2'] = grouparray494e0_2Props,
    codeStates['setgrouparray494e0_2'] = setgrouparray494e0_2Props,
    codeStates['grouparray49'] = grouparray494e0_3,
    codeStates['setgrouparray49'] = setgrouparray494e0_3,
    codeStates['grouparray494e0_3'] = grouparray494e0_3Props,
    codeStates['setgrouparray494e0_3'] = setgrouparray494e0_3Props,
    codeStates['grouparray49'] = grouparray494e0_4,
    codeStates['setgrouparray49'] = setgrouparray494e0_4,
    codeStates['grouparray494e0_4'] = grouparray494e0_4Props,
    codeStates['setgrouparray494e0_4'] = setgrouparray494e0_4Props,
    codeStates['grouparray49'] = grouparray494e0_5,
    codeStates['setgrouparray49'] = setgrouparray494e0_5,
    codeStates['grouparray494e0_5'] = grouparray494e0_5Props,
    codeStates['setgrouparray494e0_5'] = setgrouparray494e0_5Props,
    codeStates['group'] = group84b9c,
    codeStates['setgroup'] = setgroup84b9c,
    codeStates['group84b9c'] = group84b9cProps,
    codeStates['setgroup84b9c'] = setgroup84b9cProps,
    codeStates['grouparray'] = grouparray494e0,
    codeStates['setgrouparray'] = setgrouparray494e0,
    codeStates['grouparray494e0'] = grouparray494e0Props,
    codeStates['setgrouparray494e0'] = setgrouparray494e0Props,
    codeStates['daily_expense'] = daily_expense3c178,
    codeStates['setdaily_expense'] = setdaily_expense3c178,
    codeStates['expense_name'] = expense_namec83ee,
    codeStates['setexpense_name'] = setexpense_namec83ee,
    codeStates['email'] = email0c3ca,
    codeStates['setemail'] = setemail0c3ca,
    codeStates['expense_date'] = expense_datee6e16,
    codeStates['setexpense_date'] = setexpense_datee6e16,
    codeStates['claim_category'] = claim_categoryf03f1,
    codeStates['setclaim_category'] = setclaim_categoryf03f1,
    codeStates['category_total_amount'] = category_total_amount49375,
    codeStates['setcategory_total_amount'] = setcategory_total_amount49375,
    codeStates['receipt_image'] = receipt_image4f1bf,
    codeStates['setreceipt_image'] = setreceipt_image4f1bf,
    codeStates['comments'] = comments7171e,
    codeStates['setcomments'] = setcomments7171e,
      codeStates['grouparray_0'] = grouparray494e0_0,
      codeStates['setgrouparray_0'] = setgrouparray494e0_0,
      codeStates['grouparray_1'] = grouparray494e0_1,
      codeStates['setgrouparray_1'] = setgrouparray494e0_1,
      codeStates['grouparray_2'] = grouparray494e0_2,
      codeStates['setgrouparray_2'] = setgrouparray494e0_2,
      codeStates['grouparray_3'] = grouparray494e0_3,
      codeStates['setgrouparray_3'] = setgrouparray494e0_3,
      codeStates['grouparray_4'] = grouparray494e0_4,
      codeStates['setgrouparray_4'] = setgrouparray494e0_4,
      codeStates['grouparray_5'] = grouparray494e0_5,
      codeStates['setgrouparray_5'] = setgrouparray494e0_5,
    codeStates['toast'] = toast;
    codeExecution(code,codeStates);
  }
}

useEffect(()=>{
  setgrouparray494e0_1Props((pre:any)=>({...pre,validation:true}))
 },[expense_datee6e16?.refresh])

useEffect(()=>{
  handleBlur();
},[validateRefetch.value])


if (expense_datee6e16?.isHidden) {
  return <></>
}
return (
  <div 
  style={{gridColumn: `10 / 17`,gridRow: `57 / 72`, gap:``, height: `100%`, overflow: 'auto'}} >
    <DatePicker
      className=""
      //label={keyset("")}
      value={grouparray494e0_1?.expense_date}
      onUpdate= {handleUpdate}
      onBlur= {()=>handleBlur()} 
      required={ false }
      readOnly=  {expense_datee6e16?.isDisabled ? true : false}
      disabled= {expense_datee6e16?.isDisabled ? true : false}
      contentAlign={"center"}
      headerPosition='top'
      headerText="Expense Date"
      dateValidation=""
      validationState={validate?.GroupArray_v1?.expense_date ? "invalid" : undefined}
      errorMessage={error}
      />
  </div>
  )
}

export default DatePickerexpense_date
