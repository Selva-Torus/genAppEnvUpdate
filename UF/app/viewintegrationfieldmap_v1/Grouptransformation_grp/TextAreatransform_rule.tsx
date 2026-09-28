
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
  const {add_field_map_grp74a39, setadd_field_map_grp74a39}= useContext(TotalContext) as TotalContextProps;
  const {add_field_map_grp74a39Props, setadd_field_map_grp74a39Props}= useContext(TotalContext) as TotalContextProps;
  const {source_mapping_grp99571, setsource_mapping_grp99571}= useContext(TotalContext) as TotalContextProps;
  const {source_mapping_grp99571Props, setsource_mapping_grp99571Props}= useContext(TotalContext) as TotalContextProps;
  const {target_mapping_grp841a3, settarget_mapping_grp841a3}= useContext(TotalContext) as TotalContextProps;
  const {target_mapping_grp841a3Props, settarget_mapping_grp841a3Props}= useContext(TotalContext) as TotalContextProps;
  const {transformation_grp75a9a, settransformation_grp75a9a}= useContext(TotalContext) as TotalContextProps;
  const {transformation_grp75a9aProps, settransformation_grp75a9aProps}= useContext(TotalContext) as TotalContextProps;
  const {transformation_text9b95c, settransformation_text9b95c}= useContext(TotalContext) as TotalContextProps;
  const {transform_rule84075, settransform_rule84075}= useContext(TotalContext) as TotalContextProps;
  const {default_value68dfe, setdefault_value68dfe}= useContext(TotalContext) as TotalContextProps;
  const {field_rules_grp2cb2f, setfield_rules_grp2cb2f}= useContext(TotalContext) as TotalContextProps;
  const {field_rules_grp2cb2fProps, setfield_rules_grp2cb2fProps}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
    try{
      const orchestrationData:any = getControlOrchestrationData(
        controlData,
        "e0c3e7bcfbd120285820fd0370275a9a",
        "45b500416fd3c6861f07c5d507084075"
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
  },[transform_rule84075?.refresh])
  
  useEffect(()=>{
    if (prevRefreshRef.current) {
      settransformation_grp75a9a((pre:any)=>({...pre,transform_rule:""}))
    }else 
      prevRefreshRef.current= true
  },[transform_rule84075?.refresh])

  const transformation_grp75a9aRef = useRef<any>(transformation_grp75a9a);
  useEffect(() => { transformation_grp75a9aRef.current = transformation_grp75a9a; }, [transformation_grp75a9a]);
  useEffect(()=>{
      handleMapperValue();
    if(validateRefetch.init!=0)
      handleValidate();
    const handlerChange = (id:any) => {
      if (id === "45b500416fd3c6861f07c5d507084075") {
        handleChange({target:{value:transformation_grp75a9aRef?.current?.transform_rule||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "45b500416fd3c6861f07c5d507084075") {
        handleBlur({target:{value:transformation_grp75a9aRef?.current?.transform_rule||""}});
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
        codeStates['add_field_map_grp'] = add_field_map_grp74a39,
        codeStates['setadd_field_map_grp'] = setadd_field_map_grp74a39,
        codeStates['add_field_map_grp74a39'] = add_field_map_grp74a39Props,
        codeStates['setadd_field_map_grp74a39'] = setadd_field_map_grp74a39Props,
        codeStates['source_mapping_grp'] = source_mapping_grp99571,
        codeStates['setsource_mapping_grp'] = setsource_mapping_grp99571,
        codeStates['source_mapping_grp99571'] = source_mapping_grp99571Props,
        codeStates['setsource_mapping_grp99571'] = setsource_mapping_grp99571Props,
        codeStates['target_mapping_grp'] = target_mapping_grp841a3,
        codeStates['settarget_mapping_grp'] = settarget_mapping_grp841a3,
        codeStates['target_mapping_grp841a3'] = target_mapping_grp841a3Props,
        codeStates['settarget_mapping_grp841a3'] = settarget_mapping_grp841a3Props,
        codeStates['transformation_grp'] = transformation_grp75a9a,
        codeStates['settransformation_grp'] = settransformation_grp75a9a,
        codeStates['transformation_grp75a9a'] = transformation_grp75a9aProps,
        codeStates['settransformation_grp75a9a'] = settransformation_grp75a9aProps,
        codeStates['transformation_text'] = transformation_text9b95c,
        codeStates['settransformation_text'] = settransformation_text9b95c,
        codeStates['transform_rule'] = transform_rule84075,
        codeStates['settransform_rule'] = settransform_rule84075,
        codeStates['default_value'] = default_value68dfe,
        codeStates['setdefault_value'] = setdefault_value68dfe,
        codeStates['field_rules_grp'] = field_rules_grp2cb2f,
        codeStates['setfield_rules_grp'] = setfield_rules_grp2cb2f,
        codeStates['field_rules_grp2cb2f'] = field_rules_grp2cb2fProps,
        codeStates['setfield_rules_grp2cb2f'] = setfield_rules_grp2cb2fProps,
    codeExecution(code,codeStates)
    }
  }
  const handleChange = async(e: any) => {
    let validate:any;
    setError('');
    setValidate((pre:any)=>({...pre,viewIntegrationFieldMap_v1:{...pre?.viewIntegrationFieldMap_v1,transform_rule:undefined}}));
    if(dynamicStateandType.type=="number"){
    settransformation_grp75a9a((prev: any) => ({ ...prev, transform_rule: +e?.target?.value }));
    }
    else{
    settransformation_grp75a9a((prev: any) => ({ ...prev, transform_rule: e?.target?.value }));
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
  if (transform_rule84075?.isHidden) {
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
      disabled= {transform_rule84075?.isDisabled ? true : false}
      contentAlign={"left"}
      headerPosition='top'
      headerText="Transform Rule"
      pin = {'brick-brick'}
      value = { transformation_grp75a9a?.transform_rule != null && typeof transformation_grp75a9a?.transform_rule =='object' ? Object.keys(transformation_grp75a9a?.transform_rule)?.length ?  JSON.stringify(transformation_grp75a9a?.transform_rule,null ,2):"" : transformation_grp75a9a?.transform_rule||""}
      errorMessage={error}
      validationState={validate?.viewIntegrationFieldMap_v1?.transform_rule ? "invalid" : undefined}
    />
  </div>
  )
}

export default TextAreatransform_rule
