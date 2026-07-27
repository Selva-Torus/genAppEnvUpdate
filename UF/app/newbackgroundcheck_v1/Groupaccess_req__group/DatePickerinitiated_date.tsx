

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


const DatePickerinitiated_date = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
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
  const {new_access_group03ace, setnew_access_group03ace}= useContext(TotalContext) as TotalContextProps  
  const {new_access_group03aceProps, setnew_access_group03aceProps}= useContext(TotalContext) as TotalContextProps  
  const {access_req__groupdd45d, setaccess_req__groupdd45d}= useContext(TotalContext) as TotalContextProps  
  const {access_req__groupdd45dProps, setaccess_req__groupdd45dProps}= useContext(TotalContext) as TotalContextProps  
  const {basic_inf3b506, setbasic_inf3b506}= useContext(TotalContext) as TotalContextProps  
  const {full_name8ae05, setfull_name8ae05}= useContext(TotalContext) as TotalContextProps  
  const {check_typef3ff8, setcheck_typef3ff8}= useContext(TotalContext) as TotalContextProps  
  const {vendor_namee351e, setvendor_namee351e}= useContext(TotalContext) as TotalContextProps  
  const {initiated_datececee, setinitiated_datececee}= useContext(TotalContext) as TotalContextProps  
  const {completed_date8c01c, setcompleted_date8c01c}= useContext(TotalContext) as TotalContextProps  
  const {result1c616, setresult1c616}= useContext(TotalContext) as TotalContextProps  
  const {verification_status6e272, setverification_status6e272}= useContext(TotalContext) as TotalContextProps  
  const {addt__dts_group0d865, setaddt__dts_group0d865}= useContext(TotalContext) as TotalContextProps  
  const {addt__dts_group0d865Props, setaddt__dts_group0d865Props}= useContext(TotalContext) as TotalContextProps  
  const {dynamicactions2fc7f, setdynamicactions2fc7f}= useContext(TotalContext) as TotalContextProps  
  const {dynamicactions2fc7fProps, setdynamicactions2fc7fProps}= useContext(TotalContext) as TotalContextProps  
  //////////////


  // Validation
  const [error, setError] = useState<string>('');
  let schemaArray :any =[];


          const schema = v.pipe(v.string(),v.minLength(1, 'Date is required'))

