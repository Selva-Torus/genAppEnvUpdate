
'use client'
import React, {useEffect, useContext,useState } from 'react' 
import { useGlobal } from '@/context/GlobalContext'
import { AxiosService } from "@/app/components/axiosService";
import { Progress } from '@/components/Progress';
import { Text } from '@/components/Text';
import { Modal } from "@/components/Modal";
import i18n from '@/app/components/i18n';
import { codeExecution } from '@/app/utils/codeExecution';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';

const Progressfinancial_crime_progress = ({encryptionFlagCompData, isDynamic, index, item,setIsProcessing,controlData}:any) => { 
  const { token } = useGlobal();
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  let customCode:any=""

  const keyset: any = i18n.keyset('language')
  const [allCode,setAllCode]=useState<any>("")
  let code:any='';
  /////////////
  //another screen
  const {overall_group0ca82, setoverall_group0ca82}= useContext(TotalContext) as TotalContextProps;  
  const {overall_group0ca82Props, setoverall_group0ca82Props}= useContext(TotalContext) as TotalContextProps;  
  const {register_ai_group08810, setregister_ai_group08810}= useContext(TotalContext) as TotalContextProps;  
  const {register_ai_group08810Props, setregister_ai_group08810Props}= useContext(TotalContext) as TotalContextProps;  
  const {tier_critical_group484c4, settier_critical_group484c4}= useContext(TotalContext) as TotalContextProps;  
  const {tier_critical_group484c4Props, settier_critical_group484c4Props}= useContext(TotalContext) as TotalContextProps;  
  const {cert_expired_groupf48db, setcert_expired_groupf48db}= useContext(TotalContext) as TotalContextProps;  
  const {cert_expired_groupf48dbProps, setcert_expired_groupf48dbProps}= useContext(TotalContext) as TotalContextProps;  
  const {named_owner_group4361e, setnamed_owner_group4361e}= useContext(TotalContext) as TotalContextProps;  
  const {named_owner_group4361eProps, setnamed_owner_group4361eProps}= useContext(TotalContext) as TotalContextProps;  
  const {cert_date_group9ac35, setcert_date_group9ac35}= useContext(TotalContext) as TotalContextProps;  
  const {cert_date_group9ac35Props, setcert_date_group9ac35Props}= useContext(TotalContext) as TotalContextProps;  
  const {governer_gap_group09585, setgoverner_gap_group09585}= useContext(TotalContext) as TotalContextProps;  
  const {governer_gap_group09585Props, setgoverner_gap_group09585Props}= useContext(TotalContext) as TotalContextProps;  
  const {table0a722, settable0a722}= useContext(TotalContext) as TotalContextProps;  
  const {table0a722Props, settable0a722Props}= useContext(TotalContext) as TotalContextProps;  
  const {pirchart_group8d70d, setpirchart_group8d70d}= useContext(TotalContext) as TotalContextProps;  
  const {pirchart_group8d70dProps, setpirchart_group8d70dProps}= useContext(TotalContext) as TotalContextProps;  
  const {assets_by_business_unit_group374c2, setassets_by_business_unit_group374c2}= useContext(TotalContext) as TotalContextProps;  
  const {assets_by_business_unit_group374c2Props, setassets_by_business_unit_group374c2Props}= useContext(TotalContext) as TotalContextProps;  
  const {assets_by_business_unit_text4d6de, setassets_by_business_unit_text4d6de}= useContext(TotalContext) as TotalContextProps;  
  const {consumer_lending_textefa99, setconsumer_lending_textefa99}= useContext(TotalContext) as TotalContextProps;  
  const {consumer_lending_progress2fc54, setconsumer_lending_progress2fc54}= useContext(TotalContext) as TotalContextProps;  
  const {group_functions_text8952f, setgroup_functions_text8952f}= useContext(TotalContext) as TotalContextProps;  
  const {group_functions_progress9da7f, setgroup_functions_progress9da7f}= useContext(TotalContext) as TotalContextProps;  
  const {operations_text8f8e9, setoperations_text8f8e9}= useContext(TotalContext) as TotalContextProps;  
  const {operations_progress41d7e, setoperations_progress41d7e}= useContext(TotalContext) as TotalContextProps;  
  const {financial_crime_textcfa1a, setfinancial_crime_textcfa1a}= useContext(TotalContext) as TotalContextProps;  
  const {financial_crime_progresse6070, setfinancial_crime_progresse6070}= useContext(TotalContext) as TotalContextProps;  
  const {cards_payments_text80d57, setcards_payments_text80d57}= useContext(TotalContext) as TotalContextProps;  
  const {cards_payments_progressc4402, setcards_payments_progressc4402}= useContext(TotalContext) as TotalContextProps;  
  const {technology_textb5146, settechnology_textb5146}= useContext(TotalContext) as TotalContextProps;  
  const {technology_progressc4269, settechnology_progressc4269}= useContext(TotalContext) as TotalContextProps;  
  //////////////

  const handleMapperValue=async()=>{
    try{
      const orchestrationData:any = getControlOrchestrationData(
        controlData,
        "1e7362a8a8ea46bda7a7e2dcb4b374c2",
        "c762f311168146899ddb9f33262e6070"
      );
      if(orchestrationData?.data?.code)
      {
        setAllCode(orchestrationData?.data?.code)
      }
    }catch(err){
      console.log(err)
    }
    let temp:any=""
    handleCustomCode()
  }


  const handleCustomCode=async () => {
    let customCode:any=''
    let code :any = allCode;
    if (code != '') {
      let codeStates: any = {};
        codeStates['overall_group'] = overall_group0ca82,
        codeStates['setoverall_group'] = setoverall_group0ca82,
        codeStates['overall_group0ca82'] = overall_group0ca82Props,
        codeStates['setoverall_group0ca82'] = setoverall_group0ca82Props,
        codeStates['register_ai_group'] = register_ai_group08810,
        codeStates['setregister_ai_group'] = setregister_ai_group08810,
        codeStates['register_ai_group08810'] = register_ai_group08810Props,
        codeStates['setregister_ai_group08810'] = setregister_ai_group08810Props,
        codeStates['tier_critical_group'] = tier_critical_group484c4,
        codeStates['settier_critical_group'] = settier_critical_group484c4,
        codeStates['tier_critical_group484c4'] = tier_critical_group484c4Props,
        codeStates['settier_critical_group484c4'] = settier_critical_group484c4Props,
        codeStates['cert_expired_group'] = cert_expired_groupf48db,
        codeStates['setcert_expired_group'] = setcert_expired_groupf48db,
        codeStates['cert_expired_groupf48db'] = cert_expired_groupf48dbProps,
        codeStates['setcert_expired_groupf48db'] = setcert_expired_groupf48dbProps,
        codeStates['named_owner_group'] = named_owner_group4361e,
        codeStates['setnamed_owner_group'] = setnamed_owner_group4361e,
        codeStates['named_owner_group4361e'] = named_owner_group4361eProps,
        codeStates['setnamed_owner_group4361e'] = setnamed_owner_group4361eProps,
        codeStates['cert_date_group'] = cert_date_group9ac35,
        codeStates['setcert_date_group'] = setcert_date_group9ac35,
        codeStates['cert_date_group9ac35'] = cert_date_group9ac35Props,
        codeStates['setcert_date_group9ac35'] = setcert_date_group9ac35Props,
        codeStates['governer_gap_group'] = governer_gap_group09585,
        codeStates['setgoverner_gap_group'] = setgoverner_gap_group09585,
        codeStates['governer_gap_group09585'] = governer_gap_group09585Props,
        codeStates['setgoverner_gap_group09585'] = setgoverner_gap_group09585Props,
        codeStates['table'] = table0a722,
        codeStates['settable'] = settable0a722,
        codeStates['table0a722'] = table0a722Props,
        codeStates['settable0a722'] = settable0a722Props,
        codeStates['pirchart_group'] = pirchart_group8d70d,
        codeStates['setpirchart_group'] = setpirchart_group8d70d,
        codeStates['pirchart_group8d70d'] = pirchart_group8d70dProps,
        codeStates['setpirchart_group8d70d'] = setpirchart_group8d70dProps,
        codeStates['assets_by_business_unit_group'] = assets_by_business_unit_group374c2,
        codeStates['setassets_by_business_unit_group'] = setassets_by_business_unit_group374c2,
        codeStates['assets_by_business_unit_group374c2'] = assets_by_business_unit_group374c2Props,
        codeStates['setassets_by_business_unit_group374c2'] = setassets_by_business_unit_group374c2Props,
        codeStates['assets_by_business_unit_text'] = assets_by_business_unit_text4d6de,
        codeStates['setassets_by_business_unit_text'] = setassets_by_business_unit_text4d6de,
        codeStates['consumer_lending_text'] = consumer_lending_textefa99,
        codeStates['setconsumer_lending_text'] = setconsumer_lending_textefa99,
        codeStates['consumer_lending_progress'] = consumer_lending_progress2fc54,
        codeStates['setconsumer_lending_progress'] = setconsumer_lending_progress2fc54,
        codeStates['group_functions_text'] = group_functions_text8952f,
        codeStates['setgroup_functions_text'] = setgroup_functions_text8952f,
        codeStates['group_functions_progress'] = group_functions_progress9da7f,
        codeStates['setgroup_functions_progress'] = setgroup_functions_progress9da7f,
        codeStates['operations_text'] = operations_text8f8e9,
        codeStates['setoperations_text'] = setoperations_text8f8e9,
        codeStates['operations_progress'] = operations_progress41d7e,
        codeStates['setoperations_progress'] = setoperations_progress41d7e,
        codeStates['financial_crime_text'] = financial_crime_textcfa1a,
        codeStates['setfinancial_crime_text'] = setfinancial_crime_textcfa1a,
        codeStates['financial_crime_progress'] = financial_crime_progresse6070,
        codeStates['setfinancial_crime_progress'] = setfinancial_crime_progresse6070,
        codeStates['cards_payments_text'] = cards_payments_text80d57,
        codeStates['setcards_payments_text'] = setcards_payments_text80d57,
        codeStates['cards_payments_progress'] = cards_payments_progressc4402,
        codeStates['setcards_payments_progress'] = setcards_payments_progressc4402,
        codeStates['technology_text'] = technology_textb5146,
        codeStates['settechnology_text'] = settechnology_textb5146,
        codeStates['technology_progress'] = technology_progressc4269,
        codeStates['settechnology_progress'] = settechnology_progressc4269,
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  useEffect(()=>{
    handleMapperValue()
  },[financial_crime_progresse6070?.refresh])

  if (financial_crime_progresse6070?.isHidden) {
    return <></>
  }

return (
  <div 
    style={{gridColumn: `9 / 25`,gridRow: `32 / 37`, gap:``, height: `100%`, overflow: 'auto'}} >
    <Progress 
      className=""
        theme = {'default'}
        value = {2}
    />
  </div>
  )
}

export default Progressfinancial_crime_progress
