
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


const TextAreatransform_rule = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
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
  const [dynamicStateandType,setDynamicStateandType]=useState<any>({name:'transform_rule',type:"string"})
  const [allCode,setAllCode] = useState<string>("")
  const toast : Function = useInfoMsg()
  const routes : AppRouterInstance = useRouter()
  const [error, setError] = useState<string>('');
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  let schemaArray :string[] =[];
  schemaArray = [] ;
 /////////////
   //another screen
  const {add_field_map_grp9e14b, setadd_field_map_grp9e14b}= useContext(TotalContext) as TotalContextProps;
  const {add_field_map_grp9e14bProps, setadd_field_map_grp9e14bProps}= useContext(TotalContext) as TotalContextProps;
  const {source_mapping_grp4af45, setsource_mapping_grp4af45}= useContext(TotalContext) as TotalContextProps;
  const {source_mapping_grp4af45Props, setsource_mapping_grp4af45Props}= useContext(TotalContext) as TotalContextProps;
  const {target_mapping_grpa2fc8, settarget_mapping_grpa2fc8}= useContext(TotalContext) as TotalContextProps;
  const {target_mapping_grpa2fc8Props, settarget_mapping_grpa2fc8Props}= useContext(TotalContext) as TotalContextProps;
  const {transformation_grp78a0e, settransformation_grp78a0e}= useContext(TotalContext) as TotalContextProps;
  const {transformation_grp78a0eProps, settransformation_grp78a0eProps}= useContext(TotalContext) as TotalContextProps;
  const {transformation_texte6db9, settransformation_texte6db9}= useContext(TotalContext) as TotalContextProps;
  const {transform_rule4a53a, settransform_rule4a53a}= useContext(TotalContext) as TotalContextProps;
  const {default_value7ccac, setdefault_value7ccac}= useContext(TotalContext) as TotalContextProps;
  const {field_rules_grp65d55, setfield_rules_grp65d55}= useContext(TotalContext) as TotalContextProps;
  const {field_rules_grp65d55Props, setfield_rules_grp65d55Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsd2b2c, setdynamicactionsd2b2c}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsd2b2cProps, setdynamicactionsd2b2cProps}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
    try{
      const orchestrationData:any = getControlOrchestrationData(
        controlData,
        "8d72fdb386da4b2aaf7c9181d0e78a0e",
        "18a9d50c77e04d1c84082b936c74a53a"
      );
      if(Array.isArray(orchestrationData?.data?.schemaData?.at(0)?.schema)){
        let allSchemas:any[]=orchestrationData?.data?.schemaData?.at(0)?.schema||[]
        let type:any={name:'transform_rule',type:'text'}
        allSchemas.map((item:any)=>{
          if(item.name=='transform_rule')
          {
            type=item
  
          }
        })
        setDynamicStateandType(type)       
      }
      if(orchestrationData?.data?.schemaData?.at(0).schema.responses["200"].content["application/json"].schema.items.properties){
        let type:any={name:'transform_rule',type:'text'}
        type={
          name:'transform_rule',
          type: orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.transform_rule.type == 'string' ? 'text' : orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.transform_rule.type =='integer' ? 'number' : orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.transform_rule.type
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
  },[transform_rule4a53a?.refresh])
  
  useEffect(()=>{
    if (prevRefreshRef.current) {
      settransformation_grp78a0e((pre:any)=>({...pre,transform_rule:""}))
    }else 
      prevRefreshRef.current= true
  },[transform_rule4a53a?.refresh])

  const transformation_grp78a0eRef = useRef<any>(transformation_grp78a0e);
  useEffect(() => { transformation_grp78a0eRef.current = transformation_grp78a0e; }, [transformation_grp78a0e]);
  useEffect(()=>{
      handleMapperValue();
    if(validateRefetch.init!=0)
      handleValidate();
    const handlerChange = (id:any) => {
      if (id === "18a9d50c77e04d1c84082b936c74a53a") {
        handleChange({target:{value:transformation_grp78a0eRef?.current?.transform_rule||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "18a9d50c77e04d1c84082b936c74a53a") {
        handleBlur({target:{value:transformation_grp78a0eRef?.current?.transform_rule||""}});
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
        codeStates['add_field_map_grp'] = add_field_map_grp9e14b,
        codeStates['setadd_field_map_grp'] = setadd_field_map_grp9e14b,
        codeStates['add_field_map_grp9e14b'] = add_field_map_grp9e14bProps,
        codeStates['setadd_field_map_grp9e14b'] = setadd_field_map_grp9e14bProps,
        codeStates['source_mapping_grp'] = source_mapping_grp4af45,
        codeStates['setsource_mapping_grp'] = setsource_mapping_grp4af45,
        codeStates['source_mapping_grp4af45'] = source_mapping_grp4af45Props,
        codeStates['setsource_mapping_grp4af45'] = setsource_mapping_grp4af45Props,
        codeStates['target_mapping_grp'] = target_mapping_grpa2fc8,
        codeStates['settarget_mapping_grp'] = settarget_mapping_grpa2fc8,
        codeStates['target_mapping_grpa2fc8'] = target_mapping_grpa2fc8Props,
        codeStates['settarget_mapping_grpa2fc8'] = settarget_mapping_grpa2fc8Props,
        codeStates['transformation_grp'] = transformation_grp78a0e,
        codeStates['settransformation_grp'] = settransformation_grp78a0e,
        codeStates['transformation_grp78a0e'] = transformation_grp78a0eProps,
        codeStates['settransformation_grp78a0e'] = settransformation_grp78a0eProps,
        codeStates['transformation_text'] = transformation_texte6db9,
        codeStates['settransformation_text'] = settransformation_texte6db9,
        codeStates['transform_rule'] = transform_rule4a53a,
        codeStates['settransform_rule'] = settransform_rule4a53a,
        codeStates['default_value'] = default_value7ccac,
        codeStates['setdefault_value'] = setdefault_value7ccac,
        codeStates['field_rules_grp'] = field_rules_grp65d55,
        codeStates['setfield_rules_grp'] = setfield_rules_grp65d55,
        codeStates['field_rules_grp65d55'] = field_rules_grp65d55Props,
        codeStates['setfield_rules_grp65d55'] = setfield_rules_grp65d55Props,
        codeStates['dynamicactions'] = dynamicactionsd2b2c,
        codeStates['setdynamicactions'] = setdynamicactionsd2b2c,
        codeStates['dynamicactionsd2b2c'] = dynamicactionsd2b2cProps,
        codeStates['setdynamicactionsd2b2c'] = setdynamicactionsd2b2cProps,
    codeExecution(code,codeStates)
    }
  }
  const handleChange = async(e: any) => {
    let validate:any;
    setError('');
    setValidate((pre:any)=>({...pre,addIntegrationFieldMap_v1:{...pre?.addIntegrationFieldMap_v1,transform_rule:undefined}}));
    if(dynamicStateandType.type=="number"){
    settransformation_grp78a0e((prev: any) => ({ ...prev, transform_rule: +e?.target?.value }));
    }
    else{
    settransformation_grp78a0e((prev: any) => ({ ...prev, transform_rule: e?.target?.value }));
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
  if (transform_rule4a53a?.isHidden) {
    return <></>
  }
return (
  <div 
  style={{gridColumn: `1 / 13`,gridRow: `11 / 26`, gap:``, height: `100%`}} >
    <TextArea
      require={isRequredData}
      className=""
      onFocus={handleFocus}
      onChange={handleChange}
      onBlur={handleBlur}
      disabled= {transform_rule4a53a?.isDisabled ? true : false}
      contentAlign={"left"}
      headerPosition='top'
      headerText="Transform Rule"
      pin = {'brick-brick'}
      value = { transformation_grp78a0e?.transform_rule != null && typeof transformation_grp78a0e?.transform_rule =='object' ? Object.keys(transformation_grp78a0e?.transform_rule)?.length ?  JSON.stringify(transformation_grp78a0e?.transform_rule,null ,2):"" : transformation_grp78a0e?.transform_rule||""}
      errorMessage={error}
      validationState={validate?.addIntegrationFieldMap_v1?.transform_rule ? "invalid" : undefined}
    />
  </div>
  )
}

export default TextAreatransform_rule
