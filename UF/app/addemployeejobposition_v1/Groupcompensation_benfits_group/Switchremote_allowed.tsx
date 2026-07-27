
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

const Switchremote_allowed = ({checkToAdd,setCheckToAdd,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
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
  const {overall_groupae38a, setoverall_groupae38a}= useContext(TotalContext) as TotalContextProps;
  const {overall_groupae38aProps, setoverall_groupae38aProps}= useContext(TotalContext) as TotalContextProps;
  const {position_information_group5335b, setposition_information_group5335b}= useContext(TotalContext) as TotalContextProps;
  const {position_information_group5335bProps, setposition_information_group5335bProps}= useContext(TotalContext) as TotalContextProps;
  const {compensation_benfits_groupb46e6, setcompensation_benfits_groupb46e6}= useContext(TotalContext) as TotalContextProps;
  const {compensation_benfits_groupb46e6Props, setcompensation_benfits_groupb46e6Props}= useContext(TotalContext) as TotalContextProps;
  const {staffing_compensation_text8d8fc, setstaffing_compensation_text8d8fc}= useContext(TotalContext) as TotalContextProps;
  const {salary_range_min6aa6e, setsalary_range_min6aa6e}= useContext(TotalContext) as TotalContextProps;
  const {salary_range_maxebe1d, setsalary_range_maxebe1d}= useContext(TotalContext) as TotalContextProps;
  const {headcount5aefa, setheadcount5aefa}= useContext(TotalContext) as TotalContextProps;
  const {approved_headcount42f81, setapproved_headcount42f81}= useContext(TotalContext) as TotalContextProps;
  const {filled_headcount049fc, setfilled_headcount049fc}= useContext(TotalContext) as TotalContextProps;
  const {vacancy_status989f7, setvacancy_status989f7}= useContext(TotalContext) as TotalContextProps;
  const {remote_allowed76541, setremote_allowed76541}= useContext(TotalContext) as TotalContextProps;
  const {travel_requiredfe60a, settravel_requiredfe60a}= useContext(TotalContext) as TotalContextProps;
  const {is_open18094, setis_open18094}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions76c44, setdynamicactions76c44}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions76c44Props, setdynamicactions76c44Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  const handleMapperValue=async()=>{
    try{
    const orchestrationData = getControlOrchestrationData(  
      controlData,
      "f1469b256669687453aa33ae83eb46e6",
      "761331d426184880b44e3f8a77276541"
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
      setcompensation_benfits_groupb46e6((pre:any)=>({...pre,remote_allowed:null}))
    else
      prevRefreshRef.current=true
    handleMapperValue()
  },[remote_allowed76541?.refresh])

  useEffect(() => {
    if(Array.isArray(dfd_jobpositions_v1Props) && dfd_jobpositions_v1Props?.length == 1){
      setcompensation_benfits_groupb46e6((pre:any)=>({...pre,remote_allowed:dfd_jobpositions_v1Props[0]?.remote_allowed}))
    }
  },[dfd_jobpositions_v1Props])
  const handleChange = async (checked: boolean,comingRule:any={}) => {
    try{
    setIsProcessing(true);
    setcompensation_benfits_groupb46e6((prev: any) => ({ ...prev, remote_allowed: checked }));
    let code:string= allCode;
    if (code != '') {
      let codeStates: any = {};
        codeStates['overall_group'] = overall_groupae38a,
        codeStates['setoverall_group'] = setoverall_groupae38a,
        codeStates['overall_groupae38a'] = overall_groupae38aProps,
        codeStates['setoverall_groupae38a'] = setoverall_groupae38aProps,
        codeStates['position_information_group'] = position_information_group5335b,
        codeStates['setposition_information_group'] = setposition_information_group5335b,
        codeStates['position_information_group5335b'] = position_information_group5335bProps,
        codeStates['setposition_information_group5335b'] = setposition_information_group5335bProps,
        codeStates['compensation_benfits_group'] = compensation_benfits_groupb46e6,
        codeStates['setcompensation_benfits_group'] = setcompensation_benfits_groupb46e6,
        codeStates['compensation_benfits_groupb46e6'] = compensation_benfits_groupb46e6Props,
        codeStates['setcompensation_benfits_groupb46e6'] = setcompensation_benfits_groupb46e6Props,
        codeStates['staffing_compensation_text'] = staffing_compensation_text8d8fc,
        codeStates['setstaffing_compensation_text'] = setstaffing_compensation_text8d8fc,
        codeStates['salary_range_min'] = salary_range_min6aa6e,
        codeStates['setsalary_range_min'] = setsalary_range_min6aa6e,
        codeStates['salary_range_max'] = salary_range_maxebe1d,
        codeStates['setsalary_range_max'] = setsalary_range_maxebe1d,
        codeStates['headcount'] = headcount5aefa,
        codeStates['setheadcount'] = setheadcount5aefa,
        codeStates['approved_headcount'] = approved_headcount42f81,
        codeStates['setapproved_headcount'] = setapproved_headcount42f81,
        codeStates['filled_headcount'] = filled_headcount049fc,
        codeStates['setfilled_headcount'] = setfilled_headcount049fc,
        codeStates['vacancy_status'] = vacancy_status989f7,
        codeStates['setvacancy_status'] = setvacancy_status989f7,
        codeStates['remote_allowed'] = remote_allowed76541,
        codeStates['setremote_allowed'] = setremote_allowed76541,
        codeStates['travel_required'] = travel_requiredfe60a,
        codeStates['settravel_required'] = settravel_requiredfe60a,
        codeStates['is_open'] = is_open18094,
        codeStates['setis_open'] = setis_open18094,
        codeStates['dynamicactions'] = dynamicactions76c44,
        codeStates['setdynamicactions'] = setdynamicactions76c44,
        codeStates['dynamicactions76c44'] = dynamicactions76c44Props,
        codeStates['setdynamicactions76c44'] = setdynamicactions76c44Props,
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

  if (remote_allowed76541?.isHidden) {
    return <></>
  }
  return (
    <div 
      className=""
      style={{gridColumn: `13 / 17`,gridRow: `24 / 33`, gap:``, height: `100%`, overflow: 'auto'}} >
      <Switch
        className=""
        contentAlign={"left"}
        headerText="Remote Allowed"
        headerPosition="top"
        disabled= {remote_allowed76541?.isDisabled ? true : false}
        checkedContent="Yes"                                                                                                                                             
        uncheckedContent="No"
        checked={compensation_benfits_groupb46e6?.remote_allowed || false} 
        onChange={handleChange}
      />
  </div>
  )
}

export default Switchremote_allowed



