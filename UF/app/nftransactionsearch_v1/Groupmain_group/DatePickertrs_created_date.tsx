

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


const DatePickertrs_created_date = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
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
  const {main_group746bf, setmain_group746bf}= useContext(TotalContext) as TotalContextProps  
  const {main_group746bfProps, setmain_group746bfProps}= useContext(TotalContext) as TotalContextProps  
  const {search_label130a2, setsearch_label130a2}= useContext(TotalContext) as TotalContextProps  
  const {top_dividerdea5b, settop_dividerdea5b}= useContext(TotalContext) as TotalContextProps  
  const {trs_created_date28cb9, settrs_created_date28cb9}= useContext(TotalContext) as TotalContextProps  
  const {uuida0e9e, setuuida0e9e}= useContext(TotalContext) as TotalContextProps  
  const {debtor_account_no1b62b, setdebtor_account_no1b62b}= useContext(TotalContext) as TotalContextProps  
  const {debtor_name908b6, setdebtor_name908b6}= useContext(TotalContext) as TotalContextProps  
  const {creditor_account_no14a5f, setcreditor_account_no14a5f}= useContext(TotalContext) as TotalContextProps  
  const {cr_name1ecf4, setcr_name1ecf4}= useContext(TotalContext) as TotalContextProps  
  const {cr_currencydbebf, setcr_currencydbebf}= useContext(TotalContext) as TotalContextProps  
  const {cr_amounta1974, setcr_amounta1974}= useContext(TotalContext) as TotalContextProps  
  const {message_codefa765, setmessage_codefa765}= useContext(TotalContext) as TotalContextProps  
  const {bottom_divideradc51, setbottom_divideradc51}= useContext(TotalContext) as TotalContextProps  
  const {search4197d, setsearch4197d}= useContext(TotalContext) as TotalContextProps  
  const {clear91c04, setclear91c04}= useContext(TotalContext) as TotalContextProps  
  //////////////


  // Validation
  const [error, setError] = useState<string>('');
  let schemaArray :any =[];


const handleUpdate = async(date: any) => {
  try{
  //setIsProcessing(true);
  setError('')
  setValidate((pre:any)=>({...pre,nfTransactionSearch_v1:{...pre?.nfTransactionSearch_v1,tran_date:undefined}}));
  if (!date) {
    setmain_group746bf((prev: any) => ({ ...prev, tran_date: null }));
    return;
  }
  const now = new Date();
  const [year, month, day] = date.split('-').map(Number);
  const combined = new Date(Date.UTC(year, month - 1, day, now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds()));
  const isoDate = combined.toISOString();
  setmain_group746bf((prev: any) => ({ ...prev, tran_date: isoDate }))
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
        "3784ce38ae1194ccec87c8de818746bf",
        "68c2ba81792795003e9cee34b7228cb9"
      );
    code=orchestrationData?.data?.code
    if (code != '') {
    let codeStates: any = {};
    codeStates['main_group'] = main_group746bf,
    codeStates['setmain_group'] = setmain_group746bf,
    codeStates['main_group746bf'] = main_group746bfProps,
    codeStates['setmain_group746bf'] = setmain_group746bfProps,
    codeStates['search_label'] = search_label130a2,
    codeStates['setsearch_label'] = setsearch_label130a2,
    codeStates['top_divider'] = top_dividerdea5b,
    codeStates['settop_divider'] = settop_dividerdea5b,
    codeStates['trs_created_date'] = trs_created_date28cb9,
    codeStates['settrs_created_date'] = settrs_created_date28cb9,
    codeStates['uuid'] = uuida0e9e,
    codeStates['setuuid'] = setuuida0e9e,
    codeStates['debtor_account_no'] = debtor_account_no1b62b,
    codeStates['setdebtor_account_no'] = setdebtor_account_no1b62b,
    codeStates['debtor_name'] = debtor_name908b6,
    codeStates['setdebtor_name'] = setdebtor_name908b6,
    codeStates['creditor_account_no'] = creditor_account_no14a5f,
    codeStates['setcreditor_account_no'] = setcreditor_account_no14a5f,
    codeStates['cr_name'] = cr_name1ecf4,
    codeStates['setcr_name'] = setcr_name1ecf4,
    codeStates['cr_currency'] = cr_currencydbebf,
    codeStates['setcr_currency'] = setcr_currencydbebf,
    codeStates['cr_amount'] = cr_amounta1974,
    codeStates['setcr_amount'] = setcr_amounta1974,
    codeStates['message_code'] = message_codefa765,
    codeStates['setmessage_code'] = setmessage_codefa765,
    codeStates['bottom_divider'] = bottom_divideradc51,
    codeStates['setbottom_divider'] = setbottom_divideradc51,
    codeStates['search'] = search4197d,
    codeStates['setsearch'] = setsearch4197d,
    codeStates['clear'] = clear91c04,
    codeStates['setclear'] = setclear91c04,
    codeStates['toast'] = toast;
    codeExecution(code,codeStates);
  }
}

useEffect(()=>{
    if(!main_group746bf?.tran_date)
    {
      const today = new Date(); today.setHours(0, 0, 0, 0);
      const IST_OFFSET = 5.5 * 60 * 60 * 1000;
      const indiaToday = new Date(today.getTime() + IST_OFFSET);
      setmain_group746bf((pre:any)=>({...pre,tran_date:indiaToday.toISOString()}))
    }
  setmain_group746bfProps((pre:any)=>({...pre,validation:true}))
 },[trs_created_date28cb9?.refresh])

useEffect(()=>{
  handleBlur();
},[validateRefetch.value])


if (trs_created_date28cb9?.isHidden) {
  return <></>
}
return (
  <div 
  style={{gridColumn: `1 / 9`,gridRow: `15 / 29`, gap:``, height: `100%`, overflow: 'auto'}} >
    <DatePicker
      className="!rounded-lg"
      //label={keyset("")}
      value={main_group746bf?.tran_date}
      onUpdate= {handleUpdate}
      onBlur= {()=>handleBlur()} 
      required={ false }
      readOnly=  {trs_created_date28cb9?.isDisabled ? true : false}
      disabled= {trs_created_date28cb9?.isDisabled ? true : false}
      contentAlign={"center"}
      headerPosition='top'
      headerText="Created Date"
      dateValidation=""
      validationState={validate?.nfTransactionSearch_v1?.tran_date ? "invalid" : undefined}
      errorMessage={error}
      />
  </div>
  )
}

export default DatePickertrs_created_date