const handleUpdate = async(date: any) => {
  try{
  //setIsProcessing(true);
  if(date == "" || date == null || date == undefined) {
    setError('Date is required')
    setValidate((pre:any)=>({...pre,newBackgroundCheck_v1:{...pre?.newBackgroundCheck_v1,initiated_date: "invalid"}}))
    setaccess_req__groupdd45d((prev: any) => ({ ...prev, initiated_date: "" }))
    return;
  }
  setError('')
  setValidate((pre:any)=>({...pre,newBackgroundCheck_v1:{...pre?.newBackgroundCheck_v1,initiated_date:undefined}}));
  if (!date) {
    setaccess_req__groupdd45d((prev: any) => ({ ...prev, initiated_date: null }));
    return;
  }
  const now = new Date();
  const [year, month, day] = date.split('-').map(Number);
  const combined = new Date(Date.UTC(year, month - 1, day, now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds()));
  const isoDate = combined.toISOString();
  setaccess_req__groupdd45d((prev: any) => ({ ...prev, initiated_date: isoDate }))
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
      if(access_req__groupdd45d?.initiated_date == "" || access_req__groupdd45d?.initiated_date == undefined){
        const result = v.safeParse(schema, access_req__groupdd45d?.initiated_date || '');
      if (!result.success) {
        const errorMsg = result.issues[0]?.message || 'Date is required';
        setError(errorMsg);
            setValidate((pre:any)=>({...pre,newBackgroundCheck_v1:{...pre?.newBackgroundCheck_v1,initiated_date: "invalid"}}));
        return;
      }
      }
    let code:any;
    const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "aa63cc980d8a062328ccc4745cadd45d",
        "47f01ef3f9a34736b7924d55973cecee"
      );
    code=orchestrationData?.data?.code
    if (code != '') {
    let codeStates: any = {};
    codeStates['new_access_group'] = new_access_group03ace,
    codeStates['setnew_access_group'] = setnew_access_group03ace,
    codeStates['new_access_group03ace'] = new_access_group03aceProps,
    codeStates['setnew_access_group03ace'] = setnew_access_group03aceProps,
    codeStates['access_req__group'] = access_req__groupdd45d,
    codeStates['setaccess_req__group'] = setaccess_req__groupdd45d,
    codeStates['access_req__groupdd45d'] = access_req__groupdd45dProps,
    codeStates['setaccess_req__groupdd45d'] = setaccess_req__groupdd45dProps,
    codeStates['basic_inf'] = basic_inf3b506,
    codeStates['setbasic_inf'] = setbasic_inf3b506,
    codeStates['full_name'] = full_name8ae05,
    codeStates['setfull_name'] = setfull_name8ae05,
    codeStates['check_type'] = check_typef3ff8,
    codeStates['setcheck_type'] = setcheck_typef3ff8,
    codeStates['vendor_name'] = vendor_namee351e,
    codeStates['setvendor_name'] = setvendor_namee351e,
    codeStates['initiated_date'] = initiated_datececee,
    codeStates['setinitiated_date'] = setinitiated_datececee,
    codeStates['completed_date'] = completed_date8c01c,
    codeStates['setcompleted_date'] = setcompleted_date8c01c,
    codeStates['result'] = result1c616,
    codeStates['setresult'] = setresult1c616,
    codeStates['verification_status'] = verification_status6e272,
    codeStates['setverification_status'] = setverification_status6e272,
    codeStates['addt__dts_group'] = addt__dts_group0d865,
    codeStates['setaddt__dts_group'] = setaddt__dts_group0d865,
    codeStates['addt__dts_group0d865'] = addt__dts_group0d865Props,
    codeStates['setaddt__dts_group0d865'] = setaddt__dts_group0d865Props,
    codeStates['dynamicactions'] = dynamicactions2fc7f,
    codeStates['setdynamicactions'] = setdynamicactions2fc7f,
    codeStates['dynamicactions2fc7f'] = dynamicactions2fc7fProps,
    codeStates['setdynamicactions2fc7f'] = setdynamicactions2fc7fProps,
    codeStates['toast'] = toast;
    codeExecution(code,codeStates);
  }
}

useEffect(()=>{
  setaccess_req__groupdd45dProps((pre:any)=>({...pre,validation:true,required:true}))
 },[initiated_datececee?.refresh])

useEffect(()=>{
  if(!access_req__groupdd45d?.initiated_date){ 
    setaccess_req__groupdd45dProps((pre:any)=>({...pre,required:true}));
    setIsRequiredData(true);
  }
  if(validateRefetch.init!=0)
    handleBlur();
},[validateRefetch.value])


if (initiated_datececee?.isHidden) {
  return <></>
}
return (
  <div 
  style={{gridColumn: `19 / 25`,gridRow: `7 / 19`, gap:``, height: `100%`, overflow: 'auto'}} >
    <DatePicker
      className=""
      //label={keyset("")}
      value={access_req__groupdd45d?.initiated_date}
      onUpdate= {handleUpdate}
      onBlur= {()=>handleBlur()} 
      required={ true }
      readOnly=  {initiated_datececee?.isDisabled ? true : false}
      disabled= {initiated_datececee?.isDisabled ? true : false}
      contentAlign={"center"}
      headerPosition='top'
      headerText="Initiated Date"
      dateValidation=""
      validationState={validate?.newBackgroundCheck_v1?.initiated_date ? "invalid" : undefined}
      errorMessage={error}
      />
  </div>
  )
}

export default DatePickerinitiated_date
