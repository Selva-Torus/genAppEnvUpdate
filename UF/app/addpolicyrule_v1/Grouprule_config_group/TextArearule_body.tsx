
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


const TextArearule_body = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
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
  const [dynamicStateandType,setDynamicStateandType]=useState<any>({name:'rule_body',type:"string"})
  const [allCode,setAllCode] = useState<string>("")
  const toast : Function = useInfoMsg()
  const routes : AppRouterInstance = useRouter()
  const [error, setError] = useState<string>('');
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  let schemaArray :string[] =[];
  schemaArray = [] ;
 /////////////
   //another screen
  const {info_group321cd, setinfo_group321cd}= useContext(TotalContext) as TotalContextProps;
  const {info_group321cdProps, setinfo_group321cdProps}= useContext(TotalContext) as TotalContextProps;
  const {group51f33, setgroup51f33}= useContext(TotalContext) as TotalContextProps;
  const {group51f33Props, setgroup51f33Props}= useContext(TotalContext) as TotalContextProps;
  const {rule_config_group8a62a, setrule_config_group8a62a}= useContext(TotalContext) as TotalContextProps;
  const {rule_config_group8a62aProps, setrule_config_group8a62aProps}= useContext(TotalContext) as TotalContextProps;
  const {info_rulec9e0a, setinfo_rulec9e0a}= useContext(TotalContext) as TotalContextProps;
  const {rule_language1857d, setrule_language1857d}= useContext(TotalContext) as TotalContextProps;
  const {rule_body5e5de, setrule_body5e5de}= useContext(TotalContext) as TotalContextProps;
  const {rule_config_groupab2fc0, setrule_config_groupab2fc0}= useContext(TotalContext) as TotalContextProps;
  const {rule_config_groupab2fc0Props, setrule_config_groupab2fc0Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions57d44, setdynamicactions57d44}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions57d44Props, setdynamicactions57d44Props}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
    try{
      const orchestrationData:any = getControlOrchestrationData(
        controlData,
        "f81044d0dfc4f2d31240e065f008a62a",
        "e666c3160c140485b493abca88d5e5de"
      );
      if(Array.isArray(orchestrationData?.data?.schemaData?.at(0)?.schema)){
        let allSchemas:any[]=orchestrationData?.data?.schemaData?.at(0)?.schema||[]
        let type:any={name:'rule_body',type:'text'}
        allSchemas.map((item:any)=>{
          if(item.name=='rule_body')
          {
            type=item
  
          }
        })
        setDynamicStateandType(type)       
      }
      if(orchestrationData?.data?.schemaData?.at(0).schema.responses["200"].content["application/json"].schema.items.properties){
        let type:any={name:'rule_body',type:'text'}
        type={
          name:'rule_body',
          type: orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.rule_body.type == 'string' ? 'text' : orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.rule_body.type =='integer' ? 'number' : orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.rule_body.type
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
  },[rule_body5e5de?.refresh])
  
  useEffect(()=>{
    if (prevRefreshRef.current) {
      setrule_config_group8a62a((pre:any)=>({...pre,rule_body:""}))
    }else 
      prevRefreshRef.current= true
  },[rule_body5e5de?.refresh])

  const rule_config_group8a62aRef = useRef<any>(rule_config_group8a62a);
  useEffect(() => { rule_config_group8a62aRef.current = rule_config_group8a62a; }, [rule_config_group8a62a]);
  useEffect(()=>{
      handleMapperValue();
    if(validateRefetch.init!=0)
      handleValidate();
    const handlerChange = (id:any) => {
      if (id === "e666c3160c140485b493abca88d5e5de") {
        handleChange({target:{value:rule_config_group8a62aRef?.current?.rule_body||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "e666c3160c140485b493abca88d5e5de") {
        handleBlur({target:{value:rule_config_group8a62aRef?.current?.rule_body||""}});
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
        codeStates['info_group'] = info_group321cd,
        codeStates['setinfo_group'] = setinfo_group321cd,
        codeStates['info_group321cd'] = info_group321cdProps,
        codeStates['setinfo_group321cd'] = setinfo_group321cdProps,
        codeStates['group'] = group51f33,
        codeStates['setgroup'] = setgroup51f33,
        codeStates['group51f33'] = group51f33Props,
        codeStates['setgroup51f33'] = setgroup51f33Props,
        codeStates['rule_config_group'] = rule_config_group8a62a,
        codeStates['setrule_config_group'] = setrule_config_group8a62a,
        codeStates['rule_config_group8a62a'] = rule_config_group8a62aProps,
        codeStates['setrule_config_group8a62a'] = setrule_config_group8a62aProps,
        codeStates['info_rule'] = info_rulec9e0a,
        codeStates['setinfo_rule'] = setinfo_rulec9e0a,
        codeStates['rule_language'] = rule_language1857d,
        codeStates['setrule_language'] = setrule_language1857d,
        codeStates['rule_body'] = rule_body5e5de,
        codeStates['setrule_body'] = setrule_body5e5de,
        codeStates['rule_config_groupa'] = rule_config_groupab2fc0,
        codeStates['setrule_config_groupa'] = setrule_config_groupab2fc0,
        codeStates['rule_config_groupab2fc0'] = rule_config_groupab2fc0Props,
        codeStates['setrule_config_groupab2fc0'] = setrule_config_groupab2fc0Props,
        codeStates['dynamicactions'] = dynamicactions57d44,
        codeStates['setdynamicactions'] = setdynamicactions57d44,
        codeStates['dynamicactions57d44'] = dynamicactions57d44Props,
        codeStates['setdynamicactions57d44'] = setdynamicactions57d44Props,
    codeExecution(code,codeStates)
    }
  }
  const handleChange = async(e: any) => {
    let validate:any;
    setError('');
    setValidate((pre:any)=>({...pre,addPolicyRule_v1:{...pre?.addPolicyRule_v1,rule_body:undefined}}));
    if(dynamicStateandType.type=="number"){
    setrule_config_group8a62a((prev: any) => ({ ...prev, rule_body: +e?.target?.value }));
    }
    else{
    setrule_config_group8a62a((prev: any) => ({ ...prev, rule_body: e?.target?.value }));
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
  if (rule_body5e5de?.isHidden) {
    return <></>
  }
return (
  <div 
  style={{gridColumn: `1 / 25`,gridRow: `23 / 41`, gap:``, height: `100%`}} >
    <TextArea
      require={isRequredData}
      className=""
      onFocus={handleFocus}
      onChange={handleChange}
      onBlur={handleBlur}
      disabled= {rule_body5e5de?.isDisabled ? true : false}
      placeholder = {'# Write the rule here'}
      contentAlign={"left"}
      headerPosition='top'
      headerText="Rule Body"
      pin = {'brick-brick'}
      value = { rule_config_group8a62a?.rule_body != null && typeof rule_config_group8a62a?.rule_body =='object' ? Object.keys(rule_config_group8a62a?.rule_body)?.length ?  JSON.stringify(rule_config_group8a62a?.rule_body,null ,2):"" : rule_config_group8a62a?.rule_body||""}
      errorMessage={error}
      validationState={validate?.addPolicyRule_v1?.rule_body ? "invalid" : undefined}
    />
  </div>
  )
}

export default TextArearule_body
