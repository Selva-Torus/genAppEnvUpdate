
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

const Switchis_enabled = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
  const { token } = useGlobal();
  const decodedTokenObj: any = decodeToken(token);
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const handleDfdRefresh = useHandleDfdRefresh();
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
  const {add_group37fbc, setadd_group37fbc}= useContext(TotalContext) as TotalContextProps;
  const {add_group37fbcProps, setadd_group37fbcProps}= useContext(TotalContext) as TotalContextProps;
  const {source_details_grp9bff6, setsource_details_grp9bff6}= useContext(TotalContext) as TotalContextProps;
  const {source_details_grp9bff6Props, setsource_details_grp9bff6Props}= useContext(TotalContext) as TotalContextProps;
  const {connect_group1b893, setconnect_group1b893}= useContext(TotalContext) as TotalContextProps;
  const {connect_group1b893Props, setconnect_group1b893Props}= useContext(TotalContext) as TotalContextProps;
  const {scheduler_retry_grp8ca28, setscheduler_retry_grp8ca28}= useContext(TotalContext) as TotalContextProps;
  const {scheduler_retry_grp8ca28Props, setscheduler_retry_grp8ca28Props}= useContext(TotalContext) as TotalContextProps;
  const {ownership_ststus_grpbc00a, setownership_ststus_grpbc00a}= useContext(TotalContext) as TotalContextProps;
  const {ownership_ststus_grpbc00aProps, setownership_ststus_grpbc00aProps}= useContext(TotalContext) as TotalContextProps;
  const {ownership_ststus_grp_text9a786, setownership_ststus_grp_text9a786}= useContext(TotalContext) as TotalContextProps;
  const {owner_user_id7a26e, setowner_user_id7a26e}= useContext(TotalContext) as TotalContextProps;
  const {is_activee7e2f, setis_activee7e2f}= useContext(TotalContext) as TotalContextProps;
  const {is_enableda6dd4, setis_enableda6dd4}= useContext(TotalContext) as TotalContextProps;
  const {last_run_grpc3967, setlast_run_grpc3967}= useContext(TotalContext) as TotalContextProps;
  const {last_run_grpc3967Props, setlast_run_grpc3967Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  const handleMapperValue=async()=>{
    try{
    const orchestrationData = getControlOrchestrationData(  
      controlData,
      "1d690206545df750bdceeff2077bc00a",
      "1f29f507a159ae795e277b6b593a6dd4"
    );
      if(orchestrationData?.data?.error == true){
        return
      }
      setAllCode(orchestrationData?.data?.code)
      setRuleCode(orchestrationData?.data?.rule)
    }catch(err)
    {
      console.log(err)
    }
  }

  useEffect(() => {
    if(prevRefreshRef.current)
      setownership_ststus_grpbc00a((pre:any)=>({...pre,is_enabled:null}))
    else
      prevRefreshRef.current=true
    handleMapperValue()
  },[is_enableda6dd4?.refresh])

  const handleChange = async (checked: boolean,comingRule:any={}) => {
    try{
    setIsProcessing(true);
    setownership_ststus_grpbc00a((prev: any) => ({ ...prev, is_enabled: checked }));
    let code:string= allCode;
    if (code != '') {
      let codeStates: any = {};
        codeStates['add_group'] = add_group37fbc,
        codeStates['setadd_group'] = setadd_group37fbc,
        codeStates['add_group37fbc'] = add_group37fbcProps,
        codeStates['setadd_group37fbc'] = setadd_group37fbcProps,
        codeStates['source_details_grp'] = source_details_grp9bff6,
        codeStates['setsource_details_grp'] = setsource_details_grp9bff6,
        codeStates['source_details_grp9bff6'] = source_details_grp9bff6Props,
        codeStates['setsource_details_grp9bff6'] = setsource_details_grp9bff6Props,
        codeStates['connect_group'] = connect_group1b893,
        codeStates['setconnect_group'] = setconnect_group1b893,
        codeStates['connect_group1b893'] = connect_group1b893Props,
        codeStates['setconnect_group1b893'] = setconnect_group1b893Props,
        codeStates['scheduler_retry_grp'] = scheduler_retry_grp8ca28,
        codeStates['setscheduler_retry_grp'] = setscheduler_retry_grp8ca28,
        codeStates['scheduler_retry_grp8ca28'] = scheduler_retry_grp8ca28Props,
        codeStates['setscheduler_retry_grp8ca28'] = setscheduler_retry_grp8ca28Props,
        codeStates['ownership_ststus_grp'] = ownership_ststus_grpbc00a,
        codeStates['setownership_ststus_grp'] = setownership_ststus_grpbc00a,
        codeStates['ownership_ststus_grpbc00a'] = ownership_ststus_grpbc00aProps,
        codeStates['setownership_ststus_grpbc00a'] = setownership_ststus_grpbc00aProps,
        codeStates['ownership_ststus_grp_text'] = ownership_ststus_grp_text9a786,
        codeStates['setownership_ststus_grp_text'] = setownership_ststus_grp_text9a786,
        codeStates['owner_user_id'] = owner_user_id7a26e,
        codeStates['setowner_user_id'] = setowner_user_id7a26e,
        codeStates['is_active'] = is_activee7e2f,
        codeStates['setis_active'] = setis_activee7e2f,
        codeStates['is_enabled'] = is_enableda6dd4,
        codeStates['setis_enabled'] = setis_enableda6dd4,
        codeStates['last_run_grp'] = last_run_grpc3967,
        codeStates['setlast_run_grp'] = setlast_run_grpc3967,
        codeStates['last_run_grpc3967'] = last_run_grpc3967Props,
        codeStates['setlast_run_grpc3967'] = setlast_run_grpc3967Props,
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

  if (is_enableda6dd4?.isHidden) {
    return <></>
  }
  return (
    <div 
      className=""
      style={{gridColumn: `1 / 19`,gridRow: `25 / 31`, gap:``, height: `100%`, overflow: 'auto'}} >
      <Switch
        className=""
        contentAlign={"left"}
        disabled= {is_enableda6dd4?.isDisabled ? true : false}
        content="Enabled"
        checked={ownership_ststus_grpbc00a?.is_enabled || false} 
        onChange={handleChange}
      />
  </div>
  )
}

export default Switchis_enabled



