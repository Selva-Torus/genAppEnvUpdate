
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


const TextAreacondition_text = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
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
  const [dynamicStateandType,setDynamicStateandType]=useState<any>({name:'condition_text',type:"string"})
  const [allCode,setAllCode] = useState<string>("")
  const toast : Function = useInfoMsg()
  const routes : AppRouterInstance = useRouter()
  const [error, setError] = useState<string>('');
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  let schemaArray :string[] =[];

  schemaArray = [
  "v.string()",
  "v.nonEmpty('This field is required.')"
] ;
    const schema : any  = v.pipe(    v.string(),
    v.nonEmpty('This field is required.'),
)
 /////////////
   //another screen
  const {info_groupcb42f, setinfo_groupcb42f}= useContext(TotalContext) as TotalContextProps;
  const {info_groupcb42fProps, setinfo_groupcb42fProps}= useContext(TotalContext) as TotalContextProps;
  const {group85ee1, setgroup85ee1}= useContext(TotalContext) as TotalContextProps;
  const {group85ee1Props, setgroup85ee1Props}= useContext(TotalContext) as TotalContextProps;
  const {info_rule9eda4, setinfo_rule9eda4}= useContext(TotalContext) as TotalContextProps;
  const {stage_namef85b6, setstage_namef85b6}= useContext(TotalContext) as TotalContextProps;
  const {status_codeb8e30, setstatus_codeb8e30}= useContext(TotalContext) as TotalContextProps;
  const {condition_text4da2f, setcondition_text4da2f}= useContext(TotalContext) as TotalContextProps;
  const {rule_config_groupa2b93, setrule_config_groupa2b93}= useContext(TotalContext) as TotalContextProps;
  const {rule_config_groupa2b93Props, setrule_config_groupa2b93Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsbe417, setdynamicactionsbe417}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsbe417Props, setdynamicactionsbe417Props}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
    try{
      const orchestrationData:any = getControlOrchestrationData(
        controlData,
        "5cda5668c9e05cd0c1c49d447b385ee1",
        "e494513617fbac17041023c3d524da2f"
      );
      if(Array.isArray(orchestrationData?.data?.schemaData?.at(0)?.schema)){
        let allSchemas:any[]=orchestrationData?.data?.schemaData?.at(0)?.schema||[]
        let type:any={name:'condition_text',type:'text'}
        allSchemas.map((item:any)=>{
          if(item.name=='condition_text')
          {
            type=item
  
          }
        })
        setDynamicStateandType(type)       
      }
      if(orchestrationData?.data?.schemaData?.at(0).schema.responses["200"].content["application/json"].schema.items.properties){
        let type:any={name:'condition_text',type:'text'}
        type={
          name:'condition_text',
          type: orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.condition_text.type == 'string' ? 'text' : orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.condition_text.type =='integer' ? 'number' : orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.condition_text.type
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
  },[condition_text4da2f?.refresh])
  
  useEffect(()=>{
    if (prevRefreshRef.current) {
      setgroup85ee1((pre:any)=>({...pre,condition_text:""}))
    }else 
      prevRefreshRef.current= true
  },[condition_text4da2f?.refresh])

  const group85ee1Ref = useRef<any>(group85ee1);
  useEffect(() => { group85ee1Ref.current = group85ee1; }, [group85ee1]);
  useEffect(()=>{
      handleMapperValue();
    if(!group85ee1?.condition_text)
    {
      setIsRequredData(true);
    }
    if(validateRefetch.init!=0)
      handleValidate();
    const handlerChange = (id:any) => {
      if (id === "e494513617fbac17041023c3d524da2f") {
        handleChange({target:{value:group85ee1Ref?.current?.condition_text||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "e494513617fbac17041023c3d524da2f") {
        handleBlur({target:{value:group85ee1Ref?.current?.condition_text||""}});
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
    if(group85ee1?.condition_text == "" || group85ee1?.condition_text == undefined){
    group85ee1.condition_text = "";
    if(dynamicStateandType.type=="number"){
          validate = v.safeParse(schema, NaN);
        }
        else{
          validate = v.safeParse(schema, group85ee1?.condition_text);
        }
      if(!validate.success){
        setError(validate?.issues[0]?.message);
        setValidate((pre:any)=>({...pre,addCertificationCondition_v1:{...pre?.addCertificationCondition_v1,condition_text:"invalid"}}));
      }
    }else if(group85ee1?.condition_text !== ""){
   if(dynamicStateandType.type=="number"){
          validate = v.safeParse(schema, +group85ee1?.condition_text);
        }
        else{
          validate = v.safeParse(schema, group85ee1?.condition_text);
        }
    if(!validate.success){
      setError(validate?.issues[0]?.message);
      setValidate((pre:any)=>({...pre,addCertificationCondition_v1:{...pre?.addCertificationCondition_v1,condition_text:"invalid"}}));
    }else{
      setError('');
      setValidate((pre:any)=>({...pre,addCertificationCondition_v1:{...pre?.addCertificationCondition_v1,condition_text:undefined}}));
    }
    }
    if(!validate?.success){
      return
    }
    code = allCode;
    if (code != '') {
      let codeStates: any = {};
        codeStates['info_group'] = info_groupcb42f,
        codeStates['setinfo_group'] = setinfo_groupcb42f,
        codeStates['info_groupcb42f'] = info_groupcb42fProps,
        codeStates['setinfo_groupcb42f'] = setinfo_groupcb42fProps,
        codeStates['group'] = group85ee1,
        codeStates['setgroup'] = setgroup85ee1,
        codeStates['group85ee1'] = group85ee1Props,
        codeStates['setgroup85ee1'] = setgroup85ee1Props,
        codeStates['info_rule'] = info_rule9eda4,
        codeStates['setinfo_rule'] = setinfo_rule9eda4,
        codeStates['stage_name'] = stage_namef85b6,
        codeStates['setstage_name'] = setstage_namef85b6,
        codeStates['status_code'] = status_codeb8e30,
        codeStates['setstatus_code'] = setstatus_codeb8e30,
        codeStates['condition_text'] = condition_text4da2f,
        codeStates['setcondition_text'] = setcondition_text4da2f,
        codeStates['rule_config_group'] = rule_config_groupa2b93,
        codeStates['setrule_config_group'] = setrule_config_groupa2b93,
        codeStates['rule_config_groupa2b93'] = rule_config_groupa2b93Props,
        codeStates['setrule_config_groupa2b93'] = setrule_config_groupa2b93Props,
        codeStates['dynamicactions'] = dynamicactionsbe417,
        codeStates['setdynamicactions'] = setdynamicactionsbe417,
        codeStates['dynamicactionsbe417'] = dynamicactionsbe417Props,
        codeStates['setdynamicactionsbe417'] = setdynamicactionsbe417Props,
    codeExecution(code,codeStates)
    }
  }
  const handleChange = async(e: any) => {
    if(e.target.value=="")
    {
      setIsRequredData(true)
    }else{
      setIsRequredData(false)
    }
    let validate:any;
    setError('');
    setValidate((pre:any)=>({...pre,addCertificationCondition_v1:{...pre?.addCertificationCondition_v1,condition_text:undefined}}));
    if(dynamicStateandType.type=="number"){
    setgroup85ee1((prev: any) => ({ ...prev, condition_text: +e?.target?.value }));
    validate = v.safeParse(schema, +e.target.value);
    }
    else{
    setgroup85ee1((prev: any) => ({ ...prev, condition_text: e?.target?.value }));
    validate = v.safeParse(schema, e.target.value);
    }
    if(!validate?.success){
      return
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
      if(group85ee1?.condition_text == "" || group85ee1?.condition_text == undefined){
      group85ee1.condition_text = "";
     if(dynamicStateandType.type=="number"){
        validate = v.safeParse(schema, NaN);
      }
      else{
        validate = v.safeParse(schema, group85ee1?.condition_text);
      }
        if(!validate.success){
          setError(validate?.issues[0]?.message);
          setValidate((pre:any)=>({...pre,addCertificationCondition_v1:{...pre?.addCertificationCondition_v1,condition_text:"invalid"}}));
        }
    }else if(group85ee1?.condition_text !== ""){
   if(dynamicStateandType.type=="number"){
          validate = v.safeParse(schema, +group85ee1?.condition_text);
        }
        else{
          validate = v.safeParse(schema, group85ee1?.condition_text);
        }
    if(!validate.success){
      setError(validate?.issues[0]?.message);
      setValidate((pre:any)=>({...pre,addCertificationCondition_v1:{...pre?.addCertificationCondition_v1,condition_text:"invalid"}}));
    }else{
      setError('');
      setValidate((pre:any)=>({...pre,addCertificationCondition_v1:{...pre?.addCertificationCondition_v1,condition_text:undefined}}));
    }
    }
    if(!validate?.success){
      return
    }
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
  if (condition_text4da2f?.isHidden) {
    return <></>
  }
return (
  <div 
  style={{gridColumn: `1 / 25`,gridRow: `25 / 51`, gap:``, height: `100%`}} >
    <TextArea
      require={isRequredData}
      className=""
      onFocus={handleFocus}
      onChange={handleChange}
      onBlur={handleBlur}
      disabled= {condition_text4da2f?.isDisabled ? true : false}
      contentAlign={"left"}
      headerPosition='top'
      headerText="Condition Text"
      pin = {'brick-brick'}
      value = { group85ee1?.condition_text != null && typeof group85ee1?.condition_text =='object' ? Object.keys(group85ee1?.condition_text)?.length ?  JSON.stringify(group85ee1?.condition_text,null ,2):"" : group85ee1?.condition_text||""}
      errorMessage={error}
      validationState={validate?.addCertificationCondition_v1?.condition_text ? "invalid" : undefined}
    />
  </div>
  )
}

export default TextAreacondition_text
