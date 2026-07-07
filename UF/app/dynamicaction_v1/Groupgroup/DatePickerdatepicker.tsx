

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
  const {grouped023, setgrouped023}= useContext(TotalContext) as TotalContextProps  
  const {grouped023Props, setgrouped023Props}= useContext(TotalContext) as TotalContextProps  
  const {dynamicactionsc9120, setdynamicactionsc9120}= useContext(TotalContext) as TotalContextProps  
  const {dynamicactionsc9120Props, setdynamicactionsc9120Props}= useContext(TotalContext) as TotalContextProps  
  const {value9087e, setvalue9087e}= useContext(TotalContext) as TotalContextProps  
  const {switch63dd1, setswitch63dd1}= useContext(TotalContext) as TotalContextProps  
  const {textinput123292f1, settextinput123292f1}= useContext(TotalContext) as TotalContextProps  
  const {dynamicactionsa32986, setdynamicactionsa32986}= useContext(TotalContext) as TotalContextProps  
  const {dynamicactionsa32986Props, setdynamicactionsa32986Props}= useContext(TotalContext) as TotalContextProps  
  const {dateandtimef72a6, setdateandtimef72a6}= useContext(TotalContext) as TotalContextProps  
  const {datepickerb9ae2, setdatepickerb9ae2}= useContext(TotalContext) as TotalContextProps  
  const {dropdown16aa0, setdropdown16aa0}= useContext(TotalContext) as TotalContextProps  
  const {textinput1f103, settextinput1f103}= useContext(TotalContext) as TotalContextProps  
  const {table12312058a8, settable12312058a8}= useContext(TotalContext) as TotalContextProps  
  const {table12312058a8Props, settable12312058a8Props}= useContext(TotalContext) as TotalContextProps  
  const {tab_group03bf3, settab_group03bf3}= useContext(TotalContext) as TotalContextProps  
  const {tab_header_119fae, settab_header_119fae}= useContext(TotalContext) as TotalContextProps  
  const {tab_header_119faeProps, settab_header_119faeProps}= useContext(TotalContext) as TotalContextProps  
  const {gggg721e2, setgggg721e2}= useContext(TotalContext) as TotalContextProps  
  const {gggg721e2Props, setgggg721e2Props}= useContext(TotalContext) as TotalContextProps  
  const {tab_header_2d8952, settab_header_2d8952}= useContext(TotalContext) as TotalContextProps  
  const {tab_header_2d8952Props, settab_header_2d8952Props}= useContext(TotalContext) as TotalContextProps  
  const {xbxvvcv42015, setxbxvvcv42015}= useContext(TotalContext) as TotalContextProps  
  const {xbxvvcv42015Props, setxbxvvcv42015Props}= useContext(TotalContext) as TotalContextProps  
  //////////////


  // Validation
  const [error, setError] = useState<string>('');
  let schemaArray :any =[];


