'use client'


import React, { useState,useContext,useEffect } from 'react'
import { codeExecution } from '@/app/utils/codeExecution';
import { PinInput } from '@/components/PinInput';
import { Text } from '@/components/Text';
import { Modal } from "@/components/Modal";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { getCookie } from '@/app/components/cookieMgment';
import { AxiosService } from "@/app/components/axiosService";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { eventBus } from '@/app/eventBus';
import decodeToken from '@/app/components/decodeToken';
import { eventDecisionTable } from '@/app/utils/evaluateDecisionTable';
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
import { useHandleDfdRefresh } from '@/context/dfdRefreshContext';
import { useRouter } from 'next/navigation'


const PinInputpininput = ({checkToAdd,setCheckToAdd,encryptionFlagCompData,setIsProcessing,controlData}:any) => { 
  const token: string = getCookie('token');
  const {validateRefetch , setValidateRefetch} = useContext(TotalContext) as TotalContextProps;
  const {validate , setValidate} = useContext(TotalContext) as TotalContextProps;
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const handleDfdRefresh = useHandleDfdRefresh();
  const [dynamicStateandType,setDynamicStateandType]=useState<any>({name:'pininput',type:"text"});
  const toast:any=useInfoMsg(); 
  const routes = useRouter();
  const decodedTokenObj:any = decodeToken(token);
  const [allCode,setAllCode]=useState<any>("");
  /////////////
  //another screen
  const {group5635d, setgroup5635d}= useContext(TotalContext) as TotalContextProps;
  const {group5635dProps, setgroup5635dProps}= useContext(TotalContext) as TotalContextProps;
  const {comboboxb40b7, setcomboboxb40b7}= useContext(TotalContext) as TotalContextProps;
  const {grouparray81c1a, setgrouparray81c1a}= useContext(TotalContext) as TotalContextProps;
  const {grouparray81c1aProps, setgrouparray81c1aProps}= useContext(TotalContext) as TotalContextProps;
  const {pininputdfec6, setpininputdfec6}= useContext(TotalContext) as TotalContextProps;
  const {text_to_speechdcae4, settext_to_speechdcae4}= useContext(TotalContext) as TotalContextProps;
  const {tab_group4b1a3, settab_group4b1a3}= useContext(TotalContext) as TotalContextProps;
  const {tab_header_22515d, settab_header_22515d}= useContext(TotalContext) as TotalContextProps;
  const {tab_header_22515dProps, settab_header_22515dProps}= useContext(TotalContext) as TotalContextProps;
  const {groupb5565e, setgroupb5565e}= useContext(TotalContext) as TotalContextProps;
  const {groupb5565eProps, setgroupb5565eProps}= useContext(TotalContext) as TotalContextProps;
  const {table050eb, settable050eb}= useContext(TotalContext) as TotalContextProps;
  const {table050ebProps, settable050ebProps}= useContext(TotalContext) as TotalContextProps;
  const {tab_header_370ce9, settab_header_370ce9}= useContext(TotalContext) as TotalContextProps;
  const {tab_header_370ce9Props, settab_header_370ce9Props}= useContext(TotalContext) as TotalContextProps;
  const {groupa1825e, setgroupa1825e}= useContext(TotalContext) as TotalContextProps;
  const {groupa1825eProps, setgroupa1825eProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  
  const handleMapperValue=async()=>{
    try{
      const orchestrationData:any = getControlOrchestrationData(
        controlData,
        "442de4c61b794cb988d18a74e745635d",
        "c43eb93306aa493c93362f38859dfec6"
      );
      setAllCode(orchestrationData?.data?.code);
    }
    catch(err)
    {
      console.log(err);
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[refresh.pininputpininputdfec6])

  const handleUpdate = async(data:any) => {
    try{
      setIsProcessing(true);
    setgroup5635d((prev: any) => ({ ...prev, pininput: data}))
              //infoMsg
    if (data == "12312") {
      if(eventDecisionTable({conditionalKey:"roleName",conditionalValue:"Torus"},{...decodedTokenObj,...group5635d})==false){
      toast('Data saved successfully', 'success');
      }
    }
    }catch (err: any) {
      setIsProcessing(false);
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
    }finally{
      setIsProcessing(false);
    }
  }  
  const handleBlur = async(data:any)=>{  
    let code:any= allCode;
    if (code != '') {
    let codeStates: any = {};
        codeStates['group'] = group5635d,
        codeStates['setgroup'] = setgroup5635d,
        codeStates['group5635d'] = group5635dProps,
        codeStates['setgroup5635d'] = setgroup5635dProps,
        codeStates['combobox'] = comboboxb40b7,
        codeStates['setcombobox'] = setcomboboxb40b7,
        codeStates['grouparray'] = grouparray81c1a,
        codeStates['setgrouparray'] = setgrouparray81c1a,
        codeStates['grouparray81c1a'] = grouparray81c1aProps,
        codeStates['setgrouparray81c1a'] = setgrouparray81c1aProps,
        codeStates['pininput'] = pininputdfec6,
        codeStates['setpininput'] = setpininputdfec6,
        codeStates['text_to_speech'] = text_to_speechdcae4,
        codeStates['settext_to_speech'] = settext_to_speechdcae4,
        codeStates['tab_group'] = tab_group4b1a3,
        codeStates['settab_group'] = settab_group4b1a3,
        codeStates['tab_header_2'] = tab_header_22515d,
        codeStates['settab_header_2'] = settab_header_22515d,
        codeStates['tab_header_22515d'] = tab_header_22515dProps,
        codeStates['settab_header_22515d'] = settab_header_22515dProps,
        codeStates['groupb'] = groupb5565e,
        codeStates['setgroupb'] = setgroupb5565e,
        codeStates['groupb5565e'] = groupb5565eProps,
        codeStates['setgroupb5565e'] = setgroupb5565eProps,
        codeStates['table'] = table050eb,
        codeStates['settable'] = settable050eb,
        codeStates['table050eb'] = table050ebProps,
        codeStates['settable050eb'] = settable050ebProps,
        codeStates['tab_header_3'] = tab_header_370ce9,
        codeStates['settab_header_3'] = settab_header_370ce9,
        codeStates['tab_header_370ce9'] = tab_header_370ce9Props,
        codeStates['settab_header_370ce9'] = settab_header_370ce9Props,
        codeStates['groupa'] = groupa1825e,
        codeStates['setgroupa'] = setgroupa1825e,
        codeStates['groupa1825e'] = groupa1825eProps,
        codeStates['setgroupa1825e'] = setgroupa1825eProps,
    codeExecution(code,codeStates);
    }
  }


if (pininputdfec6?.isHidden) {
  return <></>;
}

return (
  <div
    style={{gridColumn: `1 / 3`,gridRow: `12 / 22`, gap:``, height: `100%`, overflow: 'auto'}} >
    <PinInput 
      className=""
      value={group5635d?.pininput||""}
      onChange={handleUpdate}
      onBlur={handleBlur}      
      length={4 }
      disabled= {pininputdfec6?.isDisabled ? true : false}
    />
  </div>
  )
}

export default PinInputpininput
