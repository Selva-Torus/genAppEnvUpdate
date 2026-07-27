
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

const Switchpromotion_eligible = ({checkToAdd,setCheckToAdd,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
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
  const {overall_groupfc238, setoverall_groupfc238}= useContext(TotalContext) as TotalContextProps;
  const {overall_groupfc238Props, setoverall_groupfc238Props}= useContext(TotalContext) as TotalContextProps;
  const {grade_information_groupddd50, setgrade_information_groupddd50}= useContext(TotalContext) as TotalContextProps;
  const {grade_information_groupddd50Props, setgrade_information_groupddd50Props}= useContext(TotalContext) as TotalContextProps;
  const {compensation_benfits_group49b64, setcompensation_benfits_group49b64}= useContext(TotalContext) as TotalContextProps;
  const {compensation_benfits_group49b64Props, setcompensation_benfits_group49b64Props}= useContext(TotalContext) as TotalContextProps;
  const {category_configuration_text97eea, setcategory_configuration_text97eea}= useContext(TotalContext) as TotalContextProps;
  const {min_salary807a5, setmin_salary807a5}= useContext(TotalContext) as TotalContextProps;
  const {max_salarye78c6, setmax_salarye78c6}= useContext(TotalContext) as TotalContextProps;
  const {currencyb8f2e, setcurrencyb8f2e}= useContext(TotalContext) as TotalContextProps;
  const {bonus_percentageae1ae, setbonus_percentageae1ae}= useContext(TotalContext) as TotalContextProps;
  const {promotion_eligible4c314, setpromotion_eligible4c314}= useContext(TotalContext) as TotalContextProps;
  const {overtime_eligible66e37, setovertime_eligible66e37}= useContext(TotalContext) as TotalContextProps;
  const {hr_policies_group0f880, sethr_policies_group0f880}= useContext(TotalContext) as TotalContextProps;
  const {hr_policies_group0f880Props, sethr_policies_group0f880Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions7e8c7, setdynamicactions7e8c7}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions7e8c7Props, setdynamicactions7e8c7Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  const handleMapperValue=async()=>{
    try{
    const orchestrationData = getControlOrchestrationData(  
      controlData,
      "d1c13cefdc89a0d6a6ad217393049b64",
      "62abd0c1f9d30e11bf3ebafab184c314"
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
      setcompensation_benfits_group49b64((pre:any)=>({...pre,promotion_eligible:null}))
    else
      prevRefreshRef.current=true
    handleMapperValue()
  },[promotion_eligible4c314?.refresh])

  useEffect(() => {
    if(Array.isArray(dfd_jobgrade_v1Props) && dfd_jobgrade_v1Props?.length == 1){
      setcompensation_benfits_group49b64((pre:any)=>({...pre,promotion_eligible:dfd_jobgrade_v1Props[0]?.promotion_eligible}))
    }
  },[dfd_jobgrade_v1Props])
  const handleChange = async (checked: boolean,comingRule:any={}) => {
    try{
    setIsProcessing(true);
    setcompensation_benfits_group49b64((prev: any) => ({ ...prev, promotion_eligible: checked }));
    let code:string= allCode;
    if (code != '') {
      let codeStates: any = {};
        codeStates['overall_group'] = overall_groupfc238,
        codeStates['setoverall_group'] = setoverall_groupfc238,
        codeStates['overall_groupfc238'] = overall_groupfc238Props,
        codeStates['setoverall_groupfc238'] = setoverall_groupfc238Props,
        codeStates['grade_information_group'] = grade_information_groupddd50,
        codeStates['setgrade_information_group'] = setgrade_information_groupddd50,
        codeStates['grade_information_groupddd50'] = grade_information_groupddd50Props,
        codeStates['setgrade_information_groupddd50'] = setgrade_information_groupddd50Props,
        codeStates['compensation_benfits_group'] = compensation_benfits_group49b64,
        codeStates['setcompensation_benfits_group'] = setcompensation_benfits_group49b64,
        codeStates['compensation_benfits_group49b64'] = compensation_benfits_group49b64Props,
        codeStates['setcompensation_benfits_group49b64'] = setcompensation_benfits_group49b64Props,
        codeStates['category_configuration_text'] = category_configuration_text97eea,
        codeStates['setcategory_configuration_text'] = setcategory_configuration_text97eea,
        codeStates['min_salary'] = min_salary807a5,
        codeStates['setmin_salary'] = setmin_salary807a5,
        codeStates['max_salary'] = max_salarye78c6,
        codeStates['setmax_salary'] = setmax_salarye78c6,
        codeStates['currency'] = currencyb8f2e,
        codeStates['setcurrency'] = setcurrencyb8f2e,
        codeStates['bonus_percentage'] = bonus_percentageae1ae,
        codeStates['setbonus_percentage'] = setbonus_percentageae1ae,
        codeStates['promotion_eligible'] = promotion_eligible4c314,
        codeStates['setpromotion_eligible'] = setpromotion_eligible4c314,
        codeStates['overtime_eligible'] = overtime_eligible66e37,
        codeStates['setovertime_eligible'] = setovertime_eligible66e37,
        codeStates['hr_policies_group'] = hr_policies_group0f880,
        codeStates['sethr_policies_group'] = sethr_policies_group0f880,
        codeStates['hr_policies_group0f880'] = hr_policies_group0f880Props,
        codeStates['sethr_policies_group0f880'] = sethr_policies_group0f880Props,
        codeStates['dynamicactions'] = dynamicactions7e8c7,
        codeStates['setdynamicactions'] = setdynamicactions7e8c7,
        codeStates['dynamicactions7e8c7'] = dynamicactions7e8c7Props,
        codeStates['setdynamicactions7e8c7'] = setdynamicactions7e8c7Props,
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

  if (promotion_eligible4c314?.isHidden) {
    return <></>
  }
  return (
    <div 
      className=""
      style={{gridColumn: `1 / 7`,gridRow: `23 / 32`, gap:``, height: `100%`, overflow: 'auto'}} >
      <Switch
        className=""
        contentAlign={"left"}
        headerText="Promotion Eligible"
        headerPosition="top"
        disabled= {promotion_eligible4c314?.isDisabled ? true : false}
        checkedContent="Yes"                                                                                                                                             
        uncheckedContent="No"
        checked={compensation_benfits_group49b64?.promotion_eligible || false} 
        onChange={handleChange}
      />
  </div>
  )
}

export default Switchpromotion_eligible



