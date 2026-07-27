

'use client'
import React, { useState,useContext,useEffect,useRef } from 'react';
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


const Checkboxencashment_allowed_checkbox = ({checkToAdd,setCheckToAdd,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
  const token: string = getCookie('token');
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const handleDfdRefresh = useHandleDfdRefresh();
  const decodedTokenObj:any = decodeToken(token);
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, string>>({name:'encashment_allowed',type:"text"});
  const toast:Function=useInfoMsg();
  const routes: AppRouterInstance = useRouter();
  let code:string='';
  const [allCode,setAllCode]=useState<any>("");
  //showComponentAsPopup || showArtifactAsModal
 /////////////
   //another screen
  const {new_access_group86c35, setnew_access_group86c35}= useContext(TotalContext) as TotalContextProps;  
  const {new_access_group86c35Props, setnew_access_group86c35Props}= useContext(TotalContext) as TotalContextProps;  
  const {access_req__groupae6e3, setaccess_req__groupae6e3}= useContext(TotalContext) as TotalContextProps;  
  const {access_req__groupae6e3Props, setaccess_req__groupae6e3Props}= useContext(TotalContext) as TotalContextProps;  
  const {app_inf_group2196e, setapp_inf_group2196e}= useContext(TotalContext) as TotalContextProps;  
  const {app_inf_group2196eProps, setapp_inf_group2196eProps}= useContext(TotalContext) as TotalContextProps;  
  const {approve_group0167c, setapprove_group0167c}= useContext(TotalContext) as TotalContextProps;  
  const {approve_group0167cProps, setapprove_group0167cProps}= useContext(TotalContext) as TotalContextProps;  
  const {valid_group5c57c, setvalid_group5c57c}= useContext(TotalContext) as TotalContextProps;  
  const {valid_group5c57cProps, setvalid_group5c57cProps}= useContext(TotalContext) as TotalContextProps;  
  const {business_just__groupd6ebd, setbusiness_just__groupd6ebd}= useContext(TotalContext) as TotalContextProps;  
  const {business_just__groupd6ebdProps, setbusiness_just__groupd6ebdProps}= useContext(TotalContext) as TotalContextProps;  
  const {provision_groupc3fca, setprovision_groupc3fca}= useContext(TotalContext) as TotalContextProps;  
  const {provision_groupc3fcaProps, setprovision_groupc3fcaProps}= useContext(TotalContext) as TotalContextProps;  
  const {leave_rule_groupf75c0, setleave_rule_groupf75c0}= useContext(TotalContext) as TotalContextProps;  
  const {leave_rule_groupf75c0Props, setleave_rule_groupf75c0Props}= useContext(TotalContext) as TotalContextProps;  
  const {approval_required_checkboxf9d82, setapproval_required_checkboxf9d82}= useContext(TotalContext) as TotalContextProps;  
  const {encashment_allowed_checkboxe10f7, setencashment_allowed_checkboxe10f7}= useContext(TotalContext) as TotalContextProps;  
  const {dynamicactionsd8c40, setdynamicactionsd8c40}= useContext(TotalContext) as TotalContextProps;  
  const {dynamicactionsd8c40Props, setdynamicactionsd8c40Props}= useContext(TotalContext) as TotalContextProps;  
  //////////////

  const handleMapperValue=async()=>{
    try{
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "d063c85ad6cd49657816dc3a2bbc3fca",
        "e35618ce56da4dfc943ad942c12e10f7"
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
  },[encashment_allowed_checkboxe10f7?.refresh])

  useEffect(()=>{
    if (provision_groupc3fca?.encashment_allowed === undefined) {
      setprovision_groupc3fca((prev: any) => ({ ...prev, encashment_allowed: false }));
    }
  },[])


  const handleChange=async(checked:boolean)=>{
    try{
    setIsProcessing(true);
    setprovision_groupc3fca((prev: any) => ({ ...prev, encashment_allowed: checked}));
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
            codeStates['new_access_group']  = new_access_group86c35;
            codeStates['setnew_access_group'] = setnew_access_group86c35;
            codeStates['access_req__group']  = access_req__groupae6e3;
            codeStates['setaccess_req__group'] = setaccess_req__groupae6e3;
            codeStates['app_inf_group']  = app_inf_group2196e;
            codeStates['setapp_inf_group'] = setapp_inf_group2196e;
            codeStates['approve_group']  = approve_group0167c;
            codeStates['setapprove_group'] = setapprove_group0167c;
            codeStates['valid_group']  = valid_group5c57c;
            codeStates['setvalid_group'] = setvalid_group5c57c;
            codeStates['business_just__group']  = business_just__groupd6ebd;
            codeStates['setbusiness_just__group'] = setbusiness_just__groupd6ebd;
            codeStates['provision_group']  = provision_groupc3fca;
            codeStates['setprovision_group'] = setprovision_groupc3fca;
            codeStates['leave_rule_group']  = leave_rule_groupf75c0;
            codeStates['setleave_rule_group'] = setleave_rule_groupf75c0;
            codeStates['dynamicactions']  = dynamicactionsd8c40;
            codeStates['setdynamicactions'] = setdynamicactionsd8c40;
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

  if (encashment_allowed_checkboxe10f7?.isHidden) {
    return <></>;
  }
  return (
    <div 
       style={{gridColumn: `12 / 23`,gridRow: `12 / 18`, gap:``, height: `100%`, overflow: 'auto'}} >
    <Checkbox 
      className=""
      value={provision_groupc3fca?.encashment_allowed||false}
      checked={provision_groupc3fca?.encashment_allowed||false}
      disabled= {encashment_allowed_checkboxe10f7?.isDisabled ? true : false}
      content = {'Encashment'}
      onChange={handleChange}
      onBlur={handleBlur}
    />
    </div>
  )
}

export default Checkboxencashment_allowed_checkbox;
