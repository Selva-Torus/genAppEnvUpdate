

'use client'
import React, { useState,useContext,useEffect } from 'react'
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


const DatePickernext_maintenance_date = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
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
  const {maintenance_groupdb5a7, setmaintenance_groupdb5a7}= useContext(TotalContext) as TotalContextProps  
  const {maintenance_groupdb5a7Props, setmaintenance_groupdb5a7Props}= useContext(TotalContext) as TotalContextProps  
  const {maintenance_information_groupea3ac, setmaintenance_information_groupea3ac}= useContext(TotalContext) as TotalContextProps  
  const {maintenance_information_groupea3acProps, setmaintenance_information_groupea3acProps}= useContext(TotalContext) as TotalContextProps  
  const {maintenance_information_text37a24, setmaintenance_information_text37a24}= useContext(TotalContext) as TotalContextProps  
  const {asset_namec21fd, setasset_namec21fd}= useContext(TotalContext) as TotalContextProps  
  const {maint_typea5ba4, setmaint_typea5ba4}= useContext(TotalContext) as TotalContextProps  
  const {priorityec586, setpriorityec586}= useContext(TotalContext) as TotalContextProps  
  const {scheduled_date83e9d, setscheduled_date83e9d}= useContext(TotalContext) as TotalContextProps  
  const {completed_dated052f, setcompleted_dated052f}= useContext(TotalContext) as TotalContextProps  
  const {next_maintenance_datee871a, setnext_maintenance_datee871a}= useContext(TotalContext) as TotalContextProps  
  const {execution_details_group591cd, setexecution_details_group591cd}= useContext(TotalContext) as TotalContextProps  
  const {execution_details_group591cdProps, setexecution_details_group591cdProps}= useContext(TotalContext) as TotalContextProps  
  const {dynamicactions8672d, setdynamicactions8672d}= useContext(TotalContext) as TotalContextProps  
  const {dynamicactions8672dProps, setdynamicactions8672dProps}= useContext(TotalContext) as TotalContextProps  
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
    setValidate((pre:any)=>({...pre,logMaintenance_v1:{...pre?.logMaintenance_v1,next_maintenance_date: "invalid"}}))
    setmaintenance_information_groupea3ac((prev: any) => ({ ...prev, next_maintenance_date: "" }))
    return;
  }
  setError('')
  setValidate((pre:any)=>({...pre,logMaintenance_v1:{...pre?.logMaintenance_v1,next_maintenance_date:undefined}}));
  if (!date) {
    setmaintenance_information_groupea3ac((prev: any) => ({ ...prev, next_maintenance_date: null }));
    return;
  }
  const selectedDate = new Date(date);
  const IST_OFFSET = 5.5 * 60 * 60 * 1000; 
  const indiaTime = new Date(selectedDate.getTime() + IST_OFFSET);
  const isoDate = indiaTime.toISOString();
  setmaintenance_information_groupea3ac((prev: any) => ({ ...prev, next_maintenance_date: isoDate }))
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
      if(maintenance_information_groupea3ac?.next_maintenance_date == "" || maintenance_information_groupea3ac?.next_maintenance_date == undefined){
        const result = v.safeParse(schema, maintenance_information_groupea3ac?.next_maintenance_date || '');
      if (!result.success) {
        const errorMsg = result.issues[0]?.message || 'Date is required';
        setError(errorMsg);
            setValidate((pre:any)=>({...pre,logMaintenance_v1:{...pre?.logMaintenance_v1,next_maintenance_date: "invalid"}}));
        return;
      }
      }
    let code:any;
    const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "72ef8f904ecb42bd9310191c694ea3ac",
        "b07de6134213449c844fced75e5e871a"
      );
    code=orchestrationData?.data?.code
    if (code != '') {
    let codeStates: any = {};
    codeStates['maintenance_group'] = maintenance_groupdb5a7,
    codeStates['setmaintenance_group'] = setmaintenance_groupdb5a7,
    codeStates['maintenance_groupdb5a7'] = maintenance_groupdb5a7Props,
    codeStates['setmaintenance_groupdb5a7'] = setmaintenance_groupdb5a7Props,
    codeStates['maintenance_information_group'] = maintenance_information_groupea3ac,
    codeStates['setmaintenance_information_group'] = setmaintenance_information_groupea3ac,
    codeStates['maintenance_information_groupea3ac'] = maintenance_information_groupea3acProps,
    codeStates['setmaintenance_information_groupea3ac'] = setmaintenance_information_groupea3acProps,
    codeStates['maintenance_information_text'] = maintenance_information_text37a24,
    codeStates['setmaintenance_information_text'] = setmaintenance_information_text37a24,
    codeStates['asset_name'] = asset_namec21fd,
    codeStates['setasset_name'] = setasset_namec21fd,
    codeStates['maint_type'] = maint_typea5ba4,
    codeStates['setmaint_type'] = setmaint_typea5ba4,
    codeStates['priority'] = priorityec586,
    codeStates['setpriority'] = setpriorityec586,
    codeStates['scheduled_date'] = scheduled_date83e9d,
    codeStates['setscheduled_date'] = setscheduled_date83e9d,
    codeStates['completed_date'] = completed_dated052f,
    codeStates['setcompleted_date'] = setcompleted_dated052f,
    codeStates['next_maintenance_date'] = next_maintenance_datee871a,
    codeStates['setnext_maintenance_date'] = setnext_maintenance_datee871a,
    codeStates['execution_details_group'] = execution_details_group591cd,
    codeStates['setexecution_details_group'] = setexecution_details_group591cd,
    codeStates['execution_details_group591cd'] = execution_details_group591cdProps,
    codeStates['setexecution_details_group591cd'] = setexecution_details_group591cdProps,
    codeStates['dynamicactions'] = dynamicactions8672d,
    codeStates['setdynamicactions'] = setdynamicactions8672d,
    codeStates['dynamicactions8672d'] = dynamicactions8672dProps,
    codeStates['setdynamicactions8672d'] = setdynamicactions8672dProps,
    codeStates['toast'] = toast;
    codeExecution(code,codeStates);
  }
}

useEffect(()=>{
  setmaintenance_information_groupea3acProps((pre:any)=>({...pre,validation:true,required:true}))
 },[next_maintenance_datee871a?.refresh])

useEffect(()=>{
  if(!maintenance_information_groupea3ac?.next_maintenance_date){ 
    setmaintenance_information_groupea3acProps((pre:any)=>({...pre,required:true}));
    setIsRequiredData(true);
  }
  if(validateRefetch.init!=0)
    handleBlur();
},[validateRefetch.value])

if (next_maintenance_datee871a?.isHidden) {
  return <></>
}
return (
  <div 
  style={{gridColumn: `17 / 25`,gridRow: `21 / 33`, gap:``, height: `100%`, overflow: 'auto'}} >
    <DatePicker
      className="!rounded-md"
      //label={keyset("")}
      value={maintenance_information_groupea3ac?.next_maintenance_date}
      onUpdate= {handleUpdate}
      onBlur= {()=>handleBlur()} 
      required={ true }
      readOnly=  {next_maintenance_datee871a?.isDisabled ? true : false}
      disabled= {next_maintenance_datee871a?.isDisabled ? true : false}
      contentAlign={"center"}
      headerPosition='top'
      headerText="Next Maintenance Date"
      dateValidation=""
      validationState={validate?.logMaintenance_v1?.next_maintenance_date ? "invalid" : undefined}
      errorMessage={error}
      />
  </div>
  )
}

export default DatePickernext_maintenance_date
