
'use client'
import React, { useState, useContext, useEffect, useRef } from 'react';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment'
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

const Switchovertime_eligible = ({checkToAdd,setCheckToAdd,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
  const token:string = getCookie('token');
  const decodedTokenObj: any = decodeToken(token);
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const handleDfdRefresh = useHandleDfdRefresh();
  const {dfd_jobgrade_v1Props, setdfd_jobgrade_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const {overall_group926e0, setoverall_group926e0}= useContext(TotalContext) as TotalContextProps;
  const {overall_group926e0Props, setoverall_group926e0Props}= useContext(TotalContext) as TotalContextProps;
  const {grade_information_group162a8, setgrade_information_group162a8}= useContext(TotalContext) as TotalContextProps;
  const {grade_information_group162a8Props, setgrade_information_group162a8Props}= useContext(TotalContext) as TotalContextProps;
  const {compensation_benfits_groupa044d, setcompensation_benfits_groupa044d}= useContext(TotalContext) as TotalContextProps;
  const {compensation_benfits_groupa044dProps, setcompensation_benfits_groupa044dProps}= useContext(TotalContext) as TotalContextProps;
  const {category_configuration_text0f4bd, setcategory_configuration_text0f4bd}= useContext(TotalContext) as TotalContextProps;
  const {min_salary22457, setmin_salary22457}= useContext(TotalContext) as TotalContextProps;
  const {max_salary4199f, setmax_salary4199f}= useContext(TotalContext) as TotalContextProps;
  const {currencyd61f7, setcurrencyd61f7}= useContext(TotalContext) as TotalContextProps;
  const {bonus_percentagec00a0, setbonus_percentagec00a0}= useContext(TotalContext) as TotalContextProps;
  const {promotion_eligible28dff, setpromotion_eligible28dff}= useContext(TotalContext) as TotalContextProps;
  const {overtime_eligiblee49e9, setovertime_eligiblee49e9}= useContext(TotalContext) as TotalContextProps;
  const {hr_policies_groupa0e79, sethr_policies_groupa0e79}= useContext(TotalContext) as TotalContextProps;
  const {hr_policies_groupa0e79Props, sethr_policies_groupa0e79Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  const handleMapperValue=async()=>{
    try{
    const orchestrationData = getControlOrchestrationData(  
      controlData,
      "ff5ef8668484fc5fdc076b33084a044d",
      "72e76b7e8d11081435a3a0b36a2e49e9"
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
      setcompensation_benfits_groupa044d((pre:any)=>({...pre,overtime_eligible:null}))
    else
      prevRefreshRef.current=true
    handleMapperValue()
  },[overtime_eligiblee49e9?.refresh])

  useEffect(() => {
    if(Array.isArray(dfd_jobgrade_v1Props) && dfd_jobgrade_v1Props?.length == 1){
      setcompensation_benfits_groupa044d((pre:any)=>({...pre,overtime_eligible:dfd_jobgrade_v1Props[0]?.overtime_eligible}))
    }
  },[dfd_jobgrade_v1Props])
  const handleChange = async (checked: boolean,comingRule:any={}) => {
    try{
    setIsProcessing(true);
    setcompensation_benfits_groupa044d((prev: any) => ({ ...prev, overtime_eligible: checked }));
    let code:string= allCode;
    if (code != '') {
      let codeStates: any = {};
        codeStates['overall_group'] = overall_group926e0,
        codeStates['setoverall_group'] = setoverall_group926e0,
        codeStates['overall_group926e0'] = overall_group926e0Props,
        codeStates['setoverall_group926e0'] = setoverall_group926e0Props,
        codeStates['grade_information_group'] = grade_information_group162a8,
        codeStates['setgrade_information_group'] = setgrade_information_group162a8,
        codeStates['grade_information_group162a8'] = grade_information_group162a8Props,
        codeStates['setgrade_information_group162a8'] = setgrade_information_group162a8Props,
        codeStates['compensation_benfits_group'] = compensation_benfits_groupa044d,
        codeStates['setcompensation_benfits_group'] = setcompensation_benfits_groupa044d,
        codeStates['compensation_benfits_groupa044d'] = compensation_benfits_groupa044dProps,
        codeStates['setcompensation_benfits_groupa044d'] = setcompensation_benfits_groupa044dProps,
        codeStates['category_configuration_text'] = category_configuration_text0f4bd,
        codeStates['setcategory_configuration_text'] = setcategory_configuration_text0f4bd,
        codeStates['min_salary'] = min_salary22457,
        codeStates['setmin_salary'] = setmin_salary22457,
        codeStates['max_salary'] = max_salary4199f,
        codeStates['setmax_salary'] = setmax_salary4199f,
        codeStates['currency'] = currencyd61f7,
        codeStates['setcurrency'] = setcurrencyd61f7,
        codeStates['bonus_percentage'] = bonus_percentagec00a0,
        codeStates['setbonus_percentage'] = setbonus_percentagec00a0,
        codeStates['promotion_eligible'] = promotion_eligible28dff,
        codeStates['setpromotion_eligible'] = setpromotion_eligible28dff,
        codeStates['overtime_eligible'] = overtime_eligiblee49e9,
        codeStates['setovertime_eligible'] = setovertime_eligiblee49e9,
        codeStates['hr_policies_group'] = hr_policies_groupa0e79,
        codeStates['sethr_policies_group'] = sethr_policies_groupa0e79,
        codeStates['hr_policies_groupa0e79'] = hr_policies_groupa0e79Props,
        codeStates['sethr_policies_groupa0e79'] = sethr_policies_groupa0e79Props,
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

  if (overtime_eligiblee49e9?.isHidden) {
    return <></>
  }
  return (
    <div 
      className=""
      style={{gridColumn: `7 / 13`,gridRow: `23 / 32`, gap:``, height: `100%`, overflow: 'auto'}} >
      <Switch
        className=""
        contentAlign={"left"}
        headerText="Overtime Eligible"
        headerPosition="top"
        disabled= {overtime_eligiblee49e9?.isDisabled ? true : false}
        checkedContent="Yes"                                                                                                                                             
        uncheckedContent="No"
        checked={compensation_benfits_groupa044d?.overtime_eligible || false} 
        onChange={handleChange}
      />
  </div>
  )
}

export default Switchovertime_eligible



