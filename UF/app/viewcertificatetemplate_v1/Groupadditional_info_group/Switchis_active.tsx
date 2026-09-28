
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
  const {groupac196, setgroupac196}= useContext(TotalContext) as TotalContextProps;
  const {groupac196Props, setgroupac196Props}= useContext(TotalContext) as TotalContextProps;
  const {template_detail_group268e9, settemplate_detail_group268e9}= useContext(TotalContext) as TotalContextProps;
  const {template_detail_group268e9Props, settemplate_detail_group268e9Props}= useContext(TotalContext) as TotalContextProps;
  const {additional_info_group4d159, setadditional_info_group4d159}= useContext(TotalContext) as TotalContextProps;
  const {additional_info_group4d159Props, setadditional_info_group4d159Props}= useContext(TotalContext) as TotalContextProps;
  const {text_260eef, settext_260eef}= useContext(TotalContext) as TotalContextProps;
  const {validity_months25400, setvalidity_months25400}= useContext(TotalContext) as TotalContextProps;
  const {effective_froma55d1, seteffective_froma55d1}= useContext(TotalContext) as TotalContextProps;
  const {effective_to3bac5, seteffective_to3bac5}= useContext(TotalContext) as TotalContextProps;
  const {is_active5793c, setis_active5793c}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  const handleMapperValue=async()=>{
    try{
    const orchestrationData = getControlOrchestrationData(  
      controlData,
      "e23c4a3e08e7453caf5b207aaa64d159",
      "216bf99695a243e9af5ae600c135793c"
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
      setadditional_info_group4d159((pre:any)=>({...pre,is_active:null}))
    else
      prevRefreshRef.current=true
    handleMapperValue()
  },[is_active5793c?.refresh])

  const handleChange = async (checked: boolean,comingRule:any={}) => {
    try{
    setIsProcessing(true);
    setadditional_info_group4d159((prev: any) => ({ ...prev, is_active: checked }));
    let code:string= allCode;
    if (code != '') {
      let codeStates: any = {};
        codeStates['group'] = groupac196,
        codeStates['setgroup'] = setgroupac196,
        codeStates['groupac196'] = groupac196Props,
        codeStates['setgroupac196'] = setgroupac196Props,
        codeStates['template_detail_group'] = template_detail_group268e9,
        codeStates['settemplate_detail_group'] = settemplate_detail_group268e9,
        codeStates['template_detail_group268e9'] = template_detail_group268e9Props,
        codeStates['settemplate_detail_group268e9'] = settemplate_detail_group268e9Props,
        codeStates['additional_info_group'] = additional_info_group4d159,
        codeStates['setadditional_info_group'] = setadditional_info_group4d159,
        codeStates['additional_info_group4d159'] = additional_info_group4d159Props,
        codeStates['setadditional_info_group4d159'] = setadditional_info_group4d159Props,
        codeStates['text_2'] = text_260eef,
        codeStates['settext_2'] = settext_260eef,
        codeStates['validity_months'] = validity_months25400,
        codeStates['setvalidity_months'] = setvalidity_months25400,
        codeStates['effective_from'] = effective_froma55d1,
        codeStates['seteffective_from'] = seteffective_froma55d1,
        codeStates['effective_to'] = effective_to3bac5,
        codeStates['seteffective_to'] = seteffective_to3bac5,
        codeStates['is_active'] = is_active5793c,
        codeStates['setis_active'] = setis_active5793c,
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

  if (is_active5793c?.isHidden) {
    return <></>
  }
  return (
    <div 
      className=""
      style={{gridColumn: `9 / 17`,gridRow: `31 / 36`, gap:``, height: `100%`, overflow: 'auto'}} >
      <Switch
        className=""
        disabled= {is_active5793c?.isDisabled ? true : false}
        content="Active"
        checked={additional_info_group4d159?.is_active || false} 
        onChange={handleChange}
      />
  </div>
  )
}

export default Switchis_active



