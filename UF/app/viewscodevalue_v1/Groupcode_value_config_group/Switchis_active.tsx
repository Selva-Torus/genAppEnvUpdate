
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
  const {dfd_codevalue_v1Props, setdfd_codevalue_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const {code_value_group30fa3, setcode_value_group30fa3}= useContext(TotalContext) as TotalContextProps;
  const {code_value_group30fa3Props, setcode_value_group30fa3Props}= useContext(TotalContext) as TotalContextProps;
  const {code_group871cc, setcode_group871cc}= useContext(TotalContext) as TotalContextProps;
  const {code_group871ccProps, setcode_group871ccProps}= useContext(TotalContext) as TotalContextProps;
  const {code_value_config_groupa4a28, setcode_value_config_groupa4a28}= useContext(TotalContext) as TotalContextProps;
  const {code_value_config_groupa4a28Props, setcode_value_config_groupa4a28Props}= useContext(TotalContext) as TotalContextProps;
  const {code_config_txt2ca5d, setcode_config_txt2ca5d}= useContext(TotalContext) as TotalContextProps;
  const {colour_hint87c80, setcolour_hint87c80}= useContext(TotalContext) as TotalContextProps;
  const {numeric_weight53c97, setnumeric_weight53c97}= useContext(TotalContext) as TotalContextProps;
  const {is_actived07bc, setis_actived07bc}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  const handleMapperValue=async()=>{
    try{
    const orchestrationData = getControlOrchestrationData(  
      controlData,
      "cd9098eca6d8dbbd6830eb6c125a4a28",
      "63cee145d5aaf923298763c36ecd07bc"
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
      setcode_value_config_groupa4a28((pre:any)=>({...pre,is_active:null}))
    else
      prevRefreshRef.current=true
    handleMapperValue()
  },[is_actived07bc?.refresh])

  useEffect(() => {
    if(Array.isArray(dfd_codevalue_v1Props) && dfd_codevalue_v1Props?.length == 1){
      setcode_value_config_groupa4a28((pre:any)=>({...pre,is_active:dfd_codevalue_v1Props[0]?.is_active}))
    }
  },[dfd_codevalue_v1Props])
  const handleChange = async (checked: boolean,comingRule:any={}) => {
    try{
    setIsProcessing(true);
    setcode_value_config_groupa4a28((prev: any) => ({ ...prev, is_active: checked }));
    let code:string= allCode;
    if (code != '') {
      let codeStates: any = {};
        codeStates['code_value_group'] = code_value_group30fa3,
        codeStates['setcode_value_group'] = setcode_value_group30fa3,
        codeStates['code_value_group30fa3'] = code_value_group30fa3Props,
        codeStates['setcode_value_group30fa3'] = setcode_value_group30fa3Props,
        codeStates['code_group'] = code_group871cc,
        codeStates['setcode_group'] = setcode_group871cc,
        codeStates['code_group871cc'] = code_group871ccProps,
        codeStates['setcode_group871cc'] = setcode_group871ccProps,
        codeStates['code_value_config_group'] = code_value_config_groupa4a28,
        codeStates['setcode_value_config_group'] = setcode_value_config_groupa4a28,
        codeStates['code_value_config_groupa4a28'] = code_value_config_groupa4a28Props,
        codeStates['setcode_value_config_groupa4a28'] = setcode_value_config_groupa4a28Props,
        codeStates['code_config_txt'] = code_config_txt2ca5d,
        codeStates['setcode_config_txt'] = setcode_config_txt2ca5d,
        codeStates['colour_hint'] = colour_hint87c80,
        codeStates['setcolour_hint'] = setcolour_hint87c80,
        codeStates['numeric_weight'] = numeric_weight53c97,
        codeStates['setnumeric_weight'] = setnumeric_weight53c97,
        codeStates['is_active'] = is_actived07bc,
        codeStates['setis_active'] = setis_actived07bc,
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

  if (is_actived07bc?.isHidden) {
    return <></>
  }
  return (
    <div 
      className=""
      style={{gridColumn: `1 / 8`,gridRow: `43 / 55`, gap:``, height: `100%`, overflow: 'auto'}} >
      <Switch
        className=""
        contentAlign={"left"}
        headerText="Status"
        headerPosition="top"
        disabled= {is_actived07bc?.isDisabled ? true : false}
        content="content"
        checkedContent="Yes"                                                                                                                                             
        uncheckedContent="No"
        checked={code_value_config_groupa4a28?.is_active || false} 
        onChange={handleChange}
      />
  </div>
  )
}

export default Switchis_active