const handleUpdate = async(date: any) => {
  try{
  //setIsProcessing(true);
  setError('')
  setValidate((pre:any)=>({...pre,dynamicAction_v1:{...pre?.dynamicAction_v1,trs_created_date:undefined}}));
  if (!date) {
    setgrouped023((prev: any) => ({ ...prev, trs_created_date: null }));
    return;
  }
  const now = new Date();
  const [year, month, day] = date.split('-').map(Number);
  const combined = new Date(Date.UTC(year, month - 1, day, now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds()));
  const isoDate = combined.toISOString();
  setgrouped023((prev: any) => ({ ...prev, trs_created_date: isoDate }))
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
        "6be5feda482c40908776c5d938bed023",
        "207f4a24167842de8ee9f81e444b9ae2"
      );
    code=orchestrationData?.data?.code
    if (code != '') {
    let codeStates: any = {};
    codeStates['group'] = grouped023,
    codeStates['setgroup'] = setgrouped023,
    codeStates['grouped023'] = grouped023Props,
    codeStates['setgrouped023'] = setgrouped023Props,
    codeStates['dynamicactions'] = dynamicactionsc9120,
    codeStates['setdynamicactions'] = setdynamicactionsc9120,
    codeStates['dynamicactionsc9120'] = dynamicactionsc9120Props,
    codeStates['setdynamicactionsc9120'] = setdynamicactionsc9120Props,
    codeStates['value'] = value9087e,
    codeStates['setvalue'] = setvalue9087e,
    codeStates['switch'] = switch63dd1,
    codeStates['setswitch'] = setswitch63dd1,
    codeStates['textinput123'] = textinput123292f1,
    codeStates['settextinput123'] = settextinput123292f1,
    codeStates['dynamicactionsa'] = dynamicactionsa32986,
    codeStates['setdynamicactionsa'] = setdynamicactionsa32986,
    codeStates['dynamicactionsa32986'] = dynamicactionsa32986Props,
    codeStates['setdynamicactionsa32986'] = setdynamicactionsa32986Props,
    codeStates['dateandtime'] = dateandtimef72a6,
    codeStates['setdateandtime'] = setdateandtimef72a6,
    codeStates['datepicker'] = datepickerb9ae2,
    codeStates['setdatepicker'] = setdatepickerb9ae2,
    codeStates['dropdown'] = dropdown16aa0,
    codeStates['setdropdown'] = setdropdown16aa0,
    codeStates['textinput'] = textinput1f103,
    codeStates['settextinput'] = settextinput1f103,
    codeStates['table12312'] = table12312058a8,
    codeStates['settable12312'] = settable12312058a8,
    codeStates['table12312058a8'] = table12312058a8Props,
    codeStates['settable12312058a8'] = settable12312058a8Props,
    codeStates['tab_group'] = tab_group03bf3,
    codeStates['settab_group'] = settab_group03bf3,
    codeStates['tab_header_1'] = tab_header_119fae,
    codeStates['settab_header_1'] = settab_header_119fae,
    codeStates['tab_header_119fae'] = tab_header_119faeProps,
    codeStates['settab_header_119fae'] = settab_header_119faeProps,
    codeStates['gggg'] = gggg721e2,
    codeStates['setgggg'] = setgggg721e2,
    codeStates['gggg721e2'] = gggg721e2Props,
    codeStates['setgggg721e2'] = setgggg721e2Props,
    codeStates['tab_header_2'] = tab_header_2d8952,
    codeStates['settab_header_2'] = settab_header_2d8952,
    codeStates['tab_header_2d8952'] = tab_header_2d8952Props,
    codeStates['settab_header_2d8952'] = settab_header_2d8952Props,
    codeStates['xbxvvcv'] = xbxvvcv42015,
    codeStates['setxbxvvcv'] = setxbxvvcv42015,
    codeStates['xbxvvcv42015'] = xbxvvcv42015Props,
    codeStates['setxbxvvcv42015'] = setxbxvvcv42015Props,
    codeStates['toast'] = toast;
    codeExecution(code,codeStates);
  }
}

useEffect(()=>{
  setgrouped023Props((pre:any)=>({...pre,validation:true}))
 },[datepickerb9ae2?.refresh])

useEffect(()=>{
  handleBlur();
},[validateRefetch.value])

if (datepickerb9ae2?.isHidden) {
  return <></>
}
return (
  <div 
  style={{gridColumn: `17 / 19`,gridRow: `57 / 67`, gap:``, height: `100%`, overflow: 'auto'}} >
    <DatePicker
      className=""
      //label={keyset("datepicker")}
      value={grouped023?.trs_created_date}
      onUpdate= {handleUpdate}
      onBlur= {()=>handleBlur()} 
      required={ false }
      readOnly=  {datepickerb9ae2?.isDisabled ? true : false}
      disabled= {datepickerb9ae2?.isDisabled ? true : false}
      contentAlign={"center"}
      dateValidation=""
      validationState={validate?.dynamicAction_v1?.trs_created_date ? "invalid" : undefined}
      errorMessage={error}
      />
  </div>
  )
}

export default DatePickerdatepicker
