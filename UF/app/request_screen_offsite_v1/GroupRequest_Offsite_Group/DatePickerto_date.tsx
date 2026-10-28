

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
  const {request_offsite_group429cb, setrequest_offsite_group429cb}= useContext(TotalContext) as TotalContextProps  
  const {request_offsite_group429cbProps, setrequest_offsite_group429cbProps}= useContext(TotalContext) as TotalContextProps  
  const {offsite_expense39c39, setoffsite_expense39c39}= useContext(TotalContext) as TotalContextProps  
  const {claim_expense_type51f6e, setclaim_expense_type51f6e}= useContext(TotalContext) as TotalContextProps  
  const {expense_namebf755, setexpense_namebf755}= useContext(TotalContext) as TotalContextProps  
  const {emailad8a5, setemailad8a5}= useContext(TotalContext) as TotalContextProps  
  const {from_datee96b6, setfrom_datee96b6}= useContext(TotalContext) as TotalContextProps  
  const {to_dateaf8c4, setto_dateaf8c4}= useContext(TotalContext) as TotalContextProps  
  const {claim_categoryb2e83, setclaim_categoryb2e83}= useContext(TotalContext) as TotalContextProps  
  const {category_total_amounte603b, setcategory_total_amounte603b}= useContext(TotalContext) as TotalContextProps  
  const {attachmentc9c51, setattachmentc9c51}= useContext(TotalContext) as TotalContextProps  
  const {receipt_imageafe30, setreceipt_imageafe30}= useContext(TotalContext) as TotalContextProps  
  const {enableeff29, setenableeff29}= useContext(TotalContext) as TotalContextProps  
  const {comments65b18, setcomments65b18}= useContext(TotalContext) as TotalContextProps  
  const {is_comment_enabled5ca5f, setis_comment_enabled5ca5f}= useContext(TotalContext) as TotalContextProps  
  const {clear2b3e6, setclear2b3e6}= useContext(TotalContext) as TotalContextProps  
  const {add5cae4, setadd5cae4}= useContext(TotalContext) as TotalContextProps  
  const {claimsdetailtablef8143, setclaimsdetailtablef8143}= useContext(TotalContext) as TotalContextProps  
  const {claimsdetailtablef8143Props, setclaimsdetailtablef8143Props}= useContext(TotalContext) as TotalContextProps  
  //////////////


  // Validation
  const [error, setError] = useState<string>('');
  let schemaArray :any =[];


const handleUpdate = async(date: any) => {
  try{
  //setIsProcessing(true);
  setError('')
  setValidate((pre:any)=>({...pre,Request_Screen_Offsite_v1:{...pre?.Request_Screen_Offsite_v1,to_date:undefined}}));
  if (!date) {
    setrequest_offsite_group429cb((prev: any) => ({ ...prev, to_date: null }));
    return;
  }
  const now = new Date();
  const [year, month, day] = date.split('-').map(Number);
  const combined = new Date(Date.UTC(year, month - 1, day, now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds()));
  const isoDate = combined.toISOString();
  setrequest_offsite_group429cb((prev: any) => ({ ...prev, to_date: isoDate }))
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
        "4d39522ee30443598090fe9ac0c429cb",
        "17f33f8141e74fb88e83bb4bc25af8c4"
      );
    code=orchestrationData?.data?.code
    if (code != '') {
    let codeStates: any = {};
    codeStates['request_offsite_group'] = request_offsite_group429cb,
    codeStates['setrequest_offsite_group'] = setrequest_offsite_group429cb,
    codeStates['request_offsite_group429cb'] = request_offsite_group429cbProps,
    codeStates['setrequest_offsite_group429cb'] = setrequest_offsite_group429cbProps,
    codeStates['offsite_expense'] = offsite_expense39c39,
    codeStates['setoffsite_expense'] = setoffsite_expense39c39,
    codeStates['claim_expense_type'] = claim_expense_type51f6e,
    codeStates['setclaim_expense_type'] = setclaim_expense_type51f6e,
    codeStates['expense_name'] = expense_namebf755,
    codeStates['setexpense_name'] = setexpense_namebf755,
    codeStates['email'] = emailad8a5,
    codeStates['setemail'] = setemailad8a5,
    codeStates['from_date'] = from_datee96b6,
    codeStates['setfrom_date'] = setfrom_datee96b6,
    codeStates['to_date'] = to_dateaf8c4,
    codeStates['setto_date'] = setto_dateaf8c4,
    codeStates['claim_category'] = claim_categoryb2e83,
    codeStates['setclaim_category'] = setclaim_categoryb2e83,
    codeStates['category_total_amount'] = category_total_amounte603b,
    codeStates['setcategory_total_amount'] = setcategory_total_amounte603b,
    codeStates['attachment'] = attachmentc9c51,
    codeStates['setattachment'] = setattachmentc9c51,
    codeStates['receipt_image'] = receipt_imageafe30,
    codeStates['setreceipt_image'] = setreceipt_imageafe30,
    codeStates['enable'] = enableeff29,
    codeStates['setenable'] = setenableeff29,
    codeStates['comments'] = comments65b18,
    codeStates['setcomments'] = setcomments65b18,
    codeStates['is_comment_enabled'] = is_comment_enabled5ca5f,
    codeStates['setis_comment_enabled'] = setis_comment_enabled5ca5f,
    codeStates['clear'] = clear2b3e6,
    codeStates['setclear'] = setclear2b3e6,
    codeStates['add'] = add5cae4,
    codeStates['setadd'] = setadd5cae4,
    codeStates['claimsdetailtable'] = claimsdetailtablef8143,
    codeStates['setclaimsdetailtable'] = setclaimsdetailtablef8143,
    codeStates['claimsdetailtablef8143'] = claimsdetailtablef8143Props,
    codeStates['setclaimsdetailtablef8143'] = setclaimsdetailtablef8143Props,
    codeStates['toast'] = toast;
    codeExecution(code,codeStates);
  }
}

useEffect(()=>{
  setrequest_offsite_group429cbProps((pre:any)=>({...pre,validation:true}))
 },[to_dateaf8c4?.refresh])

useEffect(()=>{
  handleBlur();
},[validateRefetch.value])


if (to_dateaf8c4?.isHidden) {
  return <></>
}
return (
  <div 
  style={{gridColumn: `13 / 20`,gridRow: `68 / 84`, gap:``, height: `100%`, overflow: 'auto'}} >
    <DatePicker
      className=""
      //label={keyset("")}
      value={request_offsite_group429cb?.to_date}
      onUpdate= {handleUpdate}
      onBlur= {()=>handleBlur()} 
      required={ false }
      readOnly=  {to_dateaf8c4?.isDisabled ? true : false}
      disabled= {to_dateaf8c4?.isDisabled ? true : false}
      contentAlign={"center"}
      headerPosition='top'
      headerText="To Date"
      dateValidation=""
      validationState={validate?.Request_Screen_Offsite_v1?.to_date ? "invalid" : undefined}
      errorMessage={error}
      />
  </div>
  )
}

export default DatePickerto_date
