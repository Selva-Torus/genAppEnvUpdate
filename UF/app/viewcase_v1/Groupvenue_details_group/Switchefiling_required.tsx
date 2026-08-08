
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

const Switchefiling_required = ({checkToAdd,setCheckToAdd,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
  const token:string = getCookie('token');
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
  const {add_case_group1f6e4, setadd_case_group1f6e4}= useContext(TotalContext) as TotalContextProps;
  const {add_case_group1f6e4Props, setadd_case_group1f6e4Props}= useContext(TotalContext) as TotalContextProps;
  const {header_group3749a, setheader_group3749a}= useContext(TotalContext) as TotalContextProps;
  const {header_group3749aProps, setheader_group3749aProps}= useContext(TotalContext) as TotalContextProps;
  const {case_information_groupcec29, setcase_information_groupcec29}= useContext(TotalContext) as TotalContextProps;
  const {case_information_groupcec29Props, setcase_information_groupcec29Props}= useContext(TotalContext) as TotalContextProps;
  const {venue_groupa72d9, setvenue_groupa72d9}= useContext(TotalContext) as TotalContextProps;
  const {venue_groupa72d9Props, setvenue_groupa72d9Props}= useContext(TotalContext) as TotalContextProps;
  const {georgia_groupa636c, setgeorgia_groupa636c}= useContext(TotalContext) as TotalContextProps;
  const {georgia_groupa636cProps, setgeorgia_groupa636cProps}= useContext(TotalContext) as TotalContextProps;
  const {georgias_groupbac01, setgeorgias_groupbac01}= useContext(TotalContext) as TotalContextProps;
  const {georgias_groupbac01Props, setgeorgias_groupbac01Props}= useContext(TotalContext) as TotalContextProps;
  const {georgias_groupsbf356, setgeorgias_groupsbf356}= useContext(TotalContext) as TotalContextProps;
  const {georgias_groupsbf356Props, setgeorgias_groupsbf356Props}= useContext(TotalContext) as TotalContextProps;
  const {georgiass_groups9e4dd, setgeorgiass_groups9e4dd}= useContext(TotalContext) as TotalContextProps;
  const {georgiass_groups9e4ddProps, setgeorgiass_groups9e4ddProps}= useContext(TotalContext) as TotalContextProps;
  const {georgsiass_groups6bf7a, setgeorgsiass_groups6bf7a}= useContext(TotalContext) as TotalContextProps;
  const {georgsiass_groups6bf7aProps, setgeorgsiass_groups6bf7aProps}= useContext(TotalContext) as TotalContextProps;
  const {debtor_information_groupdfa55, setdebtor_information_groupdfa55}= useContext(TotalContext) as TotalContextProps;
  const {debtor_information_groupdfa55Props, setdebtor_information_groupdfa55Props}= useContext(TotalContext) as TotalContextProps;
  const {financial_details_grouped0d9, setfinancial_details_grouped0d9}= useContext(TotalContext) as TotalContextProps;
  const {financial_details_grouped0d9Props, setfinancial_details_grouped0d9Props}= useContext(TotalContext) as TotalContextProps;
  const {venue_details_group6a27a, setvenue_details_group6a27a}= useContext(TotalContext) as TotalContextProps;
  const {venue_details_group6a27aProps, setvenue_details_group6a27aProps}= useContext(TotalContext) as TotalContextProps;
  const {ven_name_text0c8ba, setven_name_text0c8ba}= useContext(TotalContext) as TotalContextProps;
  const {state3010e, setstate3010e}= useContext(TotalContext) as TotalContextProps;
  const {country1983b, setcountry1983b}= useContext(TotalContext) as TotalContextProps;
  const {court_name41a77, setcourt_name41a77}= useContext(TotalContext) as TotalContextProps;
  const {judge_name0a819, setjudge_name0a819}= useContext(TotalContext) as TotalContextProps;
  const {sol_expiry_dated5486, setsol_expiry_dated5486}= useContext(TotalContext) as TotalContextProps;
  const {filing_fee89c7f, setfiling_fee89c7f}= useContext(TotalContext) as TotalContextProps;
  const {service_method1b411, setservice_method1b411}= useContext(TotalContext) as TotalContextProps;
  const {efiling_system7d508, setefiling_system7d508}= useContext(TotalContext) as TotalContextProps;
  const {efiling_required36d60, setefiling_required36d60}= useContext(TotalContext) as TotalContextProps;
  const {required_dociument_main_group3eb5b, setrequired_dociument_main_group3eb5b}= useContext(TotalContext) as TotalContextProps;
  const {required_dociument_main_group3eb5bProps, setrequired_dociument_main_group3eb5bProps}= useContext(TotalContext) as TotalContextProps;
  const {doc_tablee79c7, setdoc_tablee79c7}= useContext(TotalContext) as TotalContextProps;
  const {doc_tablee79c7Props, setdoc_tablee79c7Props}= useContext(TotalContext) as TotalContextProps;
  const {checklist_main_group5b62e, setchecklist_main_group5b62e}= useContext(TotalContext) as TotalContextProps;
  const {checklist_main_group5b62eProps, setchecklist_main_group5b62eProps}= useContext(TotalContext) as TotalContextProps;
  const {checklist_table45abc, setchecklist_table45abc}= useContext(TotalContext) as TotalContextProps;
  const {checklist_table45abcProps, setchecklist_table45abcProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  const handleMapperValue=async()=>{
    try{
    const orchestrationData = getControlOrchestrationData(  
      controlData,
      "c047eba261894ed1a6f57f313eb6a27a",
      "7039bbac26a8092abc34c6b9f4a36d60"
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
      setvenue_details_group6a27a((pre:any)=>({...pre,efiling_required:null}))
    else
      prevRefreshRef.current=true
    handleMapperValue()
  },[efiling_required36d60?.refresh])

  const handleChange = async (checked: boolean,comingRule:any={}) => {
    try{
    setIsProcessing(true);
    setvenue_details_group6a27a((prev: any) => ({ ...prev, efiling_required: checked }));
    let code:string= allCode;
    if (code != '') {
      let codeStates: any = {};
        codeStates['add_case_group'] = add_case_group1f6e4,
        codeStates['setadd_case_group'] = setadd_case_group1f6e4,
        codeStates['add_case_group1f6e4'] = add_case_group1f6e4Props,
        codeStates['setadd_case_group1f6e4'] = setadd_case_group1f6e4Props,
        codeStates['header_group'] = header_group3749a,
        codeStates['setheader_group'] = setheader_group3749a,
        codeStates['header_group3749a'] = header_group3749aProps,
        codeStates['setheader_group3749a'] = setheader_group3749aProps,
        codeStates['case_information_group'] = case_information_groupcec29,
        codeStates['setcase_information_group'] = setcase_information_groupcec29,
        codeStates['case_information_groupcec29'] = case_information_groupcec29Props,
        codeStates['setcase_information_groupcec29'] = setcase_information_groupcec29Props,
        codeStates['venue_group'] = venue_groupa72d9,
        codeStates['setvenue_group'] = setvenue_groupa72d9,
        codeStates['venue_groupa72d9'] = venue_groupa72d9Props,
        codeStates['setvenue_groupa72d9'] = setvenue_groupa72d9Props,
        codeStates['georgia_group'] = georgia_groupa636c,
        codeStates['setgeorgia_group'] = setgeorgia_groupa636c,
        codeStates['georgia_groupa636c'] = georgia_groupa636cProps,
        codeStates['setgeorgia_groupa636c'] = setgeorgia_groupa636cProps,
        codeStates['georgias_group'] = georgias_groupbac01,
        codeStates['setgeorgias_group'] = setgeorgias_groupbac01,
        codeStates['georgias_groupbac01'] = georgias_groupbac01Props,
        codeStates['setgeorgias_groupbac01'] = setgeorgias_groupbac01Props,
        codeStates['georgias_groups'] = georgias_groupsbf356,
        codeStates['setgeorgias_groups'] = setgeorgias_groupsbf356,
        codeStates['georgias_groupsbf356'] = georgias_groupsbf356Props,
        codeStates['setgeorgias_groupsbf356'] = setgeorgias_groupsbf356Props,
        codeStates['georgiass_groups'] = georgiass_groups9e4dd,
        codeStates['setgeorgiass_groups'] = setgeorgiass_groups9e4dd,
        codeStates['georgiass_groups9e4dd'] = georgiass_groups9e4ddProps,
        codeStates['setgeorgiass_groups9e4dd'] = setgeorgiass_groups9e4ddProps,
        codeStates['georgsiass_groups'] = georgsiass_groups6bf7a,
        codeStates['setgeorgsiass_groups'] = setgeorgsiass_groups6bf7a,
        codeStates['georgsiass_groups6bf7a'] = georgsiass_groups6bf7aProps,
        codeStates['setgeorgsiass_groups6bf7a'] = setgeorgsiass_groups6bf7aProps,
        codeStates['debtor_information_group'] = debtor_information_groupdfa55,
        codeStates['setdebtor_information_group'] = setdebtor_information_groupdfa55,
        codeStates['debtor_information_groupdfa55'] = debtor_information_groupdfa55Props,
        codeStates['setdebtor_information_groupdfa55'] = setdebtor_information_groupdfa55Props,
        codeStates['financial_details_group'] = financial_details_grouped0d9,
        codeStates['setfinancial_details_group'] = setfinancial_details_grouped0d9,
        codeStates['financial_details_grouped0d9'] = financial_details_grouped0d9Props,
        codeStates['setfinancial_details_grouped0d9'] = setfinancial_details_grouped0d9Props,
        codeStates['venue_details_group'] = venue_details_group6a27a,
        codeStates['setvenue_details_group'] = setvenue_details_group6a27a,
        codeStates['venue_details_group6a27a'] = venue_details_group6a27aProps,
        codeStates['setvenue_details_group6a27a'] = setvenue_details_group6a27aProps,
        codeStates['ven_name_text'] = ven_name_text0c8ba,
        codeStates['setven_name_text'] = setven_name_text0c8ba,
        codeStates['state'] = state3010e,
        codeStates['setstate'] = setstate3010e,
        codeStates['country'] = country1983b,
        codeStates['setcountry'] = setcountry1983b,
        codeStates['court_name'] = court_name41a77,
        codeStates['setcourt_name'] = setcourt_name41a77,
        codeStates['judge_name'] = judge_name0a819,
        codeStates['setjudge_name'] = setjudge_name0a819,
        codeStates['sol_expiry_date'] = sol_expiry_dated5486,
        codeStates['setsol_expiry_date'] = setsol_expiry_dated5486,
        codeStates['filing_fee'] = filing_fee89c7f,
        codeStates['setfiling_fee'] = setfiling_fee89c7f,
        codeStates['service_method'] = service_method1b411,
        codeStates['setservice_method'] = setservice_method1b411,
        codeStates['efiling_system'] = efiling_system7d508,
        codeStates['setefiling_system'] = setefiling_system7d508,
        codeStates['efiling_required'] = efiling_required36d60,
        codeStates['setefiling_required'] = setefiling_required36d60,
        codeStates['required_dociument_main_group'] = required_dociument_main_group3eb5b,
        codeStates['setrequired_dociument_main_group'] = setrequired_dociument_main_group3eb5b,
        codeStates['required_dociument_main_group3eb5b'] = required_dociument_main_group3eb5bProps,
        codeStates['setrequired_dociument_main_group3eb5b'] = setrequired_dociument_main_group3eb5bProps,
        codeStates['doc_table'] = doc_tablee79c7,
        codeStates['setdoc_table'] = setdoc_tablee79c7,
        codeStates['doc_tablee79c7'] = doc_tablee79c7Props,
        codeStates['setdoc_tablee79c7'] = setdoc_tablee79c7Props,
        codeStates['checklist_main_group'] = checklist_main_group5b62e,
        codeStates['setchecklist_main_group'] = setchecklist_main_group5b62e,
        codeStates['checklist_main_group5b62e'] = checklist_main_group5b62eProps,
        codeStates['setchecklist_main_group5b62e'] = setchecklist_main_group5b62eProps,
        codeStates['checklist_table'] = checklist_table45abc,
        codeStates['setchecklist_table'] = setchecklist_table45abc,
        codeStates['checklist_table45abc'] = checklist_table45abcProps,
        codeStates['setchecklist_table45abc'] = setchecklist_table45abcProps,
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

  if (efiling_required36d60?.isHidden) {
    return <></>
  }
  return (
    <div 
      className=""
      style={{gridColumn: `1 / 9`,gridRow: `39 / 45`, gap:``, height: `100%`, overflow: 'auto'}} >
      <Switch
        className=""
        contentAlign={"center"}
        headerText="e-Filing Required"
        headerPosition="left"
        disabled= {efiling_required36d60?.isDisabled ? true : false}
        checked={venue_details_group6a27a?.efiling_required || false} 
        onChange={handleChange}
      />
  </div>
  )
}

export default Switchefiling_required



