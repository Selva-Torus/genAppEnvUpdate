
'use client'
import React, { useState,useContext,useEffect, useRef } from 'react';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { Modal } from "@/components/Modal";
import { Text } from "@/components/Text";
import { TextArea } from '@/components/TextArea';
import { codeExecution } from '@/app/utils/codeExecution';
import { AxiosService } from '@/app/components/axiosService';
import { useGlobal } from '@/context/GlobalContext'
import decodeToken from '@/app/components/decodeToken';
import { eventDecisionTable } from '@/app/utils/evaluateDecisionTable';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { eventBus } from '@/app/eventBus';
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
import { useHandleDfdRefresh } from '@/context/dfdRefreshContext';
import UOmapperData from '@/context/dfdmapperContolnames.json';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import * as v from 'valibot';


const TextAreareason = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
  const { token } = useGlobal();
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {validateRefetch , setValidateRefetch} = useContext(TotalContext) as TotalContextProps;
  const {validate , setValidate} = useContext(TotalContext) as TotalContextProps;
  const handleDfdRefresh = useHandleDfdRefresh();
  const decodedTokenObj:any = decodeToken(token);
  let code:string="";
  const prevRefreshRef = useRef<any>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method
  const [dynamicStateandType,setDynamicStateandType]=useState<any>({name:'reason',type:"string"})
  const [allCode,setAllCode] = useState<string>("")
  const toast : Function = useInfoMsg()
  const routes : AppRouterInstance = useRouter()
  const [error, setError] = useState<string>('');
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  let schemaArray :string[] =[];
  schemaArray = [] ;
 /////////////
   //another screen
  const {overall_groupe35bf, setoverall_groupe35bf}= useContext(TotalContext) as TotalContextProps;
  const {overall_groupe35bfProps, setoverall_groupe35bfProps}= useContext(TotalContext) as TotalContextProps;
  const {action_details_group2c58f, setaction_details_group2c58f}= useContext(TotalContext) as TotalContextProps;
  const {action_details_group2c58fProps, setaction_details_group2c58fProps}= useContext(TotalContext) as TotalContextProps;
  const {action_detail_group4f66c, setaction_detail_group4f66c}= useContext(TotalContext) as TotalContextProps;
  const {action_detail_group4f66cProps, setaction_detail_group4f66cProps}= useContext(TotalContext) as TotalContextProps;
  const {asset_identity_text0a7d2, setasset_identity_text0a7d2}= useContext(TotalContext) as TotalContextProps;
  const {asset_name78a73, setasset_name78a73}= useContext(TotalContext) as TotalContextProps;
  const {scopeaf270, setscopeaf270}= useContext(TotalContext) as TotalContextProps;
  const {trigger_type5c6b5, settrigger_type5c6b5}= useContext(TotalContext) as TotalContextProps;
  const {trigger_refd1e0b, settrigger_refd1e0b}= useContext(TotalContext) as TotalContextProps;
  const {reasonde403, setreasonde403}= useContext(TotalContext) as TotalContextProps;
  const {risk_conf_groupd5f40, setrisk_conf_groupd5f40}= useContext(TotalContext) as TotalContextProps;
  const {risk_conf_groupd5f40Props, setrisk_conf_groupd5f40Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions512d9, setdynamicactions512d9}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions512d9Props, setdynamicactions512d9Props}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
    try{
      const orchestrationData:any = getControlOrchestrationData(
        controlData,
        "50d91bc4a7f9ef6a5bf79c1785f4f66c",
        "9e347727b0f94a12b1e5c91d9b6de403"
      );
      if(Array.isArray(orchestrationData?.data?.schemaData?.at(0)?.schema)){
        let allSchemas:any[]=orchestrationData?.data?.schemaData?.at(0)?.schema||[]
        let type:any={name:'reason',type:'text'}
        allSchemas.map((item:any)=>{
          if(item.name=='reason')
          {
            type=item
  
          }
        })
        setDynamicStateandType(type)       
      }
      if(orchestrationData?.data?.schemaData?.at(0).schema.responses["200"].content["application/json"].schema.items.properties){
        let type:any={name:'reason',type:'text'}
        type={
          name:'reason',
          type: orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.reason.type == 'string' ? 'text' : orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.reason.type =='integer' ? 'number' : orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.reason.type
        }
        setDynamicStateandType(type)
       
      }
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
  },[reasonde403?.refresh])
  
  useEffect(()=>{
    if (prevRefreshRef.current) {
      setaction_detail_group4f66c((pre:any)=>({...pre,reason:""}))
    }else 
      prevRefreshRef.current= true
  },[reasonde403?.refresh])

  const action_detail_group4f66cRef = useRef<any>(action_detail_group4f66c);
  useEffect(() => { action_detail_group4f66cRef.current = action_detail_group4f66c; }, [action_detail_group4f66c]);
  useEffect(()=>{
      handleMapperValue();
    if(validateRefetch.init!=0)
      handleValidate();
    const handlerChange = (id:any) => {
      if (id === "9e347727b0f94a12b1e5c91d9b6de403") {
        handleChange({target:{value:action_detail_group4f66cRef?.current?.reason||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "9e347727b0f94a12b1e5c91d9b6de403") {
        handleBlur({target:{value:action_detail_group4f66cRef?.current?.reason||""}});
      }
    };
    eventBus.on("triggerTextAreaChange", handlerChange);
    eventBus.on("triggerTextAreaBlur", handlerBlur);
    return () => {
      eventBus.off("triggerTextAreaChange", handlerChange);
      eventBus.off("triggerTextAreaBlur", handlerBlur);
    };
  },[validateRefetch.value])


  const handleBlur=async(e:any)=>{
    let validate:any
    code = allCode;
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
        codeStates['asset_identity_text'] = asset_identity_text0a7d2,
        codeStates['setasset_identity_text'] = setasset_identity_text0a7d2,
        codeStates['asset_name'] = asset_name78a73,
        codeStates['setasset_name'] = setasset_name78a73,
        codeStates['scope'] = scopeaf270,
        codeStates['setscope'] = setscopeaf270,
        codeStates['trigger_type'] = trigger_type5c6b5,
        codeStates['settrigger_type'] = settrigger_type5c6b5,
        codeStates['trigger_ref'] = trigger_refd1e0b,
        codeStates['settrigger_ref'] = settrigger_refd1e0b,
        codeStates['reason'] = reasonde403,
        codeStates['setreason'] = setreasonde403,
        codeStates['risk_conf_group'] = risk_conf_groupd5f40,
        codeStates['setrisk_conf_group'] = setrisk_conf_groupd5f40,
        codeStates['risk_conf_groupd5f40'] = risk_conf_groupd5f40Props,
        codeStates['setrisk_conf_groupd5f40'] = setrisk_conf_groupd5f40Props,
        codeStates['dynamicactions'] = dynamicactions512d9,
        codeStates['setdynamicactions'] = setdynamicactions512d9,
        codeStates['dynamicactions512d9'] = dynamicactions512d9Props,
        codeStates['setdynamicactions512d9'] = setdynamicactions512d9Props,
    codeExecution(code,codeStates)
    }
  }
  const handleChange = async(e: any) => {
    let validate:any;
    setError('');
    setValidate((pre:any)=>({...pre,addKillSwitchAction_v1:{...pre?.addKillSwitchAction_v1,reason:undefined}}));
    if(dynamicStateandType.type=="number"){
    setaction_detail_group4f66c((prev: any) => ({ ...prev, reason: +e?.target?.value }));
    }
    else{
    setaction_detail_group4f66c((prev: any) => ({ ...prev, reason: e?.target?.value }));
    }
    try{
    }catch (err: any) {
    ///setIsProcessing(false);
    if(typeof err == 'string')
      toast(err, 'danger');
    else
      toast(err?.response?.data?.errorDetails?.message, 'danger');
  }finally{
    //setIsProcessing(false);
  }
  }

  const handleValidate=async (e?:any) => {
      let validate:any
  }
  const handleFocus=async(e:any)=>{
    try{
    setIsProcessing(true);
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
  if (reasonde403?.isHidden) {
    return <></>
  }
return (
  <div 
  style={{gridColumn: `1 / 25`,gridRow: `36 / 55`, gap:``, height: `100%`}} >
    <TextArea
      require={isRequredData}
      className=""
      onFocus={handleFocus}
      onChange={handleChange}
      onBlur={handleBlur}
      disabled= {reasonde403?.isDisabled ? true : false}
      placeholder = {'Enter the resason for this containment'}
      contentAlign={"left"}
      headerPosition='top'
      headerText="Reason"
      pin = {'brick-brick'}
      value = { action_detail_group4f66c?.reason != null && typeof action_detail_group4f66c?.reason =='object' ? Object.keys(action_detail_group4f66c?.reason)?.length ?  JSON.stringify(action_detail_group4f66c?.reason,null ,2):"" : action_detail_group4f66c?.reason||""}
      errorMessage={error}
      validationState={validate?.addKillSwitchAction_v1?.reason ? "invalid" : undefined}
    />
  </div>
  )
}

export default TextAreareason
