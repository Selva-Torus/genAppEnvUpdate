
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

const Switchis_primary = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
  const { token } = useGlobal();
  const decodedTokenObj: any = decodeToken(token);
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const handleDfdRefresh = useHandleDfdRefresh();
  const {dfd_dataclasslist_v1Props, setdfd_dataclasslist_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const {overall_ai_asset_registryb99cd, setoverall_ai_asset_registryb99cd}= useContext(TotalContext) as TotalContextProps;
  const {overall_ai_asset_registryb99cdProps, setoverall_ai_asset_registryb99cdProps}= useContext(TotalContext) as TotalContextProps;
  const {register_ai_asset_group01907, setregister_ai_asset_group01907}= useContext(TotalContext) as TotalContextProps;
  const {register_ai_asset_group01907Props, setregister_ai_asset_group01907Props}= useContext(TotalContext) as TotalContextProps;
  const {asset_identity_groupfe421, setasset_identity_groupfe421}= useContext(TotalContext) as TotalContextProps;
  const {asset_identity_groupfe421Props, setasset_identity_groupfe421Props}= useContext(TotalContext) as TotalContextProps;
  const {data_classification_text0dc1f, setdata_classification_text0dc1f}= useContext(TotalContext) as TotalContextProps;
  const {asset_name44531, setasset_name44531}= useContext(TotalContext) as TotalContextProps;
  const {data_class_codeaacea, setdata_class_codeaacea}= useContext(TotalContext) as TotalContextProps;
  const {is_primary29d9f, setis_primary29d9f}= useContext(TotalContext) as TotalContextProps;
  const {notes7f668, setnotes7f668}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions92938, setdynamicactions92938}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions92938Props, setdynamicactions92938Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  const handleMapperValue=async()=>{
    try{
    const orchestrationData = getControlOrchestrationData(  
      controlData,
      "c78dbda872d202ccc1f17844800fe421",
      "fcb6289f2dff49dc92de8a7ba3229d9f"
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
      setasset_identity_groupfe421((pre:any)=>({...pre,is_primary:null}))
    else
      prevRefreshRef.current=true
    handleMapperValue()
  },[is_primary29d9f?.refresh])

  useEffect(() => {
    if(Array.isArray(dfd_dataclasslist_v1Props) && dfd_dataclasslist_v1Props?.length == 1){
      setasset_identity_groupfe421((pre:any)=>({...pre,is_primary:dfd_dataclasslist_v1Props[0]?.is_primary}))
    }
  },[dfd_dataclasslist_v1Props])
  const handleChange = async (checked: boolean,comingRule:any={}) => {
    try{
    setIsProcessing(true);
    setasset_identity_groupfe421((prev: any) => ({ ...prev, is_primary: checked }));
    let code:string= allCode;
    if (code != '') {
      let codeStates: any = {};
        codeStates['overall_ai_asset_registry'] = overall_ai_asset_registryb99cd,
        codeStates['setoverall_ai_asset_registry'] = setoverall_ai_asset_registryb99cd,
        codeStates['overall_ai_asset_registryb99cd'] = overall_ai_asset_registryb99cdProps,
        codeStates['setoverall_ai_asset_registryb99cd'] = setoverall_ai_asset_registryb99cdProps,
        codeStates['register_ai_asset_group'] = register_ai_asset_group01907,
        codeStates['setregister_ai_asset_group'] = setregister_ai_asset_group01907,
        codeStates['register_ai_asset_group01907'] = register_ai_asset_group01907Props,
        codeStates['setregister_ai_asset_group01907'] = setregister_ai_asset_group01907Props,
        codeStates['asset_identity_group'] = asset_identity_groupfe421,
        codeStates['setasset_identity_group'] = setasset_identity_groupfe421,
        codeStates['asset_identity_groupfe421'] = asset_identity_groupfe421Props,
        codeStates['setasset_identity_groupfe421'] = setasset_identity_groupfe421Props,
        codeStates['data_classification_text'] = data_classification_text0dc1f,
        codeStates['setdata_classification_text'] = setdata_classification_text0dc1f,
        codeStates['asset_name'] = asset_name44531,
        codeStates['setasset_name'] = setasset_name44531,
        codeStates['data_class_code'] = data_class_codeaacea,
        codeStates['setdata_class_code'] = setdata_class_codeaacea,
        codeStates['is_primary'] = is_primary29d9f,
        codeStates['setis_primary'] = setis_primary29d9f,
        codeStates['notes'] = notes7f668,
        codeStates['setnotes'] = setnotes7f668,
        codeStates['dynamicactions'] = dynamicactions92938,
        codeStates['setdynamicactions'] = setdynamicactions92938,
        codeStates['dynamicactions92938'] = dynamicactions92938Props,
        codeStates['setdynamicactions92938'] = setdynamicactions92938Props,
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

  if (is_primary29d9f?.isHidden) {
    return <></>
  }
  return (
    <div 
      className=""
      style={{gridColumn: `1 / 25`,gridRow: `21 / 26`, gap:``, height: `100%`, overflow: 'auto'}} >
      <Switch
        className=""
        contentAlign={"left"}
        disabled= {is_primary29d9f?.isDisabled ? true : false}
        content="Is Primary"
        checked={asset_identity_groupfe421?.is_primary || false} 
        onChange={handleChange}
      />
  </div>
  )
}

export default Switchis_primary



