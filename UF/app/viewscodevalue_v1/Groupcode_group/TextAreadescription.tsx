
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
  const {code_value_group30fa3, setcode_value_group30fa3}= useContext(TotalContext) as TotalContextProps;
  const {code_value_group30fa3Props, setcode_value_group30fa3Props}= useContext(TotalContext) as TotalContextProps;
  const {code_group871cc, setcode_group871cc}= useContext(TotalContext) as TotalContextProps;
  const {code_group871ccProps, setcode_group871ccProps}= useContext(TotalContext) as TotalContextProps;
  const {code_details_text07751, setcode_details_text07751}= useContext(TotalContext) as TotalContextProps;
  const {code_type66261, setcode_type66261}= useContext(TotalContext) as TotalContextProps;
  const {code_text147d3, setcode_text147d3}= useContext(TotalContext) as TotalContextProps;
  const {display_name84e42, setdisplay_name84e42}= useContext(TotalContext) as TotalContextProps;
  const {set_orderef6e6, setset_orderef6e6}= useContext(TotalContext) as TotalContextProps;
  const {description7448f, setdescription7448f}= useContext(TotalContext) as TotalContextProps;
  const {code_value_config_groupa4a28, setcode_value_config_groupa4a28}= useContext(TotalContext) as TotalContextProps;
  const {code_value_config_groupa4a28Props, setcode_value_config_groupa4a28Props}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
    try{
      const orchestrationData:any = getControlOrchestrationData(
        controlData,
        "4818b1f7f67a7a0fc7b50cb6893871cc",
        "dcb483b62f88cec67d4773ddc667448f"
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
  },[description7448f?.refresh])
  
  useEffect(()=>{
    if (prevRefreshRef.current) {
      setcode_group871cc((pre:any)=>({...pre,description:""}))
    }else 
      prevRefreshRef.current= true
  },[description7448f?.refresh])

  const code_group871ccRef = useRef<any>(code_group871cc);
  useEffect(() => { code_group871ccRef.current = code_group871cc; }, [code_group871cc]);
  useEffect(()=>{
      handleMapperValue();
    if(validateRefetch.init!=0)
      handleValidate();
    const handlerChange = (id:any) => {
      if (id === "dcb483b62f88cec67d4773ddc667448f") {
        handleChange({target:{value:code_group871ccRef?.current?.description||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "dcb483b62f88cec67d4773ddc667448f") {
        handleBlur({target:{value:code_group871ccRef?.current?.description||""}});
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
        codeStates['code_value_group'] = code_value_group30fa3,
        codeStates['setcode_value_group'] = setcode_value_group30fa3,
        codeStates['code_value_group30fa3'] = code_value_group30fa3Props,
        codeStates['setcode_value_group30fa3'] = setcode_value_group30fa3Props,
        codeStates['code_group'] = code_group871cc,
        codeStates['setcode_group'] = setcode_group871cc,
        codeStates['code_group871cc'] = code_group871ccProps,
        codeStates['setcode_group871cc'] = setcode_group871ccProps,
        codeStates['code_details_text'] = code_details_text07751,
        codeStates['setcode_details_text'] = setcode_details_text07751,
        codeStates['code_type'] = code_type66261,
        codeStates['setcode_type'] = setcode_type66261,
        codeStates['code_text'] = code_text147d3,
        codeStates['setcode_text'] = setcode_text147d3,
        codeStates['display_name'] = display_name84e42,
        codeStates['setdisplay_name'] = setdisplay_name84e42,
        codeStates['set_order'] = set_orderef6e6,
        codeStates['setset_order'] = setset_orderef6e6,
        codeStates['description'] = description7448f,
        codeStates['setdescription'] = setdescription7448f,
        codeStates['code_value_config_group'] = code_value_config_groupa4a28,
        codeStates['setcode_value_config_group'] = setcode_value_config_groupa4a28,
        codeStates['code_value_config_groupa4a28'] = code_value_config_groupa4a28Props,
        codeStates['setcode_value_config_groupa4a28'] = setcode_value_config_groupa4a28Props,
    codeExecution(code,codeStates)
    }
  }
  const handleChange = async(e: any) => {
    let validate:any;
    setError('');
    setValidate((pre:any)=>({...pre,viewsCodeValue_v1:{...pre?.viewsCodeValue_v1,description:undefined}}));
    if(dynamicStateandType.type=="number"){
    setcode_group871cc((prev: any) => ({ ...prev, description: +e?.target?.value }));
    }
    else{
    setcode_group871cc((prev: any) => ({ ...prev, description: e?.target?.value }));
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
  if (description7448f?.isHidden) {
    return <></>
  }
return (
  <div 
  style={{gridColumn: `1 / 25`,gridRow: `41 / 58`, gap:``, height: `100%`}} >
    <TextArea
      require={isRequredData}
      className=""
      onFocus={handleFocus}
      onChange={handleChange}
      onBlur={handleBlur}
      disabled= {description7448f?.isDisabled ? true : false}
      placeholder = {'type here...'}
      contentAlign={"left"}
      headerPosition='top'
      headerText="Description"
      pin = {'brick-brick'}
      value = { code_group871cc?.description != null && typeof code_group871cc?.description =='object' ? Object.keys(code_group871cc?.description)?.length ?  JSON.stringify(code_group871cc?.description,null ,2):"" : code_group871cc?.description||""}
      errorMessage={error}
      validationState={validate?.viewsCodeValue_v1?.description ? "invalid" : undefined}
    />
  </div>
  )
}

export default TextAreadescription
