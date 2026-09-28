
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


const TextAreaguidance_text = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
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
  const [dynamicStateandType,setDynamicStateandType]=useState<any>({name:'guidance_text',type:"string"})
  const [allCode,setAllCode] = useState<string>("")
  const toast : Function = useInfoMsg()
  const routes : AppRouterInstance = useRouter()
  const [error, setError] = useState<string>('');
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  let schemaArray :string[] =[];
  schemaArray = [] ;
 /////////////
   //another screen
  const {group6f5e6, setgroup6f5e6}= useContext(TotalContext) as TotalContextProps;
  const {group6f5e6Props, setgroup6f5e6Props}= useContext(TotalContext) as TotalContextProps;
  const {stage_details_group3cc06, setstage_details_group3cc06}= useContext(TotalContext) as TotalContextProps;
  const {stage_details_group3cc06Props, setstage_details_group3cc06Props}= useContext(TotalContext) as TotalContextProps;
  const {evidence_configuration_group8a0a2, setevidence_configuration_group8a0a2}= useContext(TotalContext) as TotalContextProps;
  const {evidence_configuration_group8a0a2Props, setevidence_configuration_group8a0a2Props}= useContext(TotalContext) as TotalContextProps;
  const {text_2d05b1, settext_2d05b1}= useContext(TotalContext) as TotalContextProps;
  const {min_evidence_count3252a, setmin_evidence_count3252a}= useContext(TotalContext) as TotalContextProps;
  const {is_mandatory05efb, setis_mandatory05efb}= useContext(TotalContext) as TotalContextProps;
  const {evidence_required78dc8, setevidence_required78dc8}= useContext(TotalContext) as TotalContextProps;
  const {guidance_texte8af0, setguidance_texte8af0}= useContext(TotalContext) as TotalContextProps;
  const {is_active49c13, setis_active49c13}= useContext(TotalContext) as TotalContextProps;
  const {dynamicaction218e0, setdynamicaction218e0}= useContext(TotalContext) as TotalContextProps;
  const {dynamicaction218e0Props, setdynamicaction218e0Props}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
    try{
      const orchestrationData:any = getControlOrchestrationData(
        controlData,
        "040cc34ed88145e18757f311ecb8a0a2",
        "1a79eaad6e5d42d0aa5d96394a6e8af0"
      );
      if(Array.isArray(orchestrationData?.data?.schemaData?.at(0)?.schema)){
        let allSchemas:any[]=orchestrationData?.data?.schemaData?.at(0)?.schema||[]
        let type:any={name:'guidance_text',type:'text'}
        allSchemas.map((item:any)=>{
          if(item.name=='guidance_text')
          {
            type=item
  
          }
        })
        setDynamicStateandType(type)       
      }
      if(orchestrationData?.data?.schemaData?.at(0).schema.responses["200"].content["application/json"].schema.items.properties){
        let type:any={name:'guidance_text',type:'text'}
        type={
          name:'guidance_text',
          type: orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.guidance_text.type == 'string' ? 'text' : orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.guidance_text.type =='integer' ? 'number' : orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.guidance_text.type
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
  },[guidance_texte8af0?.refresh])
  
  useEffect(()=>{
    if (prevRefreshRef.current) {
      setevidence_configuration_group8a0a2((pre:any)=>({...pre,guidance_text:""}))
    }else 
      prevRefreshRef.current= true
  },[guidance_texte8af0?.refresh])

  const evidence_configuration_group8a0a2Ref = useRef<any>(evidence_configuration_group8a0a2);
  useEffect(() => { evidence_configuration_group8a0a2Ref.current = evidence_configuration_group8a0a2; }, [evidence_configuration_group8a0a2]);
  useEffect(()=>{
      handleMapperValue();
    if(validateRefetch.init!=0)
      handleValidate();
    const handlerChange = (id:any) => {
      if (id === "1a79eaad6e5d42d0aa5d96394a6e8af0") {
        handleChange({target:{value:evidence_configuration_group8a0a2Ref?.current?.guidance_text||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "1a79eaad6e5d42d0aa5d96394a6e8af0") {
        handleBlur({target:{value:evidence_configuration_group8a0a2Ref?.current?.guidance_text||""}});
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
        codeStates['group'] = group6f5e6,
        codeStates['setgroup'] = setgroup6f5e6,
        codeStates['group6f5e6'] = group6f5e6Props,
        codeStates['setgroup6f5e6'] = setgroup6f5e6Props,
        codeStates['stage_details_group'] = stage_details_group3cc06,
        codeStates['setstage_details_group'] = setstage_details_group3cc06,
        codeStates['stage_details_group3cc06'] = stage_details_group3cc06Props,
        codeStates['setstage_details_group3cc06'] = setstage_details_group3cc06Props,
        codeStates['evidence_configuration_group'] = evidence_configuration_group8a0a2,
        codeStates['setevidence_configuration_group'] = setevidence_configuration_group8a0a2,
        codeStates['evidence_configuration_group8a0a2'] = evidence_configuration_group8a0a2Props,
        codeStates['setevidence_configuration_group8a0a2'] = setevidence_configuration_group8a0a2Props,
        codeStates['text_2'] = text_2d05b1,
        codeStates['settext_2'] = settext_2d05b1,
        codeStates['min_evidence_count'] = min_evidence_count3252a,
        codeStates['setmin_evidence_count'] = setmin_evidence_count3252a,
        codeStates['is_mandatory'] = is_mandatory05efb,
        codeStates['setis_mandatory'] = setis_mandatory05efb,
        codeStates['evidence_required'] = evidence_required78dc8,
        codeStates['setevidence_required'] = setevidence_required78dc8,
        codeStates['guidance_text'] = guidance_texte8af0,
        codeStates['setguidance_text'] = setguidance_texte8af0,
        codeStates['is_active'] = is_active49c13,
        codeStates['setis_active'] = setis_active49c13,
        codeStates['dynamicaction'] = dynamicaction218e0,
        codeStates['setdynamicaction'] = setdynamicaction218e0,
        codeStates['dynamicaction218e0'] = dynamicaction218e0Props,
        codeStates['setdynamicaction218e0'] = setdynamicaction218e0Props,
    codeExecution(code,codeStates)
    }
  }
  const handleChange = async(e: any) => {
    let validate:any;
    setError('');
    setValidate((pre:any)=>({...pre,addCertificationStage_v1:{...pre?.addCertificationStage_v1,guidance_text:undefined}}));
    if(dynamicStateandType.type=="number"){
    setevidence_configuration_group8a0a2((prev: any) => ({ ...prev, guidance_text: +e?.target?.value }));
    }
    else{
    setevidence_configuration_group8a0a2((prev: any) => ({ ...prev, guidance_text: e?.target?.value }));
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
  if (guidance_texte8af0?.isHidden) {
    return <></>
  }
return (
  <div 
  style={{gridColumn: `1 / 16`,gridRow: `37 / 72`, gap:``, height: `100%`}} >
    <TextArea
      require={isRequredData}
      className=""
      onFocus={handleFocus}
      onChange={handleChange}
      onBlur={handleBlur}
      disabled= {guidance_texte8af0?.isDisabled ? true : false}
      placeholder = {' Enter here...'}
      contentAlign={"left"}
      headerPosition='top'
      headerText="Guidance Text"
      pin = {'brick-brick'}
      value = { evidence_configuration_group8a0a2?.guidance_text != null && typeof evidence_configuration_group8a0a2?.guidance_text =='object' ? Object.keys(evidence_configuration_group8a0a2?.guidance_text)?.length ?  JSON.stringify(evidence_configuration_group8a0a2?.guidance_text,null ,2):"" : evidence_configuration_group8a0a2?.guidance_text||""}
      errorMessage={error}
      validationState={validate?.addCertificationStage_v1?.guidance_text ? "invalid" : undefined}
    />
  </div>
  )
}

export default TextAreaguidance_text
