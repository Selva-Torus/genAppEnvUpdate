
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
import UOmapperData from '@/context/dfdmapperContolnames.json';

const Switchis_active = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
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
  const {add_group713a3, setadd_group713a3}= useContext(TotalContext) as TotalContextProps;
  const {add_group713a3Props, setadd_group713a3Props}= useContext(TotalContext) as TotalContextProps;
  const {risk_rule_cond_grp9fa6e, setrisk_rule_cond_grp9fa6e}= useContext(TotalContext) as TotalContextProps;
  const {risk_rule_cond_grp9fa6eProps, setrisk_rule_cond_grp9fa6eProps}= useContext(TotalContext) as TotalContextProps;
  const {rule_nameb202a, setrule_nameb202a}= useContext(TotalContext) as TotalContextProps;
  const {sequence_no20c50, setsequence_no20c50}= useContext(TotalContext) as TotalContextProps;
  const {operator_code06297, setoperator_code06297}= useContext(TotalContext) as TotalContextProps;
  const {compare_valueaa22d, setcompare_valueaa22d}= useContext(TotalContext) as TotalContextProps;
  const {attribute_name1565b, setattribute_name1565b}= useContext(TotalContext) as TotalContextProps;
  const {is_activea3076, setis_activea3076}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  const handleMapperValue=async()=>{
    try{
    const orchestrationData = getControlOrchestrationData(  
      controlData,
      "5ea00bc4b4c97dc044026d95c0f9fa6e",
      "0cd1de84a6ae0b67f59e946e141a3076"
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
      setrisk_rule_cond_grp9fa6e((pre:any)=>({...pre,is_active:null}))
    else
      prevRefreshRef.current=true
    handleMapperValue()
  },[is_activea3076?.refresh])

  const handleChange = async (checked: boolean,comingRule:any={}) => {
    try{
    setIsProcessing(true);
    setrisk_rule_cond_grp9fa6e((prev: any) => ({ ...prev, is_active: checked }));
    let code:string= allCode;
    if (code != '') {
      let codeStates: any = {};
        codeStates['add_group'] = add_group713a3,
        codeStates['setadd_group'] = setadd_group713a3,
        codeStates['add_group713a3'] = add_group713a3Props,
        codeStates['setadd_group713a3'] = setadd_group713a3Props,
        codeStates['risk_rule_cond_grp'] = risk_rule_cond_grp9fa6e,
        codeStates['setrisk_rule_cond_grp'] = setrisk_rule_cond_grp9fa6e,
        codeStates['risk_rule_cond_grp9fa6e'] = risk_rule_cond_grp9fa6eProps,
        codeStates['setrisk_rule_cond_grp9fa6e'] = setrisk_rule_cond_grp9fa6eProps,
        codeStates['rule_name'] = rule_nameb202a,
        codeStates['setrule_name'] = setrule_nameb202a,
        codeStates['sequence_no'] = sequence_no20c50,
        codeStates['setsequence_no'] = setsequence_no20c50,
        codeStates['operator_code'] = operator_code06297,
        codeStates['setoperator_code'] = setoperator_code06297,
        codeStates['compare_value'] = compare_valueaa22d,
        codeStates['setcompare_value'] = setcompare_valueaa22d,
        codeStates['attribute_name'] = attribute_name1565b,
        codeStates['setattribute_name'] = setattribute_name1565b,
        codeStates['is_active'] = is_activea3076,
        codeStates['setis_active'] = setis_activea3076,
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

  if (is_activea3076?.isHidden) {
    return <></>
  }
  return (
    <div 
      className=""
      style={{gridColumn: `17 / 22`,gridRow: `20 / 25`, gap:``, height: `100%`, overflow: 'auto'}} >
      <Switch
        className=""
        contentAlign={"left"}
        disabled= {is_activea3076?.isDisabled ? true : false}
        content="Active"
        checked={risk_rule_cond_grp9fa6e?.is_active || false} 
        onChange={handleChange}
      />
  </div>
  )
}

export default Switchis_active



