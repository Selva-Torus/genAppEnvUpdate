
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
  const {info_group95877, setinfo_group95877}= useContext(TotalContext) as TotalContextProps;
  const {info_group95877Props, setinfo_group95877Props}= useContext(TotalContext) as TotalContextProps;
  const {group76151, setgroup76151}= useContext(TotalContext) as TotalContextProps;
  const {group76151Props, setgroup76151Props}= useContext(TotalContext) as TotalContextProps;
  const {info_rule989a5, setinfo_rule989a5}= useContext(TotalContext) as TotalContextProps;
  const {rule_code50f07, setrule_code50f07}= useContext(TotalContext) as TotalContextProps;
  const {rule_namefa062, setrule_namefa062}= useContext(TotalContext) as TotalContextProps;
  const {result_tier_dropa260b, setresult_tier_dropa260b}= useContext(TotalContext) as TotalContextProps;
  const {match_mode2079e, setmatch_mode2079e}= useContext(TotalContext) as TotalContextProps;
  const {descriptionbacec, setdescriptionbacec}= useContext(TotalContext) as TotalContextProps;
  const {rule_config_groupb9eb4, setrule_config_groupb9eb4}= useContext(TotalContext) as TotalContextProps;
  const {rule_config_groupb9eb4Props, setrule_config_groupb9eb4Props}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
    try{
      const orchestrationData:any = getControlOrchestrationData(
        controlData,
        "25957f8c4d643e280d850a0270a76151",
        "381f45c931b2523db24ae63a0c7bacec"
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
  },[descriptionbacec?.refresh])
  
  useEffect(()=>{
    if (prevRefreshRef.current) {
      setgroup76151((pre:any)=>({...pre,description:""}))
    }else 
      prevRefreshRef.current= true
  },[descriptionbacec?.refresh])

  const group76151Ref = useRef<any>(group76151);
  useEffect(() => { group76151Ref.current = group76151; }, [group76151]);
  useEffect(()=>{
      handleMapperValue();
    if(validateRefetch.init!=0)
      handleValidate();
    const handlerChange = (id:any) => {
      if (id === "381f45c931b2523db24ae63a0c7bacec") {
        handleChange({target:{value:group76151Ref?.current?.description||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "381f45c931b2523db24ae63a0c7bacec") {
        handleBlur({target:{value:group76151Ref?.current?.description||""}});
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
        codeStates['info_group'] = info_group95877,
        codeStates['setinfo_group'] = setinfo_group95877,
        codeStates['info_group95877'] = info_group95877Props,
        codeStates['setinfo_group95877'] = setinfo_group95877Props,
        codeStates['group'] = group76151,
        codeStates['setgroup'] = setgroup76151,
        codeStates['group76151'] = group76151Props,
        codeStates['setgroup76151'] = setgroup76151Props,
        codeStates['info_rule'] = info_rule989a5,
        codeStates['setinfo_rule'] = setinfo_rule989a5,
        codeStates['rule_code'] = rule_code50f07,
        codeStates['setrule_code'] = setrule_code50f07,
        codeStates['rule_name'] = rule_namefa062,
        codeStates['setrule_name'] = setrule_namefa062,
        codeStates['result_tier_drop'] = result_tier_dropa260b,
        codeStates['setresult_tier_drop'] = setresult_tier_dropa260b,
        codeStates['match_mode'] = match_mode2079e,
        codeStates['setmatch_mode'] = setmatch_mode2079e,
        codeStates['description'] = descriptionbacec,
        codeStates['setdescription'] = setdescriptionbacec,
        codeStates['rule_config_group'] = rule_config_groupb9eb4,
        codeStates['setrule_config_group'] = setrule_config_groupb9eb4,
        codeStates['rule_config_groupb9eb4'] = rule_config_groupb9eb4Props,
        codeStates['setrule_config_groupb9eb4'] = setrule_config_groupb9eb4Props,
    codeExecution(code,codeStates)
    }
  }
  const handleChange = async(e: any) => {
    let validate:any;
    setError('');
    setValidate((pre:any)=>({...pre,viewRiskRules_v1:{...pre?.viewRiskRules_v1,description:undefined}}));
    if(dynamicStateandType.type=="number"){
    setgroup76151((prev: any) => ({ ...prev, description: +e?.target?.value }));
    }
    else{
    setgroup76151((prev: any) => ({ ...prev, description: e?.target?.value }));
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
  if (descriptionbacec?.isHidden) {
    return <></>
  }
return (
  <div 
  style={{gridColumn: `1 / 25`,gridRow: `37 / 51`, gap:``, height: `100%`}} >
    <TextArea
      require={isRequredData}
      className=""
      onFocus={handleFocus}
      onChange={handleChange}
      onBlur={handleBlur}
      disabled= {descriptionbacec?.isDisabled ? true : false}
      contentAlign={"left"}
      headerPosition='top'
      headerText="Description"
      pin = {'brick-brick'}
      value = { group76151?.description != null && typeof group76151?.description =='object' ? Object.keys(group76151?.description)?.length ?  JSON.stringify(group76151?.description,null ,2):"" : group76151?.description||""}
      errorMessage={error}
      validationState={validate?.viewRiskRules_v1?.description ? "invalid" : undefined}
    />
  </div>
  )
}

export default TextAreadescription
