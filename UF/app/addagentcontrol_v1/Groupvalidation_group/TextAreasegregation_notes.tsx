
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


const TextAreasegregation_notes = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
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
  const [dynamicStateandType,setDynamicStateandType]=useState<any>({name:'segregation_notes',type:"string"})
  const [allCode,setAllCode] = useState<string>("")
  const toast : Function = useInfoMsg()
  const routes : AppRouterInstance = useRouter()
  const [error, setError] = useState<string>('');
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  let schemaArray :string[] =[];
  schemaArray = [] ;
 /////////////
   //another screen
  const {overall_ai_asset_registryfa224, setoverall_ai_asset_registryfa224}= useContext(TotalContext) as TotalContextProps;
  const {overall_ai_asset_registryfa224Props, setoverall_ai_asset_registryfa224Props}= useContext(TotalContext) as TotalContextProps;
  const {register_ai_asset_group9d43f, setregister_ai_asset_group9d43f}= useContext(TotalContext) as TotalContextProps;
  const {register_ai_asset_group9d43fProps, setregister_ai_asset_group9d43fProps}= useContext(TotalContext) as TotalContextProps;
  const {model_info_group5b641, setmodel_info_group5b641}= useContext(TotalContext) as TotalContextProps;
  const {model_info_group5b641Props, setmodel_info_group5b641Props}= useContext(TotalContext) as TotalContextProps;
  const {grounding_groupb1b6f, setgrounding_groupb1b6f}= useContext(TotalContext) as TotalContextProps;
  const {grounding_groupb1b6fProps, setgrounding_groupb1b6fProps}= useContext(TotalContext) as TotalContextProps;
  const {validation_group4d206, setvalidation_group4d206}= useContext(TotalContext) as TotalContextProps;
  const {validation_group4d206Props, setvalidation_group4d206Props}= useContext(TotalContext) as TotalContextProps;
  const {security_text91cf6, setsecurity_text91cf6}= useContext(TotalContext) as TotalContextProps;
  const {kill_switch_state_code3ed20, setkill_switch_state_code3ed20}= useContext(TotalContext) as TotalContextProps;
  const {kill_switch_updated_by7a179, setkill_switch_updated_by7a179}= useContext(TotalContext) as TotalContextProps;
  const {kill_switch_updated_on0aadf, setkill_switch_updated_on0aadf}= useContext(TotalContext) as TotalContextProps;
  const {is_activee26e9, setis_activee26e9}= useContext(TotalContext) as TotalContextProps;
  const {segregation_notesd7da7, setsegregation_notesd7da7}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions78fa5, setdynamicactions78fa5}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions78fa5Props, setdynamicactions78fa5Props}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
    try{
      const orchestrationData:any = getControlOrchestrationData(
        controlData,
        "1c0817c1402d547509cb443bace4d206",
        "bbdbbdceb65a4cf28dd659d9e70d7da7"
      );
      if(Array.isArray(orchestrationData?.data?.schemaData?.at(0)?.schema)){
        let allSchemas:any[]=orchestrationData?.data?.schemaData?.at(0)?.schema||[]
        let type:any={name:'segregation_notes',type:'text'}
        allSchemas.map((item:any)=>{
          if(item.name=='segregation_notes')
          {
            type=item
  
          }
        })
        setDynamicStateandType(type)       
      }
      if(orchestrationData?.data?.schemaData?.at(0).schema.responses["200"].content["application/json"].schema.items.properties){
        let type:any={name:'segregation_notes',type:'text'}
        type={
          name:'segregation_notes',
          type: orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.segregation_notes.type == 'string' ? 'text' : orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.segregation_notes.type =='integer' ? 'number' : orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.segregation_notes.type
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
  },[segregation_notesd7da7?.refresh])
  
  useEffect(()=>{
    if (prevRefreshRef.current) {
      setvalidation_group4d206((pre:any)=>({...pre,segregation_notes:""}))
    }else 
      prevRefreshRef.current= true
  },[segregation_notesd7da7?.refresh])

  const validation_group4d206Ref = useRef<any>(validation_group4d206);
  useEffect(() => { validation_group4d206Ref.current = validation_group4d206; }, [validation_group4d206]);
  useEffect(()=>{
      handleMapperValue();
    if(validateRefetch.init!=0)
      handleValidate();
    const handlerChange = (id:any) => {
      if (id === "bbdbbdceb65a4cf28dd659d9e70d7da7") {
        handleChange({target:{value:validation_group4d206Ref?.current?.segregation_notes||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "bbdbbdceb65a4cf28dd659d9e70d7da7") {
        handleBlur({target:{value:validation_group4d206Ref?.current?.segregation_notes||""}});
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
        codeStates['overall_ai_asset_registry'] = overall_ai_asset_registryfa224,
        codeStates['setoverall_ai_asset_registry'] = setoverall_ai_asset_registryfa224,
        codeStates['overall_ai_asset_registryfa224'] = overall_ai_asset_registryfa224Props,
        codeStates['setoverall_ai_asset_registryfa224'] = setoverall_ai_asset_registryfa224Props,
        codeStates['register_ai_asset_group'] = register_ai_asset_group9d43f,
        codeStates['setregister_ai_asset_group'] = setregister_ai_asset_group9d43f,
        codeStates['register_ai_asset_group9d43f'] = register_ai_asset_group9d43fProps,
        codeStates['setregister_ai_asset_group9d43f'] = setregister_ai_asset_group9d43fProps,
        codeStates['model_info_group'] = model_info_group5b641,
        codeStates['setmodel_info_group'] = setmodel_info_group5b641,
        codeStates['model_info_group5b641'] = model_info_group5b641Props,
        codeStates['setmodel_info_group5b641'] = setmodel_info_group5b641Props,
        codeStates['grounding_group'] = grounding_groupb1b6f,
        codeStates['setgrounding_group'] = setgrounding_groupb1b6f,
        codeStates['grounding_groupb1b6f'] = grounding_groupb1b6fProps,
        codeStates['setgrounding_groupb1b6f'] = setgrounding_groupb1b6fProps,
        codeStates['validation_group'] = validation_group4d206,
        codeStates['setvalidation_group'] = setvalidation_group4d206,
        codeStates['validation_group4d206'] = validation_group4d206Props,
        codeStates['setvalidation_group4d206'] = setvalidation_group4d206Props,
        codeStates['security_text'] = security_text91cf6,
        codeStates['setsecurity_text'] = setsecurity_text91cf6,
        codeStates['kill_switch_state_code'] = kill_switch_state_code3ed20,
        codeStates['setkill_switch_state_code'] = setkill_switch_state_code3ed20,
        codeStates['kill_switch_updated_by'] = kill_switch_updated_by7a179,
        codeStates['setkill_switch_updated_by'] = setkill_switch_updated_by7a179,
        codeStates['kill_switch_updated_on'] = kill_switch_updated_on0aadf,
        codeStates['setkill_switch_updated_on'] = setkill_switch_updated_on0aadf,
        codeStates['is_active'] = is_activee26e9,
        codeStates['setis_active'] = setis_activee26e9,
        codeStates['segregation_notes'] = segregation_notesd7da7,
        codeStates['setsegregation_notes'] = setsegregation_notesd7da7,
        codeStates['dynamicactions'] = dynamicactions78fa5,
        codeStates['setdynamicactions'] = setdynamicactions78fa5,
        codeStates['dynamicactions78fa5'] = dynamicactions78fa5Props,
        codeStates['setdynamicactions78fa5'] = setdynamicactions78fa5Props,
    codeExecution(code,codeStates)
    }
  }
  const handleChange = async(e: any) => {
    let validate:any;
    setError('');
    setValidate((pre:any)=>({...pre,addAgentControl_v1:{...pre?.addAgentControl_v1,segregation_notes:undefined}}));
    if(dynamicStateandType.type=="number"){
    setvalidation_group4d206((prev: any) => ({ ...prev, segregation_notes: +e?.target?.value }));
    }
    else{
    setvalidation_group4d206((prev: any) => ({ ...prev, segregation_notes: e?.target?.value }));
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
  if (segregation_notesd7da7?.isHidden) {
    return <></>
  }
return (
  <div 
  style={{gridColumn: `1 / 14`,gridRow: `22 / 43`, gap:``, height: `100%`}} >
    <TextArea
      require={isRequredData}
      className=""
      onFocus={handleFocus}
      onChange={handleChange}
      onBlur={handleBlur}
      disabled= {segregation_notesd7da7?.isDisabled ? true : false}
      placeholder = {'type here...'}
      contentAlign={"left"}
      headerPosition='top'
      headerText="Segregation Notes"
      pin = {'brick-brick'}
      value = { validation_group4d206?.segregation_notes != null && typeof validation_group4d206?.segregation_notes =='object' ? Object.keys(validation_group4d206?.segregation_notes)?.length ?  JSON.stringify(validation_group4d206?.segregation_notes,null ,2):"" : validation_group4d206?.segregation_notes||""}
      errorMessage={error}
      validationState={validate?.addAgentControl_v1?.segregation_notes ? "invalid" : undefined}
    />
  </div>
  )
}

export default TextAreasegregation_notes
