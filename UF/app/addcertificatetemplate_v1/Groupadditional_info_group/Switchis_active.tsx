
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
  const {dfd_certificatetemplate_v1Props, setdfd_certificatetemplate_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const {groupb224b, setgroupb224b}= useContext(TotalContext) as TotalContextProps;
  const {groupb224bProps, setgroupb224bProps}= useContext(TotalContext) as TotalContextProps;
  const {template_detail_groupec16d, settemplate_detail_groupec16d}= useContext(TotalContext) as TotalContextProps;
  const {template_detail_groupec16dProps, settemplate_detail_groupec16dProps}= useContext(TotalContext) as TotalContextProps;
  const {additional_info_group23860, setadditional_info_group23860}= useContext(TotalContext) as TotalContextProps;
  const {additional_info_group23860Props, setadditional_info_group23860Props}= useContext(TotalContext) as TotalContextProps;
  const {text_26f93c, settext_26f93c}= useContext(TotalContext) as TotalContextProps;
  const {validity_months29fbf, setvalidity_months29fbf}= useContext(TotalContext) as TotalContextProps;
  const {effective_from9832b, seteffective_from9832b}= useContext(TotalContext) as TotalContextProps;
  const {effective_to1ba20, seteffective_to1ba20}= useContext(TotalContext) as TotalContextProps;
  const {is_active8acbf, setis_active8acbf}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionb465f, setdynamicactionb465f}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionb465fProps, setdynamicactionb465fProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  const handleMapperValue=async()=>{
    try{
    const orchestrationData = getControlOrchestrationData(  
      controlData,
      "da4538aa9fab4d87a1d0b9ee7df23860",
      "7b2d7ac58472407abe0d9852da78acbf"
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
      setadditional_info_group23860((pre:any)=>({...pre,is_active:null}))
    else
      prevRefreshRef.current=true
    handleMapperValue()
  },[is_active8acbf?.refresh])

  useEffect(() => {
    if(Array.isArray(dfd_certificatetemplate_v1Props) && dfd_certificatetemplate_v1Props?.length == 1){
      setadditional_info_group23860((pre:any)=>({...pre,is_active:dfd_certificatetemplate_v1Props[0]?.is_active}))
    }
  },[dfd_certificatetemplate_v1Props])
  const handleChange = async (checked: boolean,comingRule:any={}) => {
    try{
    setIsProcessing(true);
    setadditional_info_group23860((prev: any) => ({ ...prev, is_active: checked }));
    let code:string= allCode;
    if (code != '') {
      let codeStates: any = {};
        codeStates['group'] = groupb224b,
        codeStates['setgroup'] = setgroupb224b,
        codeStates['groupb224b'] = groupb224bProps,
        codeStates['setgroupb224b'] = setgroupb224bProps,
        codeStates['template_detail_group'] = template_detail_groupec16d,
        codeStates['settemplate_detail_group'] = settemplate_detail_groupec16d,
        codeStates['template_detail_groupec16d'] = template_detail_groupec16dProps,
        codeStates['settemplate_detail_groupec16d'] = settemplate_detail_groupec16dProps,
        codeStates['additional_info_group'] = additional_info_group23860,
        codeStates['setadditional_info_group'] = setadditional_info_group23860,
        codeStates['additional_info_group23860'] = additional_info_group23860Props,
        codeStates['setadditional_info_group23860'] = setadditional_info_group23860Props,
        codeStates['text_2'] = text_26f93c,
        codeStates['settext_2'] = settext_26f93c,
        codeStates['validity_months'] = validity_months29fbf,
        codeStates['setvalidity_months'] = setvalidity_months29fbf,
        codeStates['effective_from'] = effective_from9832b,
        codeStates['seteffective_from'] = seteffective_from9832b,
        codeStates['effective_to'] = effective_to1ba20,
        codeStates['seteffective_to'] = seteffective_to1ba20,
        codeStates['is_active'] = is_active8acbf,
        codeStates['setis_active'] = setis_active8acbf,
        codeStates['dynamicaction'] = dynamicactionb465f,
        codeStates['setdynamicaction'] = setdynamicactionb465f,
        codeStates['dynamicactionb465f'] = dynamicactionb465fProps,
        codeStates['setdynamicactionb465f'] = setdynamicactionb465fProps,
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

  if (is_active8acbf?.isHidden) {
    return <></>
  }
  return (
    <div 
      className=""
      style={{gridColumn: `9 / 17`,gridRow: `31 / 36`, gap:``, height: `100%`, overflow: 'auto'}} >
      <Switch
        className=""
        disabled= {is_active8acbf?.isDisabled ? true : false}
        content="Active"
        checked={additional_info_group23860?.is_active || false} 
        onChange={handleChange}
      />
  </div>
  )
}

export default Switchis_active



