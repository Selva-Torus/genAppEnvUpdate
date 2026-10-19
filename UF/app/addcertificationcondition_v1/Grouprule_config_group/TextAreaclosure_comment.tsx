
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


const TextAreaclosure_comment = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
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
  const [dynamicStateandType,setDynamicStateandType]=useState<any>({name:'closure_comment',type:"string"})
  const [allCode,setAllCode] = useState<string>("")
  const toast : Function = useInfoMsg()
  const routes : AppRouterInstance = useRouter()
  const [error, setError] = useState<string>('');
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  let schemaArray :string[] =[];
  schemaArray = [] ;
 /////////////
   //another screen
  const {info_groupcb42f, setinfo_groupcb42f}= useContext(TotalContext) as TotalContextProps;
  const {info_groupcb42fProps, setinfo_groupcb42fProps}= useContext(TotalContext) as TotalContextProps;
  const {group85ee1, setgroup85ee1}= useContext(TotalContext) as TotalContextProps;
  const {group85ee1Props, setgroup85ee1Props}= useContext(TotalContext) as TotalContextProps;
  const {rule_config_groupa2b93, setrule_config_groupa2b93}= useContext(TotalContext) as TotalContextProps;
  const {rule_config_groupa2b93Props, setrule_config_groupa2b93Props}= useContext(TotalContext) as TotalContextProps;
  const {info_rule54cff, setinfo_rule54cff}= useContext(TotalContext) as TotalContextProps;
  const {due_date7d947, setdue_date7d947}= useContext(TotalContext) as TotalContextProps;
  const {closed_on4d979, setclosed_on4d979}= useContext(TotalContext) as TotalContextProps;
  const {is_active1ad4d, setis_active1ad4d}= useContext(TotalContext) as TotalContextProps;
  const {closure_comment3d878, setclosure_comment3d878}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsbe417, setdynamicactionsbe417}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsbe417Props, setdynamicactionsbe417Props}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
    try{
      const orchestrationData:any = getControlOrchestrationData(
        controlData,
        "64d64b79fce6405ba8fb78fb832a2b93",
        "30bc7d8923114f4791300a6e6453d878"
      );
      if(Array.isArray(orchestrationData?.data?.schemaData?.at(0)?.schema)){
        let allSchemas:any[]=orchestrationData?.data?.schemaData?.at(0)?.schema||[]
        let type:any={name:'closure_comment',type:'text'}
        allSchemas.map((item:any)=>{
          if(item.name=='closure_comment')
          {
            type=item
  
          }
        })
        setDynamicStateandType(type)       
      }
      if(orchestrationData?.data?.schemaData?.at(0).schema.responses["200"].content["application/json"].schema.items.properties){
        let type:any={name:'closure_comment',type:'text'}
        type={
          name:'closure_comment',
          type: orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.closure_comment.type == 'string' ? 'text' : orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.closure_comment.type =='integer' ? 'number' : orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.closure_comment.type
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
  },[closure_comment3d878?.refresh])
  
  useEffect(()=>{
    if (prevRefreshRef.current) {
      setrule_config_groupa2b93((pre:any)=>({...pre,closure_comment:""}))
    }else 
      prevRefreshRef.current= true
  },[closure_comment3d878?.refresh])

  const rule_config_groupa2b93Ref = useRef<any>(rule_config_groupa2b93);
  useEffect(() => { rule_config_groupa2b93Ref.current = rule_config_groupa2b93; }, [rule_config_groupa2b93]);
  useEffect(()=>{
      handleMapperValue();
    if(validateRefetch.init!=0)
      handleValidate();
    const handlerChange = (id:any) => {
      if (id === "30bc7d8923114f4791300a6e6453d878") {
        handleChange({target:{value:rule_config_groupa2b93Ref?.current?.closure_comment||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "30bc7d8923114f4791300a6e6453d878") {
        handleBlur({target:{value:rule_config_groupa2b93Ref?.current?.closure_comment||""}});
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
        codeStates['info_group'] = info_groupcb42f,
        codeStates['setinfo_group'] = setinfo_groupcb42f,
        codeStates['info_groupcb42f'] = info_groupcb42fProps,
        codeStates['setinfo_groupcb42f'] = setinfo_groupcb42fProps,
        codeStates['group'] = group85ee1,
        codeStates['setgroup'] = setgroup85ee1,
        codeStates['group85ee1'] = group85ee1Props,
        codeStates['setgroup85ee1'] = setgroup85ee1Props,
        codeStates['rule_config_group'] = rule_config_groupa2b93,
        codeStates['setrule_config_group'] = setrule_config_groupa2b93,
        codeStates['rule_config_groupa2b93'] = rule_config_groupa2b93Props,
        codeStates['setrule_config_groupa2b93'] = setrule_config_groupa2b93Props,
        codeStates['info_rule'] = info_rule54cff,
        codeStates['setinfo_rule'] = setinfo_rule54cff,
        codeStates['due_date'] = due_date7d947,
        codeStates['setdue_date'] = setdue_date7d947,
        codeStates['closed_on'] = closed_on4d979,
        codeStates['setclosed_on'] = setclosed_on4d979,
        codeStates['is_active'] = is_active1ad4d,
        codeStates['setis_active'] = setis_active1ad4d,
        codeStates['closure_comment'] = closure_comment3d878,
        codeStates['setclosure_comment'] = setclosure_comment3d878,
        codeStates['dynamicactions'] = dynamicactionsbe417,
        codeStates['setdynamicactions'] = setdynamicactionsbe417,
        codeStates['dynamicactionsbe417'] = dynamicactionsbe417Props,
        codeStates['setdynamicactionsbe417'] = setdynamicactionsbe417Props,
    codeExecution(code,codeStates)
    }
  }
  const handleChange = async(e: any) => {
    let validate:any;
    setError('');
    setValidate((pre:any)=>({...pre,addCertificationCondition_v1:{...pre?.addCertificationCondition_v1,closure_comment:undefined}}));
    if(dynamicStateandType.type=="number"){
    setrule_config_groupa2b93((prev: any) => ({ ...prev, closure_comment: +e?.target?.value }));
    }
    else{
    setrule_config_groupa2b93((prev: any) => ({ ...prev, closure_comment: e?.target?.value }));
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
  if (closure_comment3d878?.isHidden) {
    return <></>
  }
return (
  <div 
  style={{gridColumn: `1 / 25`,gridRow: `32 / 54`, gap:``, height: `100%`}} >
    <TextArea
      require={isRequredData}
      className=""
      onFocus={handleFocus}
      onChange={handleChange}
      onBlur={handleBlur}
      disabled= {closure_comment3d878?.isDisabled ? true : false}
      contentAlign={"left"}
      headerPosition='top'
      headerText="Closure comment"
      pin = {'brick-brick'}
      value = { rule_config_groupa2b93?.closure_comment != null && typeof rule_config_groupa2b93?.closure_comment =='object' ? Object.keys(rule_config_groupa2b93?.closure_comment)?.length ?  JSON.stringify(rule_config_groupa2b93?.closure_comment,null ,2):"" : rule_config_groupa2b93?.closure_comment||""}
      errorMessage={error}
      validationState={validate?.addCertificationCondition_v1?.closure_comment ? "invalid" : undefined}
    />
  </div>
  )
}

export default TextAreaclosure_comment
