

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


const DatePickervalue_date = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
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
  const {payment_info_group1bac9, setpayment_info_group1bac9}= useContext(TotalContext) as TotalContextProps  
  const {payment_info_group1bac9Props, setpayment_info_group1bac9Props}= useContext(TotalContext) as TotalContextProps  
  const {midynamicactions3b39d, setmidynamicactions3b39d}= useContext(TotalContext) as TotalContextProps  
  const {midynamicactions3b39dProps, setmidynamicactions3b39dProps}= useContext(TotalContext) as TotalContextProps  
  const {general_info_groupc83e6, setgeneral_info_groupc83e6}= useContext(TotalContext) as TotalContextProps  
  const {general_info_groupc83e6Props, setgeneral_info_groupc83e6Props}= useContext(TotalContext) as TotalContextProps  
  const {general_info_text_label92c1e, setgeneral_info_text_label92c1e}= useContext(TotalContext) as TotalContextProps  
  const {value_date45767, setvalue_date45767}= useContext(TotalContext) as TotalContextProps  
  const {service_level75e42, setservice_level75e42}= useContext(TotalContext) as TotalContextProps  
  const {purpose75771, setpurpose75771}= useContext(TotalContext) as TotalContextProps  
  const {dbtr_info_group4e8ea, setdbtr_info_group4e8ea}= useContext(TotalContext) as TotalContextProps  
  const {dbtr_info_group4e8eaProps, setdbtr_info_group4e8eaProps}= useContext(TotalContext) as TotalContextProps  
  const {cr_info_groupb01e8, setcr_info_groupb01e8}= useContext(TotalContext) as TotalContextProps  
  const {cr_info_groupb01e8Props, setcr_info_groupb01e8Props}= useContext(TotalContext) as TotalContextProps  
  const {chrg_info_group76ab0, setchrg_info_group76ab0}= useContext(TotalContext) as TotalContextProps  
  const {chrg_info_group76ab0Props, setchrg_info_group76ab0Props}= useContext(TotalContext) as TotalContextProps  
  const {add_info_groupe8dc6, setadd_info_groupe8dc6}= useContext(TotalContext) as TotalContextProps  
  const {add_info_groupe8dc6Props, setadd_info_groupe8dc6Props}= useContext(TotalContext) as TotalContextProps  
  //////////////


  // Validation
  const [error, setError] = useState<string>('');
  let schemaArray :any =[];



        const schema = v.pipe(v.string(),v.minLength(1, 'Date is required'),v.transform((value) => new Date(value)),v.date(),v.maxValue(new Date(), 'Date must be today or in the past'))
