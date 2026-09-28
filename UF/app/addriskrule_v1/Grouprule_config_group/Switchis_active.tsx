
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
  const {info_group69a49, setinfo_group69a49}= useContext(TotalContext) as TotalContextProps;
  const {info_group69a49Props, setinfo_group69a49Props}= useContext(TotalContext) as TotalContextProps;
  const {groupc3f8e, setgroupc3f8e}= useContext(TotalContext) as TotalContextProps;
  const {groupc3f8eProps, setgroupc3f8eProps}= useContext(TotalContext) as TotalContextProps;
  const {rule_config_groupa38fa, setrule_config_groupa38fa}= useContext(TotalContext) as TotalContextProps;
  const {rule_config_groupa38faProps, setrule_config_groupa38faProps}= useContext(TotalContext) as TotalContextProps;
  const {info_rule00a91, setinfo_rule00a91}= useContext(TotalContext) as TotalContextProps;
  const {priority_orderebd55, setpriority_orderebd55}= useContext(TotalContext) as TotalContextProps;
  const {is_activefb18e, setis_activefb18e}= useContext(TotalContext) as TotalContextProps;
  const {effective_toc5034, seteffective_toc5034}= useContext(TotalContext) as TotalContextProps;
  const {effective_fromfc1bf, seteffective_fromfc1bf}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions618ef, setdynamicactions618ef}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions618efProps, setdynamicactions618efProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  const handleMapperValue=async()=>{
    try{
    const orchestrationData = getControlOrchestrationData(  
      controlData,
      "788963b195ce493bb5a84ef9698a38fa",
      "489c03330b89448086cd8a28e71fb18e"
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
      setrule_config_groupa38fa((pre:any)=>({...pre,is_active:null}))
    else
      prevRefreshRef.current=true
    handleMapperValue()
  },[is_activefb18e?.refresh])

  const handleChange = async (checked: boolean,comingRule:any={}) => {
    try{
    setIsProcessing(true);
    setrule_config_groupa38fa((prev: any) => ({ ...prev, is_active: checked }));
    let code:string= allCode;
    if (code != '') {
      let codeStates: any = {};
        codeStates['info_group'] = info_group69a49,
        codeStates['setinfo_group'] = setinfo_group69a49,
        codeStates['info_group69a49'] = info_group69a49Props,
        codeStates['setinfo_group69a49'] = setinfo_group69a49Props,
        codeStates['group'] = groupc3f8e,
        codeStates['setgroup'] = setgroupc3f8e,
        codeStates['groupc3f8e'] = groupc3f8eProps,
        codeStates['setgroupc3f8e'] = setgroupc3f8eProps,
        codeStates['rule_config_group'] = rule_config_groupa38fa,
        codeStates['setrule_config_group'] = setrule_config_groupa38fa,
        codeStates['rule_config_groupa38fa'] = rule_config_groupa38faProps,
        codeStates['setrule_config_groupa38fa'] = setrule_config_groupa38faProps,
        codeStates['info_rule'] = info_rule00a91,
        codeStates['setinfo_rule'] = setinfo_rule00a91,
        codeStates['priority_order'] = priority_orderebd55,
        codeStates['setpriority_order'] = setpriority_orderebd55,
        codeStates['is_active'] = is_activefb18e,
        codeStates['setis_active'] = setis_activefb18e,
        codeStates['effective_to'] = effective_toc5034,
        codeStates['seteffective_to'] = seteffective_toc5034,
        codeStates['effective_from'] = effective_fromfc1bf,
        codeStates['seteffective_from'] = seteffective_fromfc1bf,
        codeStates['dynamicactions'] = dynamicactions618ef,
        codeStates['setdynamicactions'] = setdynamicactions618ef,
        codeStates['dynamicactions618ef'] = dynamicactions618efProps,
        codeStates['setdynamicactions618ef'] = setdynamicactions618efProps,
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

  if (is_activefb18e?.isHidden) {
    return <></>
  }
  return (
    <div 
      className=""
      style={{gridColumn: `17 / 25`,gridRow: `12 / 18`, gap:``, height: `100%`, overflow: 'auto'}} >
      <Switch
        className=""
        contentAlign={"left"}
        disabled= {is_activefb18e?.isDisabled ? true : false}
        content="Is Active"
        checked={rule_config_groupa38fa?.is_active || false} 
        onChange={handleChange}
      />
  </div>
  )
}

export default Switchis_active



