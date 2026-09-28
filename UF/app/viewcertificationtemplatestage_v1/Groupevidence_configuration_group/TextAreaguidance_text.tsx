
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
  const {groupcccf9, setgroupcccf9}= useContext(TotalContext) as TotalContextProps;
  const {groupcccf9Props, setgroupcccf9Props}= useContext(TotalContext) as TotalContextProps;
  const {stage_details_groupbaac3, setstage_details_groupbaac3}= useContext(TotalContext) as TotalContextProps;
  const {stage_details_groupbaac3Props, setstage_details_groupbaac3Props}= useContext(TotalContext) as TotalContextProps;
  const {evidence_configuration_group80300, setevidence_configuration_group80300}= useContext(TotalContext) as TotalContextProps;
  const {evidence_configuration_group80300Props, setevidence_configuration_group80300Props}= useContext(TotalContext) as TotalContextProps;
  const {text_26244c, settext_26244c}= useContext(TotalContext) as TotalContextProps;
  const {min_evidence_count7cdda, setmin_evidence_count7cdda}= useContext(TotalContext) as TotalContextProps;
  const {is_mandatory46a07, setis_mandatory46a07}= useContext(TotalContext) as TotalContextProps;
  const {evidence_required45165, setevidence_required45165}= useContext(TotalContext) as TotalContextProps;
  const {guidance_text68090, setguidance_text68090}= useContext(TotalContext) as TotalContextProps;
  const {is_active8fb50, setis_active8fb50}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
    try{
      const orchestrationData:any = getControlOrchestrationData(
        controlData,
        "38bcbfd2b4a541f4ac31288528780300",
        "6667d9f72aaf4cc7ad5be4b402a68090"
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
  },[guidance_text68090?.refresh])
  
  useEffect(()=>{
    if (prevRefreshRef.current) {
      setevidence_configuration_group80300((pre:any)=>({...pre,guidance_text:""}))
    }else 
      prevRefreshRef.current= true
  },[guidance_text68090?.refresh])

  const evidence_configuration_group80300Ref = useRef<any>(evidence_configuration_group80300);
  useEffect(() => { evidence_configuration_group80300Ref.current = evidence_configuration_group80300; }, [evidence_configuration_group80300]);
  useEffect(()=>{
      handleMapperValue();
    if(validateRefetch.init!=0)
      handleValidate();
    const handlerChange = (id:any) => {
      if (id === "6667d9f72aaf4cc7ad5be4b402a68090") {
        handleChange({target:{value:evidence_configuration_group80300Ref?.current?.guidance_text||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "6667d9f72aaf4cc7ad5be4b402a68090") {
        handleBlur({target:{value:evidence_configuration_group80300Ref?.current?.guidance_text||""}});
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
        codeStates['group'] = groupcccf9,
        codeStates['setgroup'] = setgroupcccf9,
        codeStates['groupcccf9'] = groupcccf9Props,
        codeStates['setgroupcccf9'] = setgroupcccf9Props,
        codeStates['stage_details_group'] = stage_details_groupbaac3,
        codeStates['setstage_details_group'] = setstage_details_groupbaac3,
        codeStates['stage_details_groupbaac3'] = stage_details_groupbaac3Props,
        codeStates['setstage_details_groupbaac3'] = setstage_details_groupbaac3Props,
        codeStates['evidence_configuration_group'] = evidence_configuration_group80300,
        codeStates['setevidence_configuration_group'] = setevidence_configuration_group80300,
        codeStates['evidence_configuration_group80300'] = evidence_configuration_group80300Props,
        codeStates['setevidence_configuration_group80300'] = setevidence_configuration_group80300Props,
        codeStates['text_2'] = text_26244c,
        codeStates['settext_2'] = settext_26244c,
        codeStates['min_evidence_count'] = min_evidence_count7cdda,
        codeStates['setmin_evidence_count'] = setmin_evidence_count7cdda,
        codeStates['is_mandatory'] = is_mandatory46a07,
        codeStates['setis_mandatory'] = setis_mandatory46a07,
        codeStates['evidence_required'] = evidence_required45165,
        codeStates['setevidence_required'] = setevidence_required45165,
        codeStates['guidance_text'] = guidance_text68090,
        codeStates['setguidance_text'] = setguidance_text68090,
        codeStates['is_active'] = is_active8fb50,
        codeStates['setis_active'] = setis_active8fb50,
    codeExecution(code,codeStates)
    }
  }
  const handleChange = async(e: any) => {
    let validate:any;
    setError('');
    setValidate((pre:any)=>({...pre,viewCertificationTemplateStage_v1:{...pre?.viewCertificationTemplateStage_v1,guidance_text:undefined}}));
    if(dynamicStateandType.type=="number"){
    setevidence_configuration_group80300((prev: any) => ({ ...prev, guidance_text: +e?.target?.value }));
    }
    else{
    setevidence_configuration_group80300((prev: any) => ({ ...prev, guidance_text: e?.target?.value }));
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
  if (guidance_text68090?.isHidden) {
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
      disabled= {guidance_text68090?.isDisabled ? true : false}
      placeholder = {' Enter here...'}
      contentAlign={"left"}
      headerPosition='top'
      headerText="Guidance Text"
      pin = {'brick-brick'}
      value = { evidence_configuration_group80300?.guidance_text != null && typeof evidence_configuration_group80300?.guidance_text =='object' ? Object.keys(evidence_configuration_group80300?.guidance_text)?.length ?  JSON.stringify(evidence_configuration_group80300?.guidance_text,null ,2):"" : evidence_configuration_group80300?.guidance_text||""}
      errorMessage={error}
      validationState={validate?.viewCertificationTemplateStage_v1?.guidance_text ? "invalid" : undefined}
    />
  </div>
  )
}

export default TextAreaguidance_text
