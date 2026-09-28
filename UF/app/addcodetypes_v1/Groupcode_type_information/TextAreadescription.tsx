
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
  const {groupa1a96, setgroupa1a96}= useContext(TotalContext) as TotalContextProps;
  const {groupa1a96Props, setgroupa1a96Props}= useContext(TotalContext) as TotalContextProps;
  const {code_type_informationd59aa, setcode_type_informationd59aa}= useContext(TotalContext) as TotalContextProps;
  const {code_type_informationd59aaProps, setcode_type_informationd59aaProps}= useContext(TotalContext) as TotalContextProps;
  const {code_typeb31bb, setcode_typeb31bb}= useContext(TotalContext) as TotalContextProps;
  const {descriptione6525, setdescriptione6525}= useContext(TotalContext) as TotalContextProps;
  const {is_system869d1, setis_system869d1}= useContext(TotalContext) as TotalContextProps;
  const {is_active28565, setis_active28565}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions48144, setdynamicactions48144}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions48144Props, setdynamicactions48144Props}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
    try{
      const orchestrationData:any = getControlOrchestrationData(
        controlData,
        "e5281ffccb964106b9ffd0a5235d59aa",
        "e98c1f42b3ee4a4aa6ca6952906e6525"
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
  },[descriptione6525?.refresh])
  
  useEffect(()=>{
    if (prevRefreshRef.current) {
      setcode_type_informationd59aa((pre:any)=>({...pre,description:""}))
    }else 
      prevRefreshRef.current= true
  },[descriptione6525?.refresh])

  const code_type_informationd59aaRef = useRef<any>(code_type_informationd59aa);
  useEffect(() => { code_type_informationd59aaRef.current = code_type_informationd59aa; }, [code_type_informationd59aa]);
  useEffect(()=>{
      handleMapperValue();
    if(validateRefetch.init!=0)
      handleValidate();
    const handlerChange = (id:any) => {
      if (id === "e98c1f42b3ee4a4aa6ca6952906e6525") {
        handleChange({target:{value:code_type_informationd59aaRef?.current?.description||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "e98c1f42b3ee4a4aa6ca6952906e6525") {
        handleBlur({target:{value:code_type_informationd59aaRef?.current?.description||""}});
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
        codeStates['group'] = groupa1a96,
        codeStates['setgroup'] = setgroupa1a96,
        codeStates['groupa1a96'] = groupa1a96Props,
        codeStates['setgroupa1a96'] = setgroupa1a96Props,
        codeStates['code_type_information'] = code_type_informationd59aa,
        codeStates['setcode_type_information'] = setcode_type_informationd59aa,
        codeStates['code_type_informationd59aa'] = code_type_informationd59aaProps,
        codeStates['setcode_type_informationd59aa'] = setcode_type_informationd59aaProps,
        codeStates['code_type'] = code_typeb31bb,
        codeStates['setcode_type'] = setcode_typeb31bb,
        codeStates['description'] = descriptione6525,
        codeStates['setdescription'] = setdescriptione6525,
        codeStates['is_system'] = is_system869d1,
        codeStates['setis_system'] = setis_system869d1,
        codeStates['is_active'] = is_active28565,
        codeStates['setis_active'] = setis_active28565,
        codeStates['dynamicactions'] = dynamicactions48144,
        codeStates['setdynamicactions'] = setdynamicactions48144,
        codeStates['dynamicactions48144'] = dynamicactions48144Props,
        codeStates['setdynamicactions48144'] = setdynamicactions48144Props,
    codeExecution(code,codeStates)
    }
  }
  const handleChange = async(e: any) => {
    let validate:any;
    setError('');
    setValidate((pre:any)=>({...pre,addCodeTypes_v1:{...pre?.addCodeTypes_v1,description:undefined}}));
    if(dynamicStateandType.type=="number"){
    setcode_type_informationd59aa((prev: any) => ({ ...prev, description: +e?.target?.value }));
    }
    else{
    setcode_type_informationd59aa((prev: any) => ({ ...prev, description: e?.target?.value }));
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
  if (descriptione6525?.isHidden) {
    return <></>
  }
return (
  <div 
  style={{gridColumn: `7 / 25`,gridRow: `1 / 16`, gap:``, height: `100%`}} >
    <TextArea
      require={isRequredData}
      className=""
      onFocus={handleFocus}
      onChange={handleChange}
      onBlur={handleBlur}
      disabled= {descriptione6525?.isDisabled ? true : false}
      placeholder = {'Enter Description'}
      contentAlign={"left"}
      headerPosition='top'
      headerText="Description"
      pin = {'brick-brick'}
      value = { code_type_informationd59aa?.description != null && typeof code_type_informationd59aa?.description =='object' ? Object.keys(code_type_informationd59aa?.description)?.length ?  JSON.stringify(code_type_informationd59aa?.description,null ,2):"" : code_type_informationd59aa?.description||""}
      errorMessage={error}
      validationState={validate?.addCodeTypes_v1?.description ? "invalid" : undefined}
    />
  </div>
  )
}

export default TextAreadescription
