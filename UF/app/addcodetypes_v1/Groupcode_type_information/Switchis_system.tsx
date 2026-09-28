
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

const Switchis_system = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
  const { token } = useGlobal();
  const decodedTokenObj: any = decodeToken(token);
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const handleDfdRefresh = useHandleDfdRefresh();
  const {dfd_codetype_v1Props, setdfd_codetype_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const {groupa1a96, setgroupa1a96}= useContext(TotalContext) as TotalContextProps;
  const {groupa1a96Props, setgroupa1a96Props}= useContext(TotalContext) as TotalContextProps;
  const {code_type_informationd59aa, setcode_type_informationd59aa}= useContext(TotalContext) as TotalContextProps;
  const {code_type_informationd59aaProps, setcode_type_informationd59aaProps}= useContext(TotalContext) as TotalContextProps;
  const {code_typeb31bb, setcode_typeb31bb}= useContext(TotalContext) as TotalContextProps;
  const {descriptione6525, setdescriptione6525}= useContext(TotalContext) as TotalContextProps;
  const {is_system869d1, setis_system869d1}= useContext(TotalContext) as TotalContextProps;
  const {is_active28565, setis_active28565}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions48144, setdynamicactions48144}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions48144Props, setdynamicactions48144Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  const handleMapperValue=async()=>{
    try{
    const orchestrationData = getControlOrchestrationData(  
      controlData,
      "e5281ffccb964106b9ffd0a5235d59aa",
      "c56da87d8ec84d69b922b1147df869d1"
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
      setcode_type_informationd59aa((pre:any)=>({...pre,is_system:null}))
    else
      prevRefreshRef.current=true
    handleMapperValue()
  },[is_system869d1?.refresh])

  useEffect(() => {
    if(Array.isArray(dfd_codetype_v1Props) && dfd_codetype_v1Props?.length == 1){
      setcode_type_informationd59aa((pre:any)=>({...pre,is_system:dfd_codetype_v1Props[0]?.is_system}))
    }
  },[dfd_codetype_v1Props])
  const handleChange = async (checked: boolean,comingRule:any={}) => {
    try{
    setIsProcessing(true);
    setcode_type_informationd59aa((prev: any) => ({ ...prev, is_system: checked }));
    let code:string= allCode;
    if (code != '') {
      let codeStates: any = {};
        codeStates['group'] = groupa1a96,
        codeStates['setgroup'] = setgroupa1a96,
        codeStates['groupa1a96'] = groupa1a96Props,
        codeStates['setgroupa1a96'] = setgroupa1a96Props,
        codeStates['code_type_information'] = code_type_informationd59aa,
        codeStates['setcode_type_information'] = setcode_type_informationd59aa,
        codeStates['code_type_informationd59aa'] = code_type_informationd59aaProps,
        codeStates['setcode_type_informationd59aa'] = setcode_type_informationd59aaProps,
        codeStates['code_type'] = code_typeb31bb,
        codeStates['setcode_type'] = setcode_typeb31bb,
        codeStates['description'] = descriptione6525,
        codeStates['setdescription'] = setdescriptione6525,
        codeStates['is_system'] = is_system869d1,
        codeStates['setis_system'] = setis_system869d1,
        codeStates['is_active'] = is_active28565,
        codeStates['setis_active'] = setis_active28565,
        codeStates['dynamicactions'] = dynamicactions48144,
        codeStates['setdynamicactions'] = setdynamicactions48144,
        codeStates['dynamicactions48144'] = dynamicactions48144Props,
        codeStates['setdynamicactions48144'] = setdynamicactions48144Props,
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

  if (is_system869d1?.isHidden) {
    return <></>
  }
  return (
    <div 
      className=""
      style={{gridColumn: `1 / 5`,gridRow: `19 / 23`, gap:``, height: `100%`, overflow: 'auto'}} >
      <Switch
        className=""
        contentAlign={"left"}
        disabled= {is_system869d1?.isDisabled ? true : false}
        content="is_system"
        checkedContent=""                                                                                                                                             
        uncheckedContent=""
        checked={code_type_informationd59aa?.is_system || false} 
        onChange={handleChange}
      />
  </div>
  )
}

export default Switchis_system



