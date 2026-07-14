

'use client'
import React, { useState,useContext,useEffect } from 'react'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import i18n from '@/app/components/i18n';
import { getCookie } from '@/app/components/cookieMgment';
import { codeExecution } from '@/app/utils/codeExecution';
import { AxiosService } from '@/app/components/axiosService';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useRouter } from 'next/navigation'
import { DateAndTime } from '@/components/DateAndTime';
import { Text } from '@/components/Text';
import { Modal } from '@/components/Modal';
import { eventBus } from '@/app/eventBus';
import { getFilterProps, getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { useHandleDfdRefresh } from '@/context/dfdRefreshContext';
import { eventDecisionTable } from '@/app/utils/evaluateDecisionTable';
import decodeToken from '@/app/components/decodeToken';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
import * as v from 'valibot';


const DatePickerdateandtime = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
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
  const {group123488888, setgroup123488888}= useContext(TotalContext) as TotalContextProps  
  const {group123488888Props, setgroup123488888Props}= useContext(TotalContext) as TotalContextProps  
  const {stateaa824, setstateaa824}= useContext(TotalContext) as TotalContextProps  
  const {stateaa824Props, setstateaa824Props}= useContext(TotalContext) as TotalContextProps  
  const {groupaaa97733, setgroupaaa97733}= useContext(TotalContext) as TotalContextProps  
  const {groupaaa97733Props, setgroupaaa97733Props}= useContext(TotalContext) as TotalContextProps  
  const {groupc0c048, setgroupc0c048}= useContext(TotalContext) as TotalContextProps  
  const {groupc0c048Props, setgroupc0c048Props}= useContext(TotalContext) as TotalContextProps  
  const {groupd487a8, setgroupd487a8}= useContext(TotalContext) as TotalContextProps  
  const {groupd487a8Props, setgroupd487a8Props}= useContext(TotalContext) as TotalContextProps  
  const {groupb8f3d7, setgroupb8f3d7}= useContext(TotalContext) as TotalContextProps  
  const {groupb8f3d7Props, setgroupb8f3d7Props}= useContext(TotalContext) as TotalContextProps  
  const {comboboxa2ee09, setcomboboxa2ee09}= useContext(TotalContext) as TotalContextProps  
  const {dateandtime26c68, setdateandtime26c68}= useContext(TotalContext) as TotalContextProps  
  const {buttonba9c0, setbuttonba9c0}= useContext(TotalContext) as TotalContextProps  
  const {textinputaee10, settextinputaee10}= useContext(TotalContext) as TotalContextProps  
  const {comboboxb9056e, setcomboboxb9056e}= useContext(TotalContext) as TotalContextProps  
  const {comboboxccfb84, setcomboboxccfb84}= useContext(TotalContext) as TotalContextProps  
  const {textinput12354a98, settextinput12354a98}= useContext(TotalContext) as TotalContextProps  
  const {datepicker0e91e, setdatepicker0e91e}= useContext(TotalContext) as TotalContextProps  
  //////////////


  // Validation
  const [error, setError] = useState<string>('');
  let schemaArray :any =[];


const handleUpdate = async(date: any) => {
  try{
  //setIsProcessing(true);
  setError('')
  setValidate((pre:any)=>({...pre,comboboxcheck_v1:{...pre?.comboboxcheck_v1,dateandtime:undefined}}));
  if (!date) {
    setgroup123488888((prev: any) => ({ ...prev, dateandtime: null }));
    return;
  }
  const selectedDate = new Date(date);
  const IST_OFFSET = 5.5 * 60 * 60 * 1000; 
  const indiaTime = new Date(selectedDate.getTime() + IST_OFFSET);
  const isoDate = indiaTime.toISOString();
  setgroup123488888((prev: any) => ({ ...prev, dateandtime: isoDate }))
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
        "9e2f1b4dbc074258894705e51b588888",
        "98f1a1d42bed41189d8847ad75026c68"
      );
    code=orchestrationData?.data?.code
    if (code != '') {
    let codeStates: any = {};
    codeStates['group1234'] = group123488888,
    codeStates['setgroup1234'] = setgroup123488888,
    codeStates['group123488888'] = group123488888Props,
    codeStates['setgroup123488888'] = setgroup123488888Props,
    codeStates['state'] = stateaa824,
    codeStates['setstate'] = setstateaa824,
    codeStates['stateaa824'] = stateaa824Props,
    codeStates['setstateaa824'] = setstateaa824Props,
    codeStates['groupaaa'] = groupaaa97733,
    codeStates['setgroupaaa'] = setgroupaaa97733,
    codeStates['groupaaa97733'] = groupaaa97733Props,
    codeStates['setgroupaaa97733'] = setgroupaaa97733Props,
    codeStates['groupc'] = groupc0c048,
    codeStates['setgroupc'] = setgroupc0c048,
    codeStates['groupc0c048'] = groupc0c048Props,
    codeStates['setgroupc0c048'] = setgroupc0c048Props,
    codeStates['groupd'] = groupd487a8,
    codeStates['setgroupd'] = setgroupd487a8,
    codeStates['groupd487a8'] = groupd487a8Props,
    codeStates['setgroupd487a8'] = setgroupd487a8Props,
    codeStates['groupb'] = groupb8f3d7,
    codeStates['setgroupb'] = setgroupb8f3d7,
    codeStates['groupb8f3d7'] = groupb8f3d7Props,
    codeStates['setgroupb8f3d7'] = setgroupb8f3d7Props,
    codeStates['comboboxa'] = comboboxa2ee09,
    codeStates['setcomboboxa'] = setcomboboxa2ee09,
    codeStates['dateandtime'] = dateandtime26c68,
    codeStates['setdateandtime'] = setdateandtime26c68,
    codeStates['button'] = buttonba9c0,
    codeStates['setbutton'] = setbuttonba9c0,
    codeStates['textinput'] = textinputaee10,
    codeStates['settextinput'] = settextinputaee10,
    codeStates['comboboxb'] = comboboxb9056e,
    codeStates['setcomboboxb'] = setcomboboxb9056e,
    codeStates['comboboxc'] = comboboxccfb84,
    codeStates['setcomboboxc'] = setcomboboxccfb84,
    codeStates['textinput123'] = textinput12354a98,
    codeStates['settextinput123'] = settextinput12354a98,
    codeStates['datepicker'] = datepicker0e91e,
    codeStates['setdatepicker'] = setdatepicker0e91e,
    codeStates['toast'] = toast;
    codeExecution(code,codeStates);
  }
}

useEffect(()=>{
  setgroup123488888Props((pre:any)=>({...pre,validation:true}))
 },[dateandtime26c68?.refresh])

useEffect(()=>{
  handleBlur();
},[validateRefetch.value])

if (dateandtime26c68?.isHidden) {
  return <></>
}
return (
  <div 
  style={{gridColumn: `14 / 19`,gridRow: `191 / 201`, gap:``, height: `100%`, overflow: 'visible'}} >
    <DateAndTime
      className=""
      //label={keyset("dateandtime")}
      value={group123488888?.dateandtime}
      onUpdate= {handleUpdate}
      onBlur= {()=>handleBlur()} 
      required={ false }
      readOnly=  {dateandtime26c68?.isDisabled ? true : false}
      disabled= {dateandtime26c68?.isDisabled ? true : false}
      contentAlign={"left"}
      validationState={validate?.comboboxcheck_v1?.dateandtime ? "invalid" : undefined}
      errorMessage={error}
      />
  </div>
  )
}

export default DatePickerdateandtime
