
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
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import * as v from 'valibot';


const TextAreadescription = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
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
  const [dynamicStateandType,setDynamicStateandType]=useState<any>({name:'description',type:"string"})
  const [allCode,setAllCode] = useState<string>("")
  const toast : Function = useInfoMsg()
  const routes : AppRouterInstance = useRouter()
  const [error, setError] = useState<string>('');
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  let schemaArray :string[] =[];
  schemaArray = [] ;
 /////////////
   //another screen
  const {info_group69a49, setinfo_group69a49}= useContext(TotalContext) as TotalContextProps;
  const {info_group69a49Props, setinfo_group69a49Props}= useContext(TotalContext) as TotalContextProps;
  const {groupc3f8e, setgroupc3f8e}= useContext(TotalContext) as TotalContextProps;
  const {groupc3f8eProps, setgroupc3f8eProps}= useContext(TotalContext) as TotalContextProps;
  const {info_ruled5454, setinfo_ruled5454}= useContext(TotalContext) as TotalContextProps;
  const {rule_code4a3a5, setrule_code4a3a5}= useContext(TotalContext) as TotalContextProps;
  const {rule_name3412c, setrule_name3412c}= useContext(TotalContext) as TotalContextProps;
  const {result_tier_drop86b67, setresult_tier_drop86b67}= useContext(TotalContext) as TotalContextProps;
  const {match_mode065c7, setmatch_mode065c7}= useContext(TotalContext) as TotalContextProps;
  const {descriptionf8851, setdescriptionf8851}= useContext(TotalContext) as TotalContextProps;
  const {rule_config_groupa38fa, setrule_config_groupa38fa}= useContext(TotalContext) as TotalContextProps;
  const {rule_config_groupa38faProps, setrule_config_groupa38faProps}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions618ef, setdynamicactions618ef}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions618efProps, setdynamicactions618efProps}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
    try{
      const orchestrationData:any = getControlOrchestrationData(
        controlData,
        "a0ec121e4fbf46068ce587c7647c3f8e",
        "7d55a0a9ff40486e82bb90bf242f8851"
      );
      if(Array.isArray(orchestrationData?.data?.schemaData?.at(0)?.schema)){
        let allSchemas:any[]=orchestrationData?.data?.schemaData?.at(0)?.schema||[]
        let type:any={name:'description',type:'text'}
        allSchemas.map((item:any)=>{
          if(item.name=='description')
          {
            type=item
  
          }
        })
        setDynamicStateandType(type)       
      }
      if(orchestrationData?.data?.schemaData?.at(0).schema.responses["200"].content["application/json"].schema.items.properties){
        let type:any={name:'description',type:'text'}
        type={
          name:'description',
          type: orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.description.type == 'string' ? 'text' : orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.description.type =='integer' ? 'number' : orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.description.type
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
  },[descriptionf8851?.refresh])
  
  useEffect(()=>{
    if (prevRefreshRef.current) {
      setgroupc3f8e((pre:any)=>({...pre,description:""}))
    }else 
      prevRefreshRef.current= true
  },[descriptionf8851?.refresh])

  const groupc3f8eRef = useRef<any>(groupc3f8e);
  useEffect(() => { groupc3f8eRef.current = groupc3f8e; }, [groupc3f8e]);
  useEffect(()=>{
      handleMapperValue();
    if(validateRefetch.init!=0)
      handleValidate();
    const handlerChange = (id:any) => {
      if (id === "7d55a0a9ff40486e82bb90bf242f8851") {
        handleChange({target:{value:groupc3f8eRef?.current?.description||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "7d55a0a9ff40486e82bb90bf242f8851") {
        handleBlur({target:{value:groupc3f8eRef?.current?.description||""}});
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
        codeStates['info_group'] = info_group69a49,
        codeStates['setinfo_group'] = setinfo_group69a49,
        codeStates['info_group69a49'] = info_group69a49Props,
        codeStates['setinfo_group69a49'] = setinfo_group69a49Props,
        codeStates['group'] = groupc3f8e,
        codeStates['setgroup'] = setgroupc3f8e,
        codeStates['groupc3f8e'] = groupc3f8eProps,
        codeStates['setgroupc3f8e'] = setgroupc3f8eProps,
        codeStates['info_rule'] = info_ruled5454,
        codeStates['setinfo_rule'] = setinfo_ruled5454,
        codeStates['rule_code'] = rule_code4a3a5,
        codeStates['setrule_code'] = setrule_code4a3a5,
        codeStates['rule_name'] = rule_name3412c,
        codeStates['setrule_name'] = setrule_name3412c,
        codeStates['result_tier_drop'] = result_tier_drop86b67,
        codeStates['setresult_tier_drop'] = setresult_tier_drop86b67,
        codeStates['match_mode'] = match_mode065c7,
        codeStates['setmatch_mode'] = setmatch_mode065c7,
        codeStates['description'] = descriptionf8851,
        codeStates['setdescription'] = setdescriptionf8851,
        codeStates['rule_config_group'] = rule_config_groupa38fa,
        codeStates['setrule_config_group'] = setrule_config_groupa38fa,
        codeStates['rule_config_groupa38fa'] = rule_config_groupa38faProps,
        codeStates['setrule_config_groupa38fa'] = setrule_config_groupa38faProps,
        codeStates['dynamicactions'] = dynamicactions618ef,
        codeStates['setdynamicactions'] = setdynamicactions618ef,
        codeStates['dynamicactions618ef'] = dynamicactions618efProps,
        codeStates['setdynamicactions618ef'] = setdynamicactions618efProps,
    codeExecution(code,codeStates)
    }
  }
  const handleChange = async(e: any) => {
    let validate:any;
    setError('');
    setValidate((pre:any)=>({...pre,addRiskRule_v1:{...pre?.addRiskRule_v1,description:undefined}}));
    if(dynamicStateandType.type=="number"){
    setgroupc3f8e((prev: any) => ({ ...prev, description: +e?.target?.value }));
    }
    else{
    setgroupc3f8e((prev: any) => ({ ...prev, description: e?.target?.value }));
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
  if (descriptionf8851?.isHidden) {
    return <></>
  }
return (
  <div 
  style={{gridColumn: `1 / 25`,gridRow: `37 / 51`, gap:``, height: `100%`}} >
    <TextArea
      require={isRequredData}
      className=""
      onFocus={handleFocus}
      onChange={handleChange}
      onBlur={handleBlur}
      disabled= {descriptionf8851?.isDisabled ? true : false}
      contentAlign={"left"}
      headerPosition='top'
      headerText="Description"
      pin = {'brick-brick'}
      value = { groupc3f8e?.description != null && typeof groupc3f8e?.description =='object' ? Object.keys(groupc3f8e?.description)?.length ?  JSON.stringify(groupc3f8e?.description,null ,2):"" : groupc3f8e?.description||""}
      errorMessage={error}
      validationState={validate?.addRiskRule_v1?.description ? "invalid" : undefined}
    />
  </div>
  )
}

export default TextAreadescription
