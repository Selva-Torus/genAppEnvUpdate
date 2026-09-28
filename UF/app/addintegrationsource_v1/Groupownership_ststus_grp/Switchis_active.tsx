
'use client'
import React, { useState, useContext, useEffect, useRef } from 'react';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies } from '@/app/components/cookieMgment'
import { useGlobal } from '@/context/GlobalContext'
import { Switch } from '@/components/Switch'
import { Text } from '@/components/Text'
import { AxiosService } from "@/app/components/axiosService";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useRouter } from 'next/navigation'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import { eventBus } from '@/app/eventBus';
import { te_refreshDto } from '@/app/interfaces/interfaces';
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import {Modal} from '@/components/Modal';
import evaluateDecisionTable from '@/app/utils/evaluateDecisionTable';
import decodeToken from '@/app/components/decodeToken';
import { eventDecisionTable } from '@/app/utils/evaluateDecisionTable';
import { useHandleDfdRefresh } from '@/context/dfdRefreshContext';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';

const Switchis_active = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
  const { token } = useGlobal();
  const decodedTokenObj: any = decodeToken(token);
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const handleDfdRefresh = useHandleDfdRefresh();
  const {dfd_integrationsource_v1Props, setdfd_integrationsource_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  const [allCode,setAllCode] = useState<string>("");
  const [ruleCode,setRuleCode] = useState<any>("");
  const toast : Function = useInfoMsg();
  const routes : AppRouterInstance = useRouter();
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const prevRefreshRef = useRef<any>(false);
 /////////////
   //another screen
  const {add_group9cddc, setadd_group9cddc}= useContext(TotalContext) as TotalContextProps;
  const {add_group9cddcProps, setadd_group9cddcProps}= useContext(TotalContext) as TotalContextProps;
  const {source_details_grp23dfd, setsource_details_grp23dfd}= useContext(TotalContext) as TotalContextProps;
  const {source_details_grp23dfdProps, setsource_details_grp23dfdProps}= useContext(TotalContext) as TotalContextProps;
  const {connect_group3616a, setconnect_group3616a}= useContext(TotalContext) as TotalContextProps;
  const {connect_group3616aProps, setconnect_group3616aProps}= useContext(TotalContext) as TotalContextProps;
  const {scheduler_retry_grp90aeb, setscheduler_retry_grp90aeb}= useContext(TotalContext) as TotalContextProps;
  const {scheduler_retry_grp90aebProps, setscheduler_retry_grp90aebProps}= useContext(TotalContext) as TotalContextProps;
  const {ownership_ststus_grp32249, setownership_ststus_grp32249}= useContext(TotalContext) as TotalContextProps;
  const {ownership_ststus_grp32249Props, setownership_ststus_grp32249Props}= useContext(TotalContext) as TotalContextProps;
  const {ownership_status_grp3770d, setownership_status_grp3770d}= useContext(TotalContext) as TotalContextProps;
  const {owner_user_ide5fa5, setowner_user_ide5fa5}= useContext(TotalContext) as TotalContextProps;
  const {is_active71e88, setis_active71e88}= useContext(TotalContext) as TotalContextProps;
  const {is_enabled8e021, setis_enabled8e021}= useContext(TotalContext) as TotalContextProps;
  const {last_run_grpa6d98, setlast_run_grpa6d98}= useContext(TotalContext) as TotalContextProps;
  const {last_run_grpa6d98Props, setlast_run_grpa6d98Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions2cac6, setdynamicactions2cac6}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions2cac6Props, setdynamicactions2cac6Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  const handleMapperValue=async()=>{
    try{
    const orchestrationData = getControlOrchestrationData(  
      controlData,
      "c05f98c5806d456596787cc146232249",
      "8d8e8c39962f4067b4e3e3f57bd71e88"
    );
      if(orchestrationData?.data?.error == true){
        return
      }
      setAllCode(orchestrationData?.data?.code)
      setRuleCode(orchestrationData?.data?.rule)
      await delay(1000)
      handleChange(ownership_ststus_grp32249?.is_active||false,orchestrationData?.data?.rule?.nodes)
    }catch(err)
    {
      console.log(err)
    }
  }

  useEffect(() => {
    if(prevRefreshRef.current)
      setownership_ststus_grp32249((pre:any)=>({...pre,is_active:null}))
    else
      prevRefreshRef.current=true
    handleMapperValue()
  },[is_active71e88?.refresh])

  useEffect(() => {
    if(Array.isArray(dfd_integrationsource_v1Props) && dfd_integrationsource_v1Props?.length == 1){
      setownership_ststus_grp32249((pre:any)=>({...pre,is_active:dfd_integrationsource_v1Props[0]?.is_active}))
    }
  },[dfd_integrationsource_v1Props])
  const handleChange = async (checked: boolean,comingRule:any={}) => {
    try{
    setIsProcessing(true);
    setownership_ststus_grp32249((prev: any) => ({ ...prev, is_active: checked }));
    let code:string= allCode;
    if (code != '') {
      let codeStates: any = {};
        codeStates['add_group'] = add_group9cddc,
        codeStates['setadd_group'] = setadd_group9cddc,
        codeStates['add_group9cddc'] = add_group9cddcProps,
        codeStates['setadd_group9cddc'] = setadd_group9cddcProps,
        codeStates['source_details_grp'] = source_details_grp23dfd,
        codeStates['setsource_details_grp'] = setsource_details_grp23dfd,
        codeStates['source_details_grp23dfd'] = source_details_grp23dfdProps,
        codeStates['setsource_details_grp23dfd'] = setsource_details_grp23dfdProps,
        codeStates['connect_group'] = connect_group3616a,
        codeStates['setconnect_group'] = setconnect_group3616a,
        codeStates['connect_group3616a'] = connect_group3616aProps,
        codeStates['setconnect_group3616a'] = setconnect_group3616aProps,
        codeStates['scheduler_retry_grp'] = scheduler_retry_grp90aeb,
        codeStates['setscheduler_retry_grp'] = setscheduler_retry_grp90aeb,
        codeStates['scheduler_retry_grp90aeb'] = scheduler_retry_grp90aebProps,
        codeStates['setscheduler_retry_grp90aeb'] = setscheduler_retry_grp90aebProps,
        codeStates['ownership_ststus_grp'] = ownership_ststus_grp32249,
        codeStates['setownership_ststus_grp'] = setownership_ststus_grp32249,
        codeStates['ownership_ststus_grp32249'] = ownership_ststus_grp32249Props,
        codeStates['setownership_ststus_grp32249'] = setownership_ststus_grp32249Props,
        codeStates['ownership_status_grp'] = ownership_status_grp3770d,
        codeStates['setownership_status_grp'] = setownership_status_grp3770d,
        codeStates['owner_user_id'] = owner_user_ide5fa5,
        codeStates['setowner_user_id'] = setowner_user_ide5fa5,
        codeStates['is_active'] = is_active71e88,
        codeStates['setis_active'] = setis_active71e88,
        codeStates['is_enabled'] = is_enabled8e021,
        codeStates['setis_enabled'] = setis_enabled8e021,
        codeStates['last_run_grp'] = last_run_grpa6d98,
        codeStates['setlast_run_grp'] = setlast_run_grpa6d98,
        codeStates['last_run_grpa6d98'] = last_run_grpa6d98Props,
        codeStates['setlast_run_grpa6d98'] = setlast_run_grpa6d98Props,
        codeStates['dynamicactions'] = dynamicactions2cac6,
        codeStates['setdynamicactions'] = setdynamicactions2cac6,
        codeStates['dynamicactions2cac6'] = dynamicactions2cac6Props,
        codeStates['setdynamicactions2cac6'] = setdynamicactions2cac6Props,
    codeExecution(code,codeStates)
    }
    let presentRule:any=ruleCode?.nodes || comingRule
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

  if (is_active71e88?.isHidden) {
    return <></>
  }
  return (
    <div 
      className=""
      style={{gridColumn: `1 / 25`,gridRow: `23 / 28`, gap:``, height: `100%`, overflow: 'auto'}} >
      <Switch
        className=""
        contentAlign={"left"}
        disabled= {is_active71e88?.isDisabled ? true : false}
        content="Active"
        checkedContent=""                                                                                                                                             
        uncheckedContent=""
        checked={ownership_ststus_grp32249?.is_active || false} 
        onChange={handleChange}
      />
  </div>
  )
}

export default Switchis_active



