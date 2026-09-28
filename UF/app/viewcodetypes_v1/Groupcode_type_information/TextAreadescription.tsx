
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
  const {group0b46c, setgroup0b46c}= useContext(TotalContext) as TotalContextProps;
  const {group0b46cProps, setgroup0b46cProps}= useContext(TotalContext) as TotalContextProps;
  const {code_type_informationc1162, setcode_type_informationc1162}= useContext(TotalContext) as TotalContextProps;
  const {code_type_informationc1162Props, setcode_type_informationc1162Props}= useContext(TotalContext) as TotalContextProps;
  const {code_type1ff3d, setcode_type1ff3d}= useContext(TotalContext) as TotalContextProps;
  const {description5291c, setdescription5291c}= useContext(TotalContext) as TotalContextProps;
  const {is_system5065d, setis_system5065d}= useContext(TotalContext) as TotalContextProps;
  const {is_activec791d, setis_activec791d}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
    try{
      const orchestrationData:any = getControlOrchestrationData(
        controlData,
        "5b5204988aab402696a9f9082c2c1162",
        "485633e004234498a1d723d043f5291c"
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
  },[description5291c?.refresh])
  
  useEffect(()=>{
    if (prevRefreshRef.current) {
      setcode_type_informationc1162((pre:any)=>({...pre,description:""}))
    }else 
      prevRefreshRef.current= true
  },[description5291c?.refresh])

  const code_type_informationc1162Ref = useRef<any>(code_type_informationc1162);
  useEffect(() => { code_type_informationc1162Ref.current = code_type_informationc1162; }, [code_type_informationc1162]);
  useEffect(()=>{
      handleMapperValue();
    if(validateRefetch.init!=0)
      handleValidate();
    const handlerChange = (id:any) => {
      if (id === "485633e004234498a1d723d043f5291c") {
        handleChange({target:{value:code_type_informationc1162Ref?.current?.description||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "485633e004234498a1d723d043f5291c") {
        handleBlur({target:{value:code_type_informationc1162Ref?.current?.description||""}});
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
        codeStates['group'] = group0b46c,
        codeStates['setgroup'] = setgroup0b46c,
        codeStates['group0b46c'] = group0b46cProps,
        codeStates['setgroup0b46c'] = setgroup0b46cProps,
        codeStates['code_type_information'] = code_type_informationc1162,
        codeStates['setcode_type_information'] = setcode_type_informationc1162,
        codeStates['code_type_informationc1162'] = code_type_informationc1162Props,
        codeStates['setcode_type_informationc1162'] = setcode_type_informationc1162Props,
        codeStates['code_type'] = code_type1ff3d,
        codeStates['setcode_type'] = setcode_type1ff3d,
        codeStates['description'] = description5291c,
        codeStates['setdescription'] = setdescription5291c,
        codeStates['is_system'] = is_system5065d,
        codeStates['setis_system'] = setis_system5065d,
        codeStates['is_active'] = is_activec791d,
        codeStates['setis_active'] = setis_activec791d,
    codeExecution(code,codeStates)
    }
  }
  const handleChange = async(e: any) => {
    let validate:any;
    setError('');
    setValidate((pre:any)=>({...pre,viewCodeTypes_v1:{...pre?.viewCodeTypes_v1,description:undefined}}));
    if(dynamicStateandType.type=="number"){
    setcode_type_informationc1162((prev: any) => ({ ...prev, description: +e?.target?.value }));
    }
    else{
    setcode_type_informationc1162((prev: any) => ({ ...prev, description: e?.target?.value }));
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
  if (description5291c?.isHidden) {
    return <></>
  }
return (
  <div 
  style={{gridColumn: `7 / 25`,gridRow: `1 / 15`, gap:``, height: `100%`}} >
    <TextArea
      require={isRequredData}
      className=""
      onFocus={handleFocus}
      onChange={handleChange}
      onBlur={handleBlur}
      disabled= {description5291c?.isDisabled ? true : false}
      placeholder = {'Enter Description'}
      contentAlign={"left"}
      headerPosition='top'
      headerText="Description"
      pin = {'brick-brick'}
      value = { code_type_informationc1162?.description != null && typeof code_type_informationc1162?.description =='object' ? Object.keys(code_type_informationc1162?.description)?.length ?  JSON.stringify(code_type_informationc1162?.description,null ,2):"" : code_type_informationc1162?.description||""}
      errorMessage={error}
      validationState={validate?.viewCodeTypes_v1?.description ? "invalid" : undefined}
    />
  </div>
  )
}

export default TextAreadescription
