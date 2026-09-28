
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

const Switchuses_rag = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
  const { token } = useGlobal();
  const decodedTokenObj: any = decodeToken(token);
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const handleDfdRefresh = useHandleDfdRefresh();
  const {dfd_modeldetails_v1Props, setdfd_modeldetails_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const {overall_ai_asset_registry61215, setoverall_ai_asset_registry61215}= useContext(TotalContext) as TotalContextProps;
  const {overall_ai_asset_registry61215Props, setoverall_ai_asset_registry61215Props}= useContext(TotalContext) as TotalContextProps;
  const {register_ai_asset_group1b724, setregister_ai_asset_group1b724}= useContext(TotalContext) as TotalContextProps;
  const {register_ai_asset_group1b724Props, setregister_ai_asset_group1b724Props}= useContext(TotalContext) as TotalContextProps;
  const {model_info_group905fc, setmodel_info_group905fc}= useContext(TotalContext) as TotalContextProps;
  const {model_info_group905fcProps, setmodel_info_group905fcProps}= useContext(TotalContext) as TotalContextProps;
  const {grounding_group4df86, setgrounding_group4df86}= useContext(TotalContext) as TotalContextProps;
  const {grounding_group4df86Props, setgrounding_group4df86Props}= useContext(TotalContext) as TotalContextProps;
  const {grounding_textf7f03, setgrounding_textf7f03}= useContext(TotalContext) as TotalContextProps;
  const {training_sourced0a22, settraining_sourced0a22}= useContext(TotalContext) as TotalContextProps;
  const {grounding_sourceccba4, setgrounding_sourceccba4}= useContext(TotalContext) as TotalContextProps;
  const {vector_store_named3360, setvector_store_named3360}= useContext(TotalContext) as TotalContextProps;
  const {uses_rag1ab9a, setuses_rag1ab9a}= useContext(TotalContext) as TotalContextProps;
  const {validation_group50e82, setvalidation_group50e82}= useContext(TotalContext) as TotalContextProps;
  const {validation_group50e82Props, setvalidation_group50e82Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions16b90, setdynamicactions16b90}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions16b90Props, setdynamicactions16b90Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  const handleMapperValue=async()=>{
    try{
    const orchestrationData = getControlOrchestrationData(  
      controlData,
      "ff805247878c566998389c94bdf4df86",
      "b2a446301111790d80bae9402701ab9a"
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
      setgrounding_group4df86((pre:any)=>({...pre,uses_rag:null}))
    else
      prevRefreshRef.current=true
    handleMapperValue()
  },[uses_rag1ab9a?.refresh])

  useEffect(() => {
    if(Array.isArray(dfd_modeldetails_v1Props) && dfd_modeldetails_v1Props?.length == 1){
      setgrounding_group4df86((pre:any)=>({...pre,uses_rag:dfd_modeldetails_v1Props[0]?.uses_rag}))
    }
  },[dfd_modeldetails_v1Props])
  const handleChange = async (checked: boolean,comingRule:any={}) => {
    try{
    setIsProcessing(true);
    setgrounding_group4df86((prev: any) => ({ ...prev, uses_rag: checked }));
    let code:string= allCode;
    if (code != '') {
      let codeStates: any = {};
        codeStates['overall_ai_asset_registry'] = overall_ai_asset_registry61215,
        codeStates['setoverall_ai_asset_registry'] = setoverall_ai_asset_registry61215,
        codeStates['overall_ai_asset_registry61215'] = overall_ai_asset_registry61215Props,
        codeStates['setoverall_ai_asset_registry61215'] = setoverall_ai_asset_registry61215Props,
        codeStates['register_ai_asset_group'] = register_ai_asset_group1b724,
        codeStates['setregister_ai_asset_group'] = setregister_ai_asset_group1b724,
        codeStates['register_ai_asset_group1b724'] = register_ai_asset_group1b724Props,
        codeStates['setregister_ai_asset_group1b724'] = setregister_ai_asset_group1b724Props,
        codeStates['model_info_group'] = model_info_group905fc,
        codeStates['setmodel_info_group'] = setmodel_info_group905fc,
        codeStates['model_info_group905fc'] = model_info_group905fcProps,
        codeStates['setmodel_info_group905fc'] = setmodel_info_group905fcProps,
        codeStates['grounding_group'] = grounding_group4df86,
        codeStates['setgrounding_group'] = setgrounding_group4df86,
        codeStates['grounding_group4df86'] = grounding_group4df86Props,
        codeStates['setgrounding_group4df86'] = setgrounding_group4df86Props,
        codeStates['grounding_text'] = grounding_textf7f03,
        codeStates['setgrounding_text'] = setgrounding_textf7f03,
        codeStates['training_source'] = training_sourced0a22,
        codeStates['settraining_source'] = settraining_sourced0a22,
        codeStates['grounding_source'] = grounding_sourceccba4,
        codeStates['setgrounding_source'] = setgrounding_sourceccba4,
        codeStates['vector_store_name'] = vector_store_named3360,
        codeStates['setvector_store_name'] = setvector_store_named3360,
        codeStates['uses_rag'] = uses_rag1ab9a,
        codeStates['setuses_rag'] = setuses_rag1ab9a,
        codeStates['validation_group'] = validation_group50e82,
        codeStates['setvalidation_group'] = setvalidation_group50e82,
        codeStates['validation_group50e82'] = validation_group50e82Props,
        codeStates['setvalidation_group50e82'] = setvalidation_group50e82Props,
        codeStates['dynamicactions'] = dynamicactions16b90,
        codeStates['setdynamicactions'] = setdynamicactions16b90,
        codeStates['dynamicactions16b90'] = dynamicactions16b90Props,
        codeStates['setdynamicactions16b90'] = setdynamicactions16b90Props,
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

  if (uses_rag1ab9a?.isHidden) {
    return <></>
  }
  return (
    <div 
      className=""
      style={{gridColumn: `1 / 13`,gridRow: `28 / 33`, gap:``, height: `100%`, overflow: 'auto'}} >
      <Switch
        className=""
        contentAlign={"left"}
        disabled= {uses_rag1ab9a?.isDisabled ? true : false}
        content="Uses RAG"
        checked={grounding_group4df86?.uses_rag || false} 
        onChange={handleChange}
      />
  </div>
  )
}

export default Switchuses_rag



