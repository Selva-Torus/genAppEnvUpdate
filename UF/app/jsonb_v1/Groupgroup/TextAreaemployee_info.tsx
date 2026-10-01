
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


const TextAreaemployee_info = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
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
  const [dynamicStateandType,setDynamicStateandType]=useState<any>({name:'employee_info',type:"string"})
  const [allCode,setAllCode] = useState<string>("")
  const toast : Function = useInfoMsg()
  const routes : AppRouterInstance = useRouter()
  const [error, setError] = useState<string>('');
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  let schemaArray :string[] =[];
  schemaArray = [] ;
 /////////////
   //another screen
  const {group90e92, setgroup90e92}= useContext(TotalContext) as TotalContextProps;
  const {group90e92Props, setgroup90e92Props}= useContext(TotalContext) as TotalContextProps;
  const {jsonb_textb0818, setjsonb_textb0818}= useContext(TotalContext) as TotalContextProps;
  const {employee_name9e7d9, setemployee_name9e7d9}= useContext(TotalContext) as TotalContextProps;
  const {employee_infoa1b53, setemployee_infoa1b53}= useContext(TotalContext) as TotalContextProps;
  const {jsoneditor0b2fe, setjsoneditor0b2fe}= useContext(TotalContext) as TotalContextProps;
  const {savee80dc, setsavee80dc}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
    try{
      const orchestrationData:any = getControlOrchestrationData(
        controlData,
        "0595ac1cc4fa407eb6916db9fb790e92",
        "761ac1e99e554a66bc890b48311a1b53"
      );
      if(Array.isArray(orchestrationData?.data?.schemaData?.at(0)?.schema)){
        let allSchemas:any[]=orchestrationData?.data?.schemaData?.at(0)?.schema||[]
        let type:any={name:'employee_info',type:'text'}
        allSchemas.map((item:any)=>{
          if(item.name=='employee_info')
          {
            type=item
  
          }
        })
        setDynamicStateandType(type)       
      }
      if(orchestrationData?.data?.schemaData?.at(0).schema.responses["200"].content["application/json"].schema.items.properties){
        let type:any={name:'employee_info',type:'text'}
        type={
          name:'employee_info',
          type: orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.employee_info.type == 'string' ? 'text' : orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.employee_info.type =='integer' ? 'number' : orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.employee_info.type
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
  },[employee_infoa1b53?.refresh])
  
  useEffect(()=>{
    if (prevRefreshRef.current) {
      setgroup90e92((pre:any)=>({...pre,employee_info:""}))
    }else 
      prevRefreshRef.current= true
  },[employee_infoa1b53?.refresh])

  const group90e92Ref = useRef<any>(group90e92);
  useEffect(() => { group90e92Ref.current = group90e92; }, [group90e92]);
  useEffect(()=>{
      handleMapperValue();
    if(validateRefetch.init!=0)
      handleValidate();
    const handlerChange = (id:any) => {
      if (id === "761ac1e99e554a66bc890b48311a1b53") {
        handleChange({target:{value:group90e92Ref?.current?.employee_info||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "761ac1e99e554a66bc890b48311a1b53") {
        handleBlur({target:{value:group90e92Ref?.current?.employee_info||""}});
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
        codeStates['group'] = group90e92,
        codeStates['setgroup'] = setgroup90e92,
        codeStates['group90e92'] = group90e92Props,
        codeStates['setgroup90e92'] = setgroup90e92Props,
        codeStates['jsonb_text'] = jsonb_textb0818,
        codeStates['setjsonb_text'] = setjsonb_textb0818,
        codeStates['employee_name'] = employee_name9e7d9,
        codeStates['setemployee_name'] = setemployee_name9e7d9,
        codeStates['employee_info'] = employee_infoa1b53,
        codeStates['setemployee_info'] = setemployee_infoa1b53,
        codeStates['jsoneditor'] = jsoneditor0b2fe,
        codeStates['setjsoneditor'] = setjsoneditor0b2fe,
        codeStates['save'] = savee80dc,
        codeStates['setsave'] = setsavee80dc,
    codeExecution(code,codeStates)
    }
  }
  const handleChange = async(e: any) => {
    let validate:any;
    setError('');
    setValidate((pre:any)=>({...pre,Jsonb_v1:{...pre?.Jsonb_v1,employee_info:undefined}}));
    if(dynamicStateandType.type=="number"){
    setgroup90e92((prev: any) => ({ ...prev, employee_info: +e?.target?.value }));
    }
    else{
    setgroup90e92((prev: any) => ({ ...prev, employee_info: e?.target?.value }));
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
  if (employee_infoa1b53?.isHidden) {
    return <></>
  }
return (
  <div 
  style={{gridColumn: `5 / 12`,gridRow: `57 / 111`, gap:``, height: `100%`}} >
    <TextArea
      require={isRequredData}
      className=""
      onFocus={handleFocus}
      onChange={handleChange}
      onBlur={handleBlur}
      disabled= {employee_infoa1b53?.isDisabled ? true : false}
      placeholder = {'type here...'}
      contentAlign={"left"}
      headerPosition='top'
      headerText="Employee Info"
      pin = {'brick-brick'}
      value = { group90e92?.employee_info != null && typeof group90e92?.employee_info =='object' ? Object.keys(group90e92?.employee_info)?.length ?  JSON.stringify(group90e92?.employee_info,null ,2):"" : group90e92?.employee_info||""}
      errorMessage={error}
      validationState={validate?.Jsonb_v1?.employee_info ? "invalid" : undefined}
    />
  </div>
  )
}

export default TextAreaemployee_info
