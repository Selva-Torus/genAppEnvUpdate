

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


const Checkboxapproval_required_checkbox = ({checkToAdd,setCheckToAdd,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
  const token: string = getCookie('token');
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const handleDfdRefresh = useHandleDfdRefresh();
  const decodedTokenObj:any = decodeToken(token);
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, string>>({name:'approval_required',type:"text"});
  const toast:Function=useInfoMsg();
  const routes: AppRouterInstance = useRouter();
  let code:string='';
  const [allCode,setAllCode]=useState<any>("");
  //showComponentAsPopup || showArtifactAsModal
 /////////////
   //another screen
  const {new_access_group193d2, setnew_access_group193d2}= useContext(TotalContext) as TotalContextProps;  
  const {new_access_group193d2Props, setnew_access_group193d2Props}= useContext(TotalContext) as TotalContextProps;  
  const {access_req__groupc57b7, setaccess_req__groupc57b7}= useContext(TotalContext) as TotalContextProps;  
  const {access_req__groupc57b7Props, setaccess_req__groupc57b7Props}= useContext(TotalContext) as TotalContextProps;  
  const {app_inf_group60e94, setapp_inf_group60e94}= useContext(TotalContext) as TotalContextProps;  
  const {app_inf_group60e94Props, setapp_inf_group60e94Props}= useContext(TotalContext) as TotalContextProps;  
  const {approve_group27e47, setapprove_group27e47}= useContext(TotalContext) as TotalContextProps;  
  const {approve_group27e47Props, setapprove_group27e47Props}= useContext(TotalContext) as TotalContextProps;  
  const {valid_group60f4e, setvalid_group60f4e}= useContext(TotalContext) as TotalContextProps;  
  const {valid_group60f4eProps, setvalid_group60f4eProps}= useContext(TotalContext) as TotalContextProps;  
  const {business_just__group4dcdb, setbusiness_just__group4dcdb}= useContext(TotalContext) as TotalContextProps;  
  const {business_just__group4dcdbProps, setbusiness_just__group4dcdbProps}= useContext(TotalContext) as TotalContextProps;  
  const {provision_group68072, setprovision_group68072}= useContext(TotalContext) as TotalContextProps;  
  const {provision_group68072Props, setprovision_group68072Props}= useContext(TotalContext) as TotalContextProps;  
  const {leave_rule_group1e665, setleave_rule_group1e665}= useContext(TotalContext) as TotalContextProps;  
  const {leave_rule_group1e665Props, setleave_rule_group1e665Props}= useContext(TotalContext) as TotalContextProps;  
  const {approval_required_checkbox19a6b, setapproval_required_checkbox19a6b}= useContext(TotalContext) as TotalContextProps;  
  const {encashment_allowed_checkboxab660, setencashment_allowed_checkboxab660}= useContext(TotalContext) as TotalContextProps;  
  //////////////

  const handleMapperValue=async()=>{
    try{
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "bfe86a9dffe5625e3ea9b1b300368072",
        "1656c88216f75a3293f973e1c2e19a6b"
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
  },[approval_required_checkbox19a6b?.refresh])

  useEffect(()=>{
    if (provision_group68072?.approval_required === undefined) {
      setprovision_group68072((prev: any) => ({ ...prev, approval_required: false }));
    }
  },[])


  const handleChange=async(checked:boolean)=>{
    try{
    setIsProcessing(true);
    setprovision_group68072((prev: any) => ({ ...prev, approval_required: checked}));
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
            codeStates['new_access_group']  = new_access_group193d2;
            codeStates['setnew_access_group'] = setnew_access_group193d2;
            codeStates['access_req__group']  = access_req__groupc57b7;
            codeStates['setaccess_req__group'] = setaccess_req__groupc57b7;
            codeStates['app_inf_group']  = app_inf_group60e94;
            codeStates['setapp_inf_group'] = setapp_inf_group60e94;
            codeStates['approve_group']  = approve_group27e47;
            codeStates['setapprove_group'] = setapprove_group27e47;
            codeStates['valid_group']  = valid_group60f4e;
            codeStates['setvalid_group'] = setvalid_group60f4e;
            codeStates['business_just__group']  = business_just__group4dcdb;
            codeStates['setbusiness_just__group'] = setbusiness_just__group4dcdb;
            codeStates['provision_group']  = provision_group68072;
            codeStates['setprovision_group'] = setprovision_group68072;
            codeStates['leave_rule_group']  = leave_rule_group1e665;
            codeStates['setleave_rule_group'] = setleave_rule_group1e665;
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

  if (approval_required_checkbox19a6b?.isHidden) {
    return <></>;
  }
  return (
    <div 
       style={{gridColumn: `2 / 12`,gridRow: `12 / 18`, gap:``, height: `100%`, overflow: 'auto'}} >
    <Checkbox 
      className=""
      value={provision_group68072?.approval_required||false}
      checked={provision_group68072?.approval_required||false}
      disabled= {approval_required_checkbox19a6b?.isDisabled ? true : false}
      content = {'Approval Required'}
      onChange={handleChange}
      onBlur={handleBlur}
    />
    </div>
  )
}

export default Checkboxapproval_required_checkbox;
