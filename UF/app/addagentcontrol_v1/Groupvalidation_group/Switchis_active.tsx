
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
  const {dfd_aiagentcontrol_v1Props, setdfd_aiagentcontrol_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const {overall_ai_asset_registryfa224, setoverall_ai_asset_registryfa224}= useContext(TotalContext) as TotalContextProps;
  const {overall_ai_asset_registryfa224Props, setoverall_ai_asset_registryfa224Props}= useContext(TotalContext) as TotalContextProps;
  const {register_ai_asset_group9d43f, setregister_ai_asset_group9d43f}= useContext(TotalContext) as TotalContextProps;
  const {register_ai_asset_group9d43fProps, setregister_ai_asset_group9d43fProps}= useContext(TotalContext) as TotalContextProps;
  const {model_info_group5b641, setmodel_info_group5b641}= useContext(TotalContext) as TotalContextProps;
  const {model_info_group5b641Props, setmodel_info_group5b641Props}= useContext(TotalContext) as TotalContextProps;
  const {grounding_groupb1b6f, setgrounding_groupb1b6f}= useContext(TotalContext) as TotalContextProps;
  const {grounding_groupb1b6fProps, setgrounding_groupb1b6fProps}= useContext(TotalContext) as TotalContextProps;
  const {validation_group4d206, setvalidation_group4d206}= useContext(TotalContext) as TotalContextProps;
  const {validation_group4d206Props, setvalidation_group4d206Props}= useContext(TotalContext) as TotalContextProps;
  const {security_text91cf6, setsecurity_text91cf6}= useContext(TotalContext) as TotalContextProps;
  const {kill_switch_state_code3ed20, setkill_switch_state_code3ed20}= useContext(TotalContext) as TotalContextProps;
  const {kill_switch_updated_by7a179, setkill_switch_updated_by7a179}= useContext(TotalContext) as TotalContextProps;
  const {kill_switch_updated_on0aadf, setkill_switch_updated_on0aadf}= useContext(TotalContext) as TotalContextProps;
  const {is_activee26e9, setis_activee26e9}= useContext(TotalContext) as TotalContextProps;
  const {segregation_notesd7da7, setsegregation_notesd7da7}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions78fa5, setdynamicactions78fa5}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions78fa5Props, setdynamicactions78fa5Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  const handleMapperValue=async()=>{
    try{
    const orchestrationData = getControlOrchestrationData(  
      controlData,
      "1c0817c1402d547509cb443bace4d206",
      "6cf0cdd69e09e9ab7ec91ee57b3e26e9"
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
      setvalidation_group4d206((pre:any)=>({...pre,is_active:null}))
    else
      prevRefreshRef.current=true
    handleMapperValue()
  },[is_activee26e9?.refresh])

  useEffect(() => {
    if(Array.isArray(dfd_aiagentcontrol_v1Props) && dfd_aiagentcontrol_v1Props?.length == 1){
      setvalidation_group4d206((pre:any)=>({...pre,is_active:dfd_aiagentcontrol_v1Props[0]?.is_active}))
    }
  },[dfd_aiagentcontrol_v1Props])
  const handleChange = async (checked: boolean,comingRule:any={}) => {
    try{
    setIsProcessing(true);
    setvalidation_group4d206((prev: any) => ({ ...prev, is_active: checked }));
    let code:string= allCode;
    if (code != '') {
      let codeStates: any = {};
        codeStates['overall_ai_asset_registry'] = overall_ai_asset_registryfa224,
        codeStates['setoverall_ai_asset_registry'] = setoverall_ai_asset_registryfa224,
        codeStates['overall_ai_asset_registryfa224'] = overall_ai_asset_registryfa224Props,
        codeStates['setoverall_ai_asset_registryfa224'] = setoverall_ai_asset_registryfa224Props,
        codeStates['register_ai_asset_group'] = register_ai_asset_group9d43f,
        codeStates['setregister_ai_asset_group'] = setregister_ai_asset_group9d43f,
        codeStates['register_ai_asset_group9d43f'] = register_ai_asset_group9d43fProps,
        codeStates['setregister_ai_asset_group9d43f'] = setregister_ai_asset_group9d43fProps,
        codeStates['model_info_group'] = model_info_group5b641,
        codeStates['setmodel_info_group'] = setmodel_info_group5b641,
        codeStates['model_info_group5b641'] = model_info_group5b641Props,
        codeStates['setmodel_info_group5b641'] = setmodel_info_group5b641Props,
        codeStates['grounding_group'] = grounding_groupb1b6f,
        codeStates['setgrounding_group'] = setgrounding_groupb1b6f,
        codeStates['grounding_groupb1b6f'] = grounding_groupb1b6fProps,
        codeStates['setgrounding_groupb1b6f'] = setgrounding_groupb1b6fProps,
        codeStates['validation_group'] = validation_group4d206,
        codeStates['setvalidation_group'] = setvalidation_group4d206,
        codeStates['validation_group4d206'] = validation_group4d206Props,
        codeStates['setvalidation_group4d206'] = setvalidation_group4d206Props,
        codeStates['security_text'] = security_text91cf6,
        codeStates['setsecurity_text'] = setsecurity_text91cf6,
        codeStates['kill_switch_state_code'] = kill_switch_state_code3ed20,
        codeStates['setkill_switch_state_code'] = setkill_switch_state_code3ed20,
        codeStates['kill_switch_updated_by'] = kill_switch_updated_by7a179,
        codeStates['setkill_switch_updated_by'] = setkill_switch_updated_by7a179,
        codeStates['kill_switch_updated_on'] = kill_switch_updated_on0aadf,
        codeStates['setkill_switch_updated_on'] = setkill_switch_updated_on0aadf,
        codeStates['is_active'] = is_activee26e9,
        codeStates['setis_active'] = setis_activee26e9,
        codeStates['segregation_notes'] = segregation_notesd7da7,
        codeStates['setsegregation_notes'] = setsegregation_notesd7da7,
        codeStates['dynamicactions'] = dynamicactions78fa5,
        codeStates['setdynamicactions'] = setdynamicactions78fa5,
        codeStates['dynamicactions78fa5'] = dynamicactions78fa5Props,
        codeStates['setdynamicactions78fa5'] = setdynamicactions78fa5Props,
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

  if (is_activee26e9?.isHidden) {
    return <></>
  }
  return (
    <div 
      className=""
      style={{gridColumn: `19 / 25`,gridRow: `15 / 20`, gap:``, height: `100%`, overflow: 'auto'}} >
      <Switch
        className=""
        contentAlign={"left"}
        disabled= {is_activee26e9?.isDisabled ? true : false}
        content="Is Active"
        checked={validation_group4d206?.is_active || false} 
        onChange={handleChange}
      />
  </div>
  )
}

export default Switchis_active



