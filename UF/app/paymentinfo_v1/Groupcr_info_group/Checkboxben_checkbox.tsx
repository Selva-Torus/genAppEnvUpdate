

'use client'
import React, { useState,useContext,useEffect,useRef } from 'react';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies } from '@/app/components/cookieMgment';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { eventBus } from '@/app/eventBus';
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { Text } from '@/components/Text';
import { Checkbox } from '@/components/Checkbox';
import {Modal} from '@/components/Modal';
import { useHandleDfdRefresh } from '@/context/dfdRefreshContext';
import { eventDecisionTable } from '@/app/utils/evaluateDecisionTable';
import decodeToken from '@/app/components/decodeToken';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
import { useGlobal } from '@/context/GlobalContext'
import UOmapperData from '@/context/dfdmapperContolnames.json';


const Checkboxben_checkbox = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
  const { token } = useGlobal();
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const handleDfdRefresh = useHandleDfdRefresh();
  const decodedTokenObj:any = decodeToken(token);
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, string>>({name:'ben_checkbox',type:"text"});
  const toast:Function=useInfoMsg();
  const routes: AppRouterInstance = useRouter();
  let code:string='';
  const [allCode,setAllCode]=useState<any>("");
  //showComponentAsPopup || showArtifactAsModal
 /////////////
   //another screen
  const {payment_info_group1bac9, setpayment_info_group1bac9}= useContext(TotalContext) as TotalContextProps;  
  const {payment_info_group1bac9Props, setpayment_info_group1bac9Props}= useContext(TotalContext) as TotalContextProps;  
  const {midynamicactions3b39d, setmidynamicactions3b39d}= useContext(TotalContext) as TotalContextProps;  
  const {midynamicactions3b39dProps, setmidynamicactions3b39dProps}= useContext(TotalContext) as TotalContextProps;  
  const {general_info_groupc83e6, setgeneral_info_groupc83e6}= useContext(TotalContext) as TotalContextProps;  
  const {general_info_groupc83e6Props, setgeneral_info_groupc83e6Props}= useContext(TotalContext) as TotalContextProps;  
  const {dbtr_info_group4e8ea, setdbtr_info_group4e8ea}= useContext(TotalContext) as TotalContextProps;  
  const {dbtr_info_group4e8eaProps, setdbtr_info_group4e8eaProps}= useContext(TotalContext) as TotalContextProps;  
  const {cr_info_groupb01e8, setcr_info_groupb01e8}= useContext(TotalContext) as TotalContextProps;  
  const {cr_info_groupb01e8Props, setcr_info_groupb01e8Props}= useContext(TotalContext) as TotalContextProps;  
  const {creditor_info_label_text02833, setcreditor_info_label_text02833}= useContext(TotalContext) as TotalContextProps;  
  const {ben_checkbox780b4, setben_checkbox780b4}= useContext(TotalContext) as TotalContextProps;  
  const {cr_account3b649, setcr_account3b649}= useContext(TotalContext) as TotalContextProps;  
  const {cr_namee0835, setcr_namee0835}= useContext(TotalContext) as TotalContextProps;  
  const {cr_street_name21bab, setcr_street_name21bab}= useContext(TotalContext) as TotalContextProps;  
  const {cr_benif_action9998d, setcr_benif_action9998d}= useContext(TotalContext) as TotalContextProps;  
  const {cr_building_namea6ac7, setcr_building_namea6ac7}= useContext(TotalContext) as TotalContextProps;  
  const {cr_floor44bed, setcr_floor44bed}= useContext(TotalContext) as TotalContextProps;  
  const {cr_post_codef645b, setcr_post_codef645b}= useContext(TotalContext) as TotalContextProps;  
  const {cr_town_nameed852, setcr_town_nameed852}= useContext(TotalContext) as TotalContextProps;  
  const {cr_country38218, setcr_country38218}= useContext(TotalContext) as TotalContextProps;  
  const {cr_currencyb2ebe, setcr_currencyb2ebe}= useContext(TotalContext) as TotalContextProps;  
  const {exchange_rate86282, setexchange_rate86282}= useContext(TotalContext) as TotalContextProps;  
  const {cr_amountbd2bf, setcr_amountbd2bf}= useContext(TotalContext) as TotalContextProps;  
  const {cr_bank_code76d12, setcr_bank_code76d12}= useContext(TotalContext) as TotalContextProps;  
  const {cr_clr_code4387d, setcr_clr_code4387d}= useContext(TotalContext) as TotalContextProps;  
  const {chrg_info_group76ab0, setchrg_info_group76ab0}= useContext(TotalContext) as TotalContextProps;  
  const {chrg_info_group76ab0Props, setchrg_info_group76ab0Props}= useContext(TotalContext) as TotalContextProps;  
  const {add_info_groupe8dc6, setadd_info_groupe8dc6}= useContext(TotalContext) as TotalContextProps;  
  const {add_info_groupe8dc6Props, setadd_info_groupe8dc6Props}= useContext(TotalContext) as TotalContextProps;  
  //////////////

  const handleMapperValue=async()=>{
    try{
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "18502770a2a84feb968a3817c35b01e8",
        "21fc506abab74d4b8f52c349f2a780b4"
      );
      if(orchestrationData?.data?.code)
      {
        setAllCode(orchestrationData?.data?.code);
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[ben_checkbox780b4?.refresh])

  useEffect(()=>{
    if (cr_info_groupb01e8?.ben_checkbox === undefined) {
      setcr_info_groupb01e8((prev: any) => ({ ...prev, ben_checkbox: false }));
    }
  },[])


  const handleChange=async(checked:boolean)=>{
    try{
    setIsProcessing(true);
    setcr_info_groupb01e8((prev: any) => ({ ...prev, ben_checkbox: checked }));
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
  
  const handleBlur=async(e:any)=>{
    try{
    setIsProcessing(true);
    code = allCode;
    if (code != '') {
      let codeStates: any = {};
            codeStates['payment_info_group']  = payment_info_group1bac9;
            codeStates['setpayment_info_group'] = setpayment_info_group1bac9;
            codeStates['midynamicactions']  = midynamicactions3b39d;
            codeStates['setmidynamicactions'] = setmidynamicactions3b39d;
            codeStates['general_info_group']  = general_info_groupc83e6;
            codeStates['setgeneral_info_group'] = setgeneral_info_groupc83e6;
            codeStates['dbtr_info_group']  = dbtr_info_group4e8ea;
            codeStates['setdbtr_info_group'] = setdbtr_info_group4e8ea;
            codeStates['cr_info_group']  = cr_info_groupb01e8;
            codeStates['setcr_info_group'] = setcr_info_groupb01e8;
            codeStates['chrg_info_group']  = chrg_info_group76ab0;
            codeStates['setchrg_info_group'] = setchrg_info_group76ab0;
            codeStates['add_info_group']  = add_info_groupe8dc6;
            codeStates['setadd_info_group'] = setadd_info_groupe8dc6;
    codeExecution(code,codeStates);
    }
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

  if (ben_checkbox780b4?.isHidden) {
    return <></>;
  }
  return (
    <div 
       style={{gridColumn: `20 / 25`,gridRow: `1 / 5`, gap:``, height: `100%`, overflow: 'auto'}} >
    <Checkbox 
      className="!font-bold"
      contentAlign={"left"}
      value={cr_info_groupb01e8?.ben_checkbox ?? false}
      checked={cr_info_groupb01e8?.ben_checkbox ?? false}
      disabled= {ben_checkbox780b4?.isDisabled ? true : false}
      content = {'Add Beneficiary'}
      onChange={handleChange}
      onBlur={handleBlur}
    />
    </div>
  )
}

export default Checkboxben_checkbox;
