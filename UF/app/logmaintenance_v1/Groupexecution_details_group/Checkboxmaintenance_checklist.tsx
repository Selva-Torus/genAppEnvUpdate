

'use client'
import React, { useState,useContext,useEffect } from 'react';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { eventBus } from '@/app/eventBus';
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { Text } from '@/components/Text';
import { Checkbox } from '@/components/Checkbox';
import {Modal} from '@/components/Modal';
import { useHandleDfdRefresh } from '@/context/dfdRefreshContext';
import { eventDecisionTable } from '@/app/utils/evaluateDecisionTable';
import decodeToken from '@/app/components/decodeToken';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';


const Checkboxmaintenance_checklist = ({checkToAdd,setCheckToAdd,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
  const token: string = getCookie('token');
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const handleDfdRefresh = useHandleDfdRefresh();
  const decodedTokenObj:any = decodeToken(token);
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, string>>({name:'maintenance_checklist',type:"text"});
  const toast:Function=useInfoMsg();
  const routes: AppRouterInstance = useRouter();
  let code:string='';
  const [allCode,setAllCode]=useState<any>("");
  //showComponentAsPopup || showArtifactAsModal
 /////////////
   //another screen
  const {maintenance_groupdb5a7, setmaintenance_groupdb5a7}= useContext(TotalContext) as TotalContextProps;  
  const {maintenance_groupdb5a7Props, setmaintenance_groupdb5a7Props}= useContext(TotalContext) as TotalContextProps;  
  const {maintenance_information_groupea3ac, setmaintenance_information_groupea3ac}= useContext(TotalContext) as TotalContextProps;  
  const {maintenance_information_groupea3acProps, setmaintenance_information_groupea3acProps}= useContext(TotalContext) as TotalContextProps;  
  const {execution_details_group591cd, setexecution_details_group591cd}= useContext(TotalContext) as TotalContextProps;  
  const {execution_details_group591cdProps, setexecution_details_group591cdProps}= useContext(TotalContext) as TotalContextProps;  
  const {execution_details_text71309, setexecution_details_text71309}= useContext(TotalContext) as TotalContextProps;  
  const {performed_bycb4dc, setperformed_bycb4dc}= useContext(TotalContext) as TotalContextProps;  
  const {vendor_name17b17, setvendor_name17b17}= useContext(TotalContext) as TotalContextProps;  
  const {vendor_referencefa982, setvendor_referencefa982}= useContext(TotalContext) as TotalContextProps;  
  const {downtime_hours721c7, setdowntime_hours721c7}= useContext(TotalContext) as TotalContextProps;  
  const {cost35190, setcost35190}= useContext(TotalContext) as TotalContextProps;  
  const {descriptioneaa55, setdescriptioneaa55}= useContext(TotalContext) as TotalContextProps;  
  const {maintenance_checklist024ed, setmaintenance_checklist024ed}= useContext(TotalContext) as TotalContextProps;  
  const {dynamicactions8672d, setdynamicactions8672d}= useContext(TotalContext) as TotalContextProps;  
  const {dynamicactions8672dProps, setdynamicactions8672dProps}= useContext(TotalContext) as TotalContextProps;  
  //////////////

  const handleMapperValue=async()=>{
    try{
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "6f620f2c13924269ac67da12e7f591cd",
        "dd5b3053c7d14494b117b174391024ed"
      );
      if(orchestrationData?.data?.code)
      {
        setAllCode(orchestrationData?.data?.code);
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[maintenance_checklist024ed?.refresh])

  const handleChange=async(checked:boolean)=>{
    try{
    setIsProcessing(true);
    setexecution_details_group591cd((prev: any) => ({ ...prev, maintenance_checklist: checked}));
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
  
  const handleBlur=async(e:any)=>{
    try{
    setIsProcessing(true);
    code = allCode;
    if (code != '') {
      let codeStates: any = {};
            codeStates['maintenance_group']  = maintenance_groupdb5a7;
            codeStates['setmaintenance_group'] = setmaintenance_groupdb5a7;
            codeStates['maintenance_information_group']  = maintenance_information_groupea3ac;
            codeStates['setmaintenance_information_group'] = setmaintenance_information_groupea3ac;
            codeStates['execution_details_group']  = execution_details_group591cd;
            codeStates['setexecution_details_group'] = setexecution_details_group591cd;
            codeStates['dynamicactions']  = dynamicactions8672d;
            codeStates['setdynamicactions'] = setdynamicactions8672d;
    codeExecution(code,codeStates);
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

  if (maintenance_checklist024ed?.isHidden) {
    return <></>;
  }
  return (
    <div 
       style={{gridColumn: `1 / 6`,gridRow: `34 / 40`, gap:``, height: `100%`, overflow: 'auto'}} >
    <Checkbox 
      className=""
      value={execution_details_group591cd?.maintenance_checklist||false}
      checked={execution_details_group591cd?.maintenance_checklist||false}
      disabled= {maintenance_checklist024ed?.isDisabled ? true : false}
      content = {'Maintenance Checklist'}
      onChange={handleChange}
      onBlur={handleBlur}
    />
    </div>
  )
}

export default Checkboxmaintenance_checklist;
