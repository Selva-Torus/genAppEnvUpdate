

'use client'
import React, { useState,useContext,useEffect,useRef } from 'react'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import i18n from '@/app/components/i18n';
import { getCookie } from '@/app/components/cookieMgment';
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


const DatePickerdatepicker = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
  const token:string = getCookie('token'); 
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
  const {group7f2ed, setgroup7f2ed}= useContext(TotalContext) as TotalContextProps  
  const {group7f2edProps, setgroup7f2edProps}= useContext(TotalContext) as TotalContextProps  
  const {textinputd0435, settextinputd0435}= useContext(TotalContext) as TotalContextProps  
  const {textinput5daae3, settextinput5daae3}= useContext(TotalContext) as TotalContextProps  
  const {dateandtimec481e, setdateandtimec481e}= useContext(TotalContext) as TotalContextProps  
  const {datepicker019ca, setdatepicker019ca}= useContext(TotalContext) as TotalContextProps  
  const {textinput165d1d, settextinput165d1d}= useContext(TotalContext) as TotalContextProps  
  const {textinput204f11, settextinput204f11}= useContext(TotalContext) as TotalContextProps  
  const {textinput38ac83, settextinput38ac83}= useContext(TotalContext) as TotalContextProps  
  const {textinput455cca, settextinput455cca}= useContext(TotalContext) as TotalContextProps  
  //////////////


  // Validation
  const [error, setError] = useState<string>('');
  let schemaArray :any =[];



        const today = new Date();
         today.setHours(0, 0, 0, 0); // Set to midnight (start of today)
          const tomorrow = new Date(today);
          tomorrow.setDate(tomorrow.getDate() + 1); // Move to tomorrow
           const schema = v.pipe(v.string(),v.minLength(1, 'Date is required'),v.transform((value) => new Date(value)),v.date(),v.minValue(today, 'Date must be in the future'));
const handleUpdate = async(date: any) => {
  try{
  //setIsProcessing(true);
  if(date == "" || date == null || date == undefined) {
    setError('Date is required')
    setValidate((pre:any)=>({...pre,ffff_v1:{...pre?.ffff_v1,datepicker: "invalid"}}))
    setgroup7f2ed((prev: any) => ({ ...prev, datepicker: "" }))
    return;
  }
  setError('')
  setValidate((pre:any)=>({...pre,ffff_v1:{...pre?.ffff_v1,datepicker:undefined}}));
  if (!date) {
    setgroup7f2ed((prev: any) => ({ ...prev, datepicker: null }));
    return;
  }
  const now = new Date();
  const [year, month, day] = date.split('-').map(Number);
  const combined = new Date(Date.UTC(year, month - 1, day, now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds()));
  const isoDate = combined.toISOString();
  setgroup7f2ed((prev: any) => ({ ...prev, datepicker: isoDate }))
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
    if(group7f2ed?.datepicker == "" || group7f2ed?.datepicker == undefined){
    group7f2ed.datepicker = "";
    const validate:any = v.safeParse(schema, group7f2ed?.datepicker);
    if(!validate.success){
      setError(validate?.issues[0]?.message);
      setValidate((pre:any)=>({...pre,ffff_v1:{...pre?.ffff_v1,datepicker:"invalid"}}))
    }else{
    setError('')
    setValidate((pre:any)=>({...pre,ffff_v1:{...pre?.ffff_v1,datepicker:undefined}  }))
    }
    }else if(group7f2ed?.datepicker !== ""){
      const validate:any = v.safeParse(schema, group7f2ed?.datepicker);  
      if(!validate.success){
        setError(validate?.issues[0]?.message);
        setValidate((pre:any)=>({...pre,ffff_v1:{...pre?.ffff_v1,datepicker: "invalid"}}));
      }
    }
    let code:any;
    const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "aaa21094dc8b49d0be2621f7ea87f2ed",
        "49b11ec802dc46d3a1943e43733019ca"
      );
    code=orchestrationData?.data?.code
    if (code != '') {
    let codeStates: any = {};
    codeStates['group'] = group7f2ed,
    codeStates['setgroup'] = setgroup7f2ed,
    codeStates['group7f2ed'] = group7f2edProps,
    codeStates['setgroup7f2ed'] = setgroup7f2edProps,
    codeStates['textinput'] = textinputd0435,
    codeStates['settextinput'] = settextinputd0435,
    codeStates['textinput5'] = textinput5daae3,
    codeStates['settextinput5'] = settextinput5daae3,
    codeStates['dateandtime'] = dateandtimec481e,
    codeStates['setdateandtime'] = setdateandtimec481e,
    codeStates['datepicker'] = datepicker019ca,
    codeStates['setdatepicker'] = setdatepicker019ca,
    codeStates['textinput1'] = textinput165d1d,
    codeStates['settextinput1'] = settextinput165d1d,
    codeStates['textinput2'] = textinput204f11,
    codeStates['settextinput2'] = settextinput204f11,
    codeStates['textinput3'] = textinput38ac83,
    codeStates['settextinput3'] = settextinput38ac83,
    codeStates['textinput4'] = textinput455cca,
    codeStates['settextinput4'] = settextinput455cca,
    codeStates['toast'] = toast;
    codeExecution(code,codeStates);
  }
}

useEffect(()=>{
  setgroup7f2edProps((pre:any)=>({...pre,validation:true,required:true}))
 },[datepicker019ca?.refresh])

useEffect(()=>{
  if(!group7f2ed?.datepicker){ 
    setgroup7f2edProps((pre:any)=>({...pre,required:true}));
    setIsRequiredData(true);
  }
  if(validateRefetch.init!=0)
    handleBlur();
},[validateRefetch.value])


if (datepicker019ca?.isHidden) {
  return <></>
}
return (
  <div 
  style={{gridColumn: `20 / 22`,gridRow: `16 / 26`, gap:``, height: `100%`, overflow: 'auto'}} >
        {<span style={{ color: 'red' }}>*</span>}
    <DatePicker
      className=""
      //label={keyset("")}
      value={group7f2ed?.datepicker}
      onUpdate= {handleUpdate}
      onBlur= {()=>handleBlur()} 
      required={ true }
      readOnly=  {datepicker019ca?.isDisabled ? true : false}
      disabled= {datepicker019ca?.isDisabled ? true : false}
      contentAlign={"center"}
      dateValidation="Future"
      validationState={validate?.ffff_v1?.datepicker ? "invalid" : undefined}
      errorMessage={error}
      />
  </div>
  )
}

export default DatePickerdatepicker
