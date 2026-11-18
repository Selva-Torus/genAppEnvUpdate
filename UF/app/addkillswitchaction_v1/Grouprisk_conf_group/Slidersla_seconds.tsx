'use client'
import React, { useState,useContext,useEffect,useRef } from 'react';
import { te_refreshDto } from "@/app/interfaces/interfaces";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { Slider } from "@/components/Slider";
import { Text } from "@/components/Text";
import { Button } from '@/components/Button';
import { Modal } from "@/components/Modal";
import i18n from '@/app/components/i18n';
import { useRouter } from 'next/navigation';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { codeExecution } from '@/app/utils/codeExecution';
import { AxiosService } from '@/app/components/axiosService';
import { useGlobal } from '@/context/GlobalContext'
import { eventBus } from '@/app/eventBus';
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { useHandleDfdRefresh } from '@/context/dfdRefreshContext';
import { eventDecisionTable } from '@/app/utils/evaluateDecisionTable';
import decodeToken from '@/app/components/decodeToken';
import UOmapperData from '@/context/dfdmapperContolnames.json';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';

    
const Slidersla_seconds = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
  const { token } = useGlobal();
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const handleDfdRefresh = useHandleDfdRefresh();
  const decodedTokenObj:any = decodeToken(token);
  let code:any="";
  const prevRefreshRef = useRef(false);
  const selected=useRef({});
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  const toast:any=useInfoMsg();
  const routes = useRouter();
  const [allCode,setAllCode]=useState<any>("");
  //showComponentAsPopup || showArtifactAsModal
 /////////////
   //another screen
  const {overall_groupe35bf, setoverall_groupe35bf}= useContext(TotalContext) as TotalContextProps;
  const {overall_groupe35bfProps, setoverall_groupe35bfProps}= useContext(TotalContext) as TotalContextProps;
  const {action_details_group2c58f, setaction_details_group2c58f}= useContext(TotalContext) as TotalContextProps;
  const {action_details_group2c58fProps, setaction_details_group2c58fProps}= useContext(TotalContext) as TotalContextProps;
  const {action_detail_group4f66c, setaction_detail_group4f66c}= useContext(TotalContext) as TotalContextProps;
  const {action_detail_group4f66cProps, setaction_detail_group4f66cProps}= useContext(TotalContext) as TotalContextProps;
  const {risk_conf_groupd5f40, setrisk_conf_groupd5f40}= useContext(TotalContext) as TotalContextProps;
  const {risk_conf_groupd5f40Props, setrisk_conf_groupd5f40Props}= useContext(TotalContext) as TotalContextProps;
  const {lifecycle_text51ebb, setlifecycle_text51ebb}= useContext(TotalContext) as TotalContextProps;
  const {action_no0eb05, setaction_no0eb05}= useContext(TotalContext) as TotalContextProps;
  const {sla_secondsefd7a, setsla_secondsefd7a}= useContext(TotalContext) as TotalContextProps;
  const {containment_status64350, setcontainment_status64350}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions512d9, setdynamicactions512d9}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions512d9Props, setdynamicactions512d9Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const keyset:any=i18n.keyset("language");

  const handleMapperValue=async()=>{
    try{
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "80422efadd4c83fee3640ece73ed5f40",
        "a54da022200e4874893d1c90d45efd7a"
      );
      if(orchestrationData?.data?.code)
      {
        setAllCode(orchestrationData?.data?.code)
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[sla_secondsefd7a?.refresh])

  useEffect(() => { 
    if (prevRefreshRef.current) {
    setrisk_conf_groupd5f40((pre:any)=>({...pre,sla_seconds:""}))
     } else {
      prevRefreshRef.current = true
    }
  },[sla_secondsefd7a?.refresh])
  

  const handleChange = async(newValue: number) => {
    try{
    setIsProcessing(true);
    selected.current = newValue;
    setrisk_conf_groupd5f40((prev: any) => ({ ...prev, sla_seconds: newValue}));
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
    code = allCode
     if (code != '') {
      let codeStates: any = {};
      codeStates['overall_group'] = overall_groupe35bf,
      codeStates['setoverall_group'] = setoverall_groupe35bf,
      codeStates['overall_groupe35bf'] = overall_groupe35bfProps,
      codeStates['setoverall_groupe35bf'] = setoverall_groupe35bfProps,
      codeStates['action_details_group'] = action_details_group2c58f,
      codeStates['setaction_details_group'] = setaction_details_group2c58f,
      codeStates['action_details_group2c58f'] = action_details_group2c58fProps,
      codeStates['setaction_details_group2c58f'] = setaction_details_group2c58fProps,
      codeStates['action_detail_group'] = action_detail_group4f66c,
      codeStates['setaction_detail_group'] = setaction_detail_group4f66c,
      codeStates['action_detail_group4f66c'] = action_detail_group4f66cProps,
      codeStates['setaction_detail_group4f66c'] = setaction_detail_group4f66cProps,
      codeStates['risk_conf_group'] = risk_conf_groupd5f40,
      codeStates['setrisk_conf_group'] = setrisk_conf_groupd5f40,
      codeStates['risk_conf_groupd5f40'] = risk_conf_groupd5f40Props,
      codeStates['setrisk_conf_groupd5f40'] = setrisk_conf_groupd5f40Props,
      codeStates['lifecycle_text'] = lifecycle_text51ebb,
      codeStates['setlifecycle_text'] = setlifecycle_text51ebb,
      codeStates['action_no'] = action_no0eb05,
      codeStates['setaction_no'] = setaction_no0eb05,
      codeStates['sla_seconds'] = sla_secondsefd7a,
      codeStates['setsla_seconds'] = setsla_secondsefd7a,
      codeStates['containment_status'] = containment_status64350,
      codeStates['setcontainment_status'] = setcontainment_status64350,
      codeStates['dynamicactions'] = dynamicactions512d9,
      codeStates['setdynamicactions'] = setdynamicactions512d9,
      codeStates['dynamicactions512d9'] = dynamicactions512d9Props,
      codeStates['setdynamicactions512d9'] = setdynamicactions512d9Props,
      codeStates['selected']  = selected
      codeExecution(code,codeStates);
    }
  }

  if (sla_secondsefd7a?.isHidden) {
    return <></>
  }
return (   
  <div 
    style={{gridColumn: `9 / 17`,gridRow: `9 / 22`, gap:``, height: `100%`, overflow: 'auto'}}>


    <Slider
      className=""
      onChange={handleChange}
      onBlur={handleBlur}
      value={typeof risk_conf_groupd5f40?.sla_seconds=='number' ? risk_conf_groupd5f40?.sla_seconds:0}
      min = {1}
      max = {60}
      disabled= {sla_secondsefd7a?.isDisabled ? true : false}
      validationState="valid"
      tooltipDisplay='off'
      headerPosition='top'
      headerText="SLA (Seconds)"
      showValue={false}
      valueLabel=""
      />
    </div>
        
  )
}

export default Slidersla_seconds
