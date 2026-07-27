
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

const Switchis_open = ({checkToAdd,setCheckToAdd,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
  const token:string = getCookie('token');
  const decodedTokenObj: any = decodeToken(token);
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const handleDfdRefresh = useHandleDfdRefresh();
  const {dfd_jobpositions_v1Props, setdfd_jobpositions_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const {overall_group2c693, setoverall_group2c693}= useContext(TotalContext) as TotalContextProps;
  const {overall_group2c693Props, setoverall_group2c693Props}= useContext(TotalContext) as TotalContextProps;
  const {position_information_group67802, setposition_information_group67802}= useContext(TotalContext) as TotalContextProps;
  const {position_information_group67802Props, setposition_information_group67802Props}= useContext(TotalContext) as TotalContextProps;
  const {compensation_benfits_group0d8fe, setcompensation_benfits_group0d8fe}= useContext(TotalContext) as TotalContextProps;
  const {compensation_benfits_group0d8feProps, setcompensation_benfits_group0d8feProps}= useContext(TotalContext) as TotalContextProps;
  const {staffing_compensation_text16f4a, setstaffing_compensation_text16f4a}= useContext(TotalContext) as TotalContextProps;
  const {salary_range_min31c0f, setsalary_range_min31c0f}= useContext(TotalContext) as TotalContextProps;
  const {salary_range_maxb8794, setsalary_range_maxb8794}= useContext(TotalContext) as TotalContextProps;
  const {headcount4c5a4, setheadcount4c5a4}= useContext(TotalContext) as TotalContextProps;
  const {approved_headcount53c3b, setapproved_headcount53c3b}= useContext(TotalContext) as TotalContextProps;
  const {filled_headcount35c2c, setfilled_headcount35c2c}= useContext(TotalContext) as TotalContextProps;
  const {vacancy_status83fc0, setvacancy_status83fc0}= useContext(TotalContext) as TotalContextProps;
  const {remote_alloweda2944, setremote_alloweda2944}= useContext(TotalContext) as TotalContextProps;
  const {travel_requiredee204, settravel_requiredee204}= useContext(TotalContext) as TotalContextProps;
  const {is_open9bbae, setis_open9bbae}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  const handleMapperValue=async()=>{
    try{
    const orchestrationData = getControlOrchestrationData(  
      controlData,
      "2a5944178febfa18e4be375d2920d8fe",
      "cb7c68d5b3024ed78d0a6560ea99bbae"
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
      setcompensation_benfits_group0d8fe((pre:any)=>({...pre,is_open:null}))
    else
      prevRefreshRef.current=true
    handleMapperValue()
  },[is_open9bbae?.refresh])

  useEffect(() => {
    if(Array.isArray(dfd_jobpositions_v1Props) && dfd_jobpositions_v1Props?.length == 1){
      setcompensation_benfits_group0d8fe((pre:any)=>({...pre,is_open:dfd_jobpositions_v1Props[0]?.is_open}))
    }
  },[dfd_jobpositions_v1Props])
  const handleChange = async (checked: boolean,comingRule:any={}) => {
    try{
    setIsProcessing(true);
    setcompensation_benfits_group0d8fe((prev: any) => ({ ...prev, is_open: checked }));
    let code:string= allCode;
    if (code != '') {
      let codeStates: any = {};
        codeStates['overall_group'] = overall_group2c693,
        codeStates['setoverall_group'] = setoverall_group2c693,
        codeStates['overall_group2c693'] = overall_group2c693Props,
        codeStates['setoverall_group2c693'] = setoverall_group2c693Props,
        codeStates['position_information_group'] = position_information_group67802,
        codeStates['setposition_information_group'] = setposition_information_group67802,
        codeStates['position_information_group67802'] = position_information_group67802Props,
        codeStates['setposition_information_group67802'] = setposition_information_group67802Props,
        codeStates['compensation_benfits_group'] = compensation_benfits_group0d8fe,
        codeStates['setcompensation_benfits_group'] = setcompensation_benfits_group0d8fe,
        codeStates['compensation_benfits_group0d8fe'] = compensation_benfits_group0d8feProps,
        codeStates['setcompensation_benfits_group0d8fe'] = setcompensation_benfits_group0d8feProps,
        codeStates['staffing_compensation_text'] = staffing_compensation_text16f4a,
        codeStates['setstaffing_compensation_text'] = setstaffing_compensation_text16f4a,
        codeStates['salary_range_min'] = salary_range_min31c0f,
        codeStates['setsalary_range_min'] = setsalary_range_min31c0f,
        codeStates['salary_range_max'] = salary_range_maxb8794,
        codeStates['setsalary_range_max'] = setsalary_range_maxb8794,
        codeStates['headcount'] = headcount4c5a4,
        codeStates['setheadcount'] = setheadcount4c5a4,
        codeStates['approved_headcount'] = approved_headcount53c3b,
        codeStates['setapproved_headcount'] = setapproved_headcount53c3b,
        codeStates['filled_headcount'] = filled_headcount35c2c,
        codeStates['setfilled_headcount'] = setfilled_headcount35c2c,
        codeStates['vacancy_status'] = vacancy_status83fc0,
        codeStates['setvacancy_status'] = setvacancy_status83fc0,
        codeStates['remote_allowed'] = remote_alloweda2944,
        codeStates['setremote_allowed'] = setremote_alloweda2944,
        codeStates['travel_required'] = travel_requiredee204,
        codeStates['settravel_required'] = settravel_requiredee204,
        codeStates['is_open'] = is_open9bbae,
        codeStates['setis_open'] = setis_open9bbae,
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

  if (is_open9bbae?.isHidden) {
    return <></>
  }
  return (
    <div 
      className=""
      style={{gridColumn: `21 / 25`,gridRow: `24 / 33`, gap:``, height: `100%`, overflow: 'auto'}} >
      <Switch
        className=""
        contentAlign={"left"}
        headerText="Is Open"
        headerPosition="top"
        disabled= {is_open9bbae?.isDisabled ? true : false}
        checkedContent="Yes"                                                                                                                                             
        uncheckedContent="No"
        checked={compensation_benfits_group0d8fe?.is_open || false} 
        onChange={handleChange}
      />
  </div>
  )
}

export default Switchis_open



