
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


const TextAreajustification = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
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
  const [dynamicStateandType,setDynamicStateandType]=useState<any>({name:'justification',type:"string"})
  const [allCode,setAllCode] = useState<string>("")
  const toast : Function = useInfoMsg()
  const routes : AppRouterInstance = useRouter()
  const [error, setError] = useState<string>('');
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  let schemaArray :string[] =[];
  schemaArray = [] ;
 /////////////
   //another screen
  const {code_value_groupa2e67, setcode_value_groupa2e67}= useContext(TotalContext) as TotalContextProps;
  const {code_value_groupa2e67Props, setcode_value_groupa2e67Props}= useContext(TotalContext) as TotalContextProps;
  const {asset_group181c0, setasset_group181c0}= useContext(TotalContext) as TotalContextProps;
  const {asset_group181c0Props, setasset_group181c0Props}= useContext(TotalContext) as TotalContextProps;
  const {assessed_tier_code8866c, setassessed_tier_code8866c}= useContext(TotalContext) as TotalContextProps;
  const {justificationc41ce, setjustificationc41ce}= useContext(TotalContext) as TotalContextProps;
  const {desc_texta0702, setdesc_texta0702}= useContext(TotalContext) as TotalContextProps;
  const {assigned_login_name8a256, setassigned_login_name8a256}= useContext(TotalContext) as TotalContextProps;
  const {descs_text2e8fe, setdescs_text2e8fe}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
    try{
      const orchestrationData:any = getControlOrchestrationData(
        controlData,
        "ea9bd4cdc3847f7ace4026cc310181c0",
        "46aa53ea4335424f960d87ec46fc41ce"
      );
      if(Array.isArray(orchestrationData?.data?.schemaData?.at(0)?.schema)){
        let allSchemas:any[]=orchestrationData?.data?.schemaData?.at(0)?.schema||[]
        let type:any={name:'justification',type:'text'}
        allSchemas.map((item:any)=>{
          if(item.name=='justification')
          {
            type=item
  
          }
        })
        setDynamicStateandType(type)       
      }
      if(orchestrationData?.data?.schemaData?.at(0).schema.responses["200"].content["application/json"].schema.items.properties){
        let type:any={name:'justification',type:'text'}
        type={
          name:'justification',
          type: orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.justification.type == 'string' ? 'text' : orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.justification.type =='integer' ? 'number' : orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.justification.type
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
  },[justificationc41ce?.refresh])
  
  useEffect(()=>{
    if (prevRefreshRef.current) {
      setasset_group181c0((pre:any)=>({...pre,justification:""}))
    }else 
      prevRefreshRef.current= true
  },[justificationc41ce?.refresh])

  const asset_group181c0Ref = useRef<any>(asset_group181c0);
  useEffect(() => { asset_group181c0Ref.current = asset_group181c0; }, [asset_group181c0]);
  useEffect(()=>{
      handleMapperValue();
    if(validateRefetch.init!=0)
      handleValidate();
    const handlerChange = (id:any) => {
      if (id === "46aa53ea4335424f960d87ec46fc41ce") {
        handleChange({target:{value:asset_group181c0Ref?.current?.justification||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "46aa53ea4335424f960d87ec46fc41ce") {
        handleBlur({target:{value:asset_group181c0Ref?.current?.justification||""}});
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
        codeStates['code_value_group'] = code_value_groupa2e67,
        codeStates['setcode_value_group'] = setcode_value_groupa2e67,
        codeStates['code_value_groupa2e67'] = code_value_groupa2e67Props,
        codeStates['setcode_value_groupa2e67'] = setcode_value_groupa2e67Props,
        codeStates['asset_group'] = asset_group181c0,
        codeStates['setasset_group'] = setasset_group181c0,
        codeStates['asset_group181c0'] = asset_group181c0Props,
        codeStates['setasset_group181c0'] = setasset_group181c0Props,
        codeStates['assessed_tier_code'] = assessed_tier_code8866c,
        codeStates['setassessed_tier_code'] = setassessed_tier_code8866c,
        codeStates['justification'] = justificationc41ce,
        codeStates['setjustification'] = setjustificationc41ce,
        codeStates['desc_text'] = desc_texta0702,
        codeStates['setdesc_text'] = setdesc_texta0702,
        codeStates['assigned_login_name'] = assigned_login_name8a256,
        codeStates['setassigned_login_name'] = setassigned_login_name8a256,
        codeStates['descs_text'] = descs_text2e8fe,
        codeStates['setdescs_text'] = setdescs_text2e8fe,
    codeExecution(code,codeStates)
    }
  }
  const handleChange = async(e: any) => {
    let validate:any;
    setError('');
    setValidate((pre:any)=>({...pre,changeTier_v1:{...pre?.changeTier_v1,justification:undefined}}));
    if(dynamicStateandType.type=="number"){
    setasset_group181c0((prev: any) => ({ ...prev, justification: +e?.target?.value }));
    }
    else{
    setasset_group181c0((prev: any) => ({ ...prev, justification: e?.target?.value }));
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
  if (justificationc41ce?.isHidden) {
    return <></>
  }
return (
  <div 
  style={{gridColumn: `1 / 25`,gridRow: `18 / 42`, gap:``, height: `100%`}} >
    <TextArea
      require={isRequredData}
      className=""
      onFocus={handleFocus}
      onChange={handleChange}
      onBlur={handleBlur}
      disabled= {justificationc41ce?.isDisabled ? true : false}
      placeholder = {'Explain why the derived tier is wrong for this asset.'}
      contentAlign={"left"}
      headerPosition='top'
      headerText="Justification"
      pin = {'brick-brick'}
      value = { asset_group181c0?.justification != null && typeof asset_group181c0?.justification =='object' ? Object.keys(asset_group181c0?.justification)?.length ?  JSON.stringify(asset_group181c0?.justification,null ,2):"" : asset_group181c0?.justification||""}
      errorMessage={error}
      validationState={validate?.changeTier_v1?.justification ? "invalid" : undefined}
    />
  </div>
  )
}

export default TextAreajustification