const handleUpdate = async(date: any) => {
  try{
  //setIsProcessing(true);
  if(date == "" || date == null || date == undefined) {
    setError('Date is required')
    setValidate((pre:any)=>({...pre,paymentInfo_v1:{...pre?.paymentInfo_v1,value_date: "invalid"}}))
    setgeneral_info_groupc83e6((prev: any) => ({ ...prev, value_date: "" }))
    return;
  }
  setError('')
  setValidate((pre:any)=>({...pre,paymentInfo_v1:{...pre?.paymentInfo_v1,value_date:undefined}}));
  if (!date) {
    setgeneral_info_groupc83e6((prev: any) => ({ ...prev, value_date: null }));
    return;
  }
  const now = new Date();
  const [year, month, day] = date.split('-').map(Number);
  const combined = new Date(Date.UTC(year, month - 1, day, now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds()));
  const isoDate = combined.toISOString();
  setgeneral_info_groupc83e6((prev: any) => ({ ...prev, value_date: isoDate }))
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
    if(general_info_groupc83e6?.value_date == "" || general_info_groupc83e6?.value_date == undefined){
    general_info_groupc83e6.value_date = "";
    const validate:any = v.safeParse(schema, general_info_groupc83e6?.value_date);
    if(!validate.success){
      setError(validate?.issues[0]?.message);
      setValidate((pre:any)=>({...pre,paymentInfo_v1:{...pre?.paymentInfo_v1,value_date:"invalid"}}))
    }else{
    setError('')
    setValidate((pre:any)=>({...pre,paymentInfo_v1:{...pre?.paymentInfo_v1,value_date:undefined}  }))
    }
    }else if(general_info_groupc83e6?.value_date !== ""){
      const validate:any = v.safeParse(schema, general_info_groupc83e6?.value_date);  
      if(!validate.success){
        setError(validate?.issues[0]?.message);
        setValidate((pre:any)=>({...pre,paymentInfo_v1:{...pre?.paymentInfo_v1,value_date: "invalid"}}));
      }
    }
    let code:any;
    const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "583a6242a7134011ab4585091e9c83e6",
        "b00afc39a1314d4a8fe77e5f09345767"
      );
    code=orchestrationData?.data?.code
    if (code != '') {
    let codeStates: any = {};
    codeStates['payment_info_group'] = payment_info_group1bac9,
    codeStates['setpayment_info_group'] = setpayment_info_group1bac9,
    codeStates['payment_info_group1bac9'] = payment_info_group1bac9Props,
    codeStates['setpayment_info_group1bac9'] = setpayment_info_group1bac9Props,
    codeStates['midynamicactions'] = midynamicactions3b39d,
    codeStates['setmidynamicactions'] = setmidynamicactions3b39d,
    codeStates['midynamicactions3b39d'] = midynamicactions3b39dProps,
    codeStates['setmidynamicactions3b39d'] = setmidynamicactions3b39dProps,
    codeStates['general_info_group'] = general_info_groupc83e6,
    codeStates['setgeneral_info_group'] = setgeneral_info_groupc83e6,
    codeStates['general_info_groupc83e6'] = general_info_groupc83e6Props,
    codeStates['setgeneral_info_groupc83e6'] = setgeneral_info_groupc83e6Props,
    codeStates['general_info_text_label'] = general_info_text_label92c1e,
    codeStates['setgeneral_info_text_label'] = setgeneral_info_text_label92c1e,
    codeStates['value_date'] = value_date45767,
    codeStates['setvalue_date'] = setvalue_date45767,
    codeStates['service_level'] = service_level75e42,
    codeStates['setservice_level'] = setservice_level75e42,
    codeStates['purpose'] = purpose75771,
    codeStates['setpurpose'] = setpurpose75771,
    codeStates['dbtr_info_group'] = dbtr_info_group4e8ea,
    codeStates['setdbtr_info_group'] = setdbtr_info_group4e8ea,
    codeStates['dbtr_info_group4e8ea'] = dbtr_info_group4e8eaProps,
    codeStates['setdbtr_info_group4e8ea'] = setdbtr_info_group4e8eaProps,
    codeStates['cr_info_group'] = cr_info_groupb01e8,
    codeStates['setcr_info_group'] = setcr_info_groupb01e8,
    codeStates['cr_info_groupb01e8'] = cr_info_groupb01e8Props,
    codeStates['setcr_info_groupb01e8'] = setcr_info_groupb01e8Props,
    codeStates['chrg_info_group'] = chrg_info_group76ab0,
    codeStates['setchrg_info_group'] = setchrg_info_group76ab0,
    codeStates['chrg_info_group76ab0'] = chrg_info_group76ab0Props,
    codeStates['setchrg_info_group76ab0'] = setchrg_info_group76ab0Props,
    codeStates['add_info_group'] = add_info_groupe8dc6,
    codeStates['setadd_info_group'] = setadd_info_groupe8dc6,
    codeStates['add_info_groupe8dc6'] = add_info_groupe8dc6Props,
    codeStates['setadd_info_groupe8dc6'] = setadd_info_groupe8dc6Props,
    codeStates['toast'] = toast;
    codeExecution(code,codeStates);
  }
}

useEffect(()=>{
    if(!general_info_groupc83e6?.value_date)
    {
      const today = new Date(); today.setHours(0, 0, 0, 0);
      const IST_OFFSET = 5.5 * 60 * 60 * 1000;
      const indiaToday = new Date(today.getTime() + IST_OFFSET);
      setgeneral_info_groupc83e6((pre:any)=>({...pre,value_date:indiaToday.toISOString()}))
    }
  setgeneral_info_groupc83e6Props((pre:any)=>({...pre,validation:true,required:true}))
 },[value_date45767?.refresh])

useEffect(()=>{
  if(!general_info_groupc83e6?.value_date){ 
    setgeneral_info_groupc83e6Props((pre:any)=>({...pre,required:true}));
    setIsRequiredData(true);
  }
  if(validateRefetch.init!=0)
    handleBlur();
},[validateRefetch.value])


if (value_date45767?.isHidden) {
  return <></>
}
return (
  <div 
  style={{gridColumn: `1 / 9`,gridRow: `9 / 23`, gap:``, height: `100%`, overflow: 'auto'}} >
    <DatePicker
      className="!rounded-lg"
      //label={keyset("Date")}
      value={general_info_groupc83e6?.value_date}
      onUpdate= {handleUpdate}
      onBlur= {()=>handleBlur()} 
      required={ true }
      readOnly=  {value_date45767?.isDisabled ? true : false}
      disabled={ true }
      contentAlign={"center"}
      headerPosition='top'
      headerText="Date"
      dateValidation="PastOrPresent"
      validationState={validate?.paymentInfo_v1?.value_date ? "invalid" : undefined}
      errorMessage={error}
      />
  </div>
  )
}

export default DatePickervalue_date
