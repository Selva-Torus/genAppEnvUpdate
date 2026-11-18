
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


const TextAreadecision_comment = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
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
  const [dynamicStateandType,setDynamicStateandType]=useState<any>({name:'decision_comment',type:"string"})
  const [allCode,setAllCode] = useState<string>("")
  const toast : Function = useInfoMsg()
  const routes : AppRouterInstance = useRouter()
  const [error, setError] = useState<string>('');
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  let schemaArray :string[] =[];
  schemaArray = [] ;
 /////////////
   //another screen
  const {cert_stage_groupf8b90, setcert_stage_groupf8b90}= useContext(TotalContext) as TotalContextProps;
  const {cert_stage_groupf8b90Props, setcert_stage_groupf8b90Props}= useContext(TotalContext) as TotalContextProps;
  const {asset_group173fd, setasset_group173fd}= useContext(TotalContext) as TotalContextProps;
  const {asset_group173fdProps, setasset_group173fdProps}= useContext(TotalContext) as TotalContextProps;
  const {stage_group_10fb7d, setstage_group_10fb7d}= useContext(TotalContext) as TotalContextProps;
  const {stage_group_10fb7dProps, setstage_group_10fb7dProps}= useContext(TotalContext) as TotalContextProps;
  const {stage_group_24dcf0, setstage_group_24dcf0}= useContext(TotalContext) as TotalContextProps;
  const {stage_group_24dcf0Props, setstage_group_24dcf0Props}= useContext(TotalContext) as TotalContextProps;
  const {certification_stage_configure_txtcf368, setcertification_stage_configure_txtcf368}= useContext(TotalContext) as TotalContextProps;
  const {due_onff8bd, setdue_onff8bd}= useContext(TotalContext) as TotalContextProps;
  const {evidence_counteb603, setevidence_counteb603}= useContext(TotalContext) as TotalContextProps;
  const {is_active65ee3, setis_active65ee3}= useContext(TotalContext) as TotalContextProps;
  const {decision_comment4dd53, setdecision_comment4dd53}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
    try{
      const orchestrationData:any = getControlOrchestrationData(
        controlData,
        "ae3afa36801148598004a9647364dcf0",
        "cc7ff33360214efcb6fddcff00c4dd53"
      );
      if(Array.isArray(orchestrationData?.data?.schemaData?.at(0)?.schema)){
        let allSchemas:any[]=orchestrationData?.data?.schemaData?.at(0)?.schema||[]
        let type:any={name:'decision_comment',type:'text'}
        allSchemas.map((item:any)=>{
          if(item.name=='decision_comment')
          {
            type=item
  
          }
        })
        setDynamicStateandType(type)       
      }
      if(orchestrationData?.data?.schemaData?.at(0).schema.responses["200"].content["application/json"].schema.items.properties){
        let type:any={name:'decision_comment',type:'text'}
        type={
          name:'decision_comment',
          type: orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.decision_comment.type == 'string' ? 'text' : orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.decision_comment.type =='integer' ? 'number' : orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.decision_comment.type
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
  },[decision_comment4dd53?.refresh])
  
  useEffect(()=>{
    if (prevRefreshRef.current) {
      setstage_group_24dcf0((pre:any)=>({...pre,decision_comment:""}))
    }else 
      prevRefreshRef.current= true
  },[decision_comment4dd53?.refresh])

  const stage_group_24dcf0Ref = useRef<any>(stage_group_24dcf0);
  useEffect(() => { stage_group_24dcf0Ref.current = stage_group_24dcf0; }, [stage_group_24dcf0]);
  useEffect(()=>{
      handleMapperValue();
    if(validateRefetch.init!=0)
      handleValidate();
    const handlerChange = (id:any) => {
      if (id === "cc7ff33360214efcb6fddcff00c4dd53") {
        handleChange({target:{value:stage_group_24dcf0Ref?.current?.decision_comment||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "cc7ff33360214efcb6fddcff00c4dd53") {
        handleBlur({target:{value:stage_group_24dcf0Ref?.current?.decision_comment||""}});
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
        codeStates['cert_stage_group'] = cert_stage_groupf8b90,
        codeStates['setcert_stage_group'] = setcert_stage_groupf8b90,
        codeStates['cert_stage_groupf8b90'] = cert_stage_groupf8b90Props,
        codeStates['setcert_stage_groupf8b90'] = setcert_stage_groupf8b90Props,
        codeStates['asset_group'] = asset_group173fd,
        codeStates['setasset_group'] = setasset_group173fd,
        codeStates['asset_group173fd'] = asset_group173fdProps,
        codeStates['setasset_group173fd'] = setasset_group173fdProps,
        codeStates['stage_group_1'] = stage_group_10fb7d,
        codeStates['setstage_group_1'] = setstage_group_10fb7d,
        codeStates['stage_group_10fb7d'] = stage_group_10fb7dProps,
        codeStates['setstage_group_10fb7d'] = setstage_group_10fb7dProps,
        codeStates['stage_group_2'] = stage_group_24dcf0,
        codeStates['setstage_group_2'] = setstage_group_24dcf0,
        codeStates['stage_group_24dcf0'] = stage_group_24dcf0Props,
        codeStates['setstage_group_24dcf0'] = setstage_group_24dcf0Props,
        codeStates['certification_stage_configure_txt'] = certification_stage_configure_txtcf368,
        codeStates['setcertification_stage_configure_txt'] = setcertification_stage_configure_txtcf368,
        codeStates['due_on'] = due_onff8bd,
        codeStates['setdue_on'] = setdue_onff8bd,
        codeStates['evidence_count'] = evidence_counteb603,
        codeStates['setevidence_count'] = setevidence_counteb603,
        codeStates['is_active'] = is_active65ee3,
        codeStates['setis_active'] = setis_active65ee3,
        codeStates['decision_comment'] = decision_comment4dd53,
        codeStates['setdecision_comment'] = setdecision_comment4dd53,
    codeExecution(code,codeStates)
    }
  }
  const handleChange = async(e: any) => {
    let validate:any;
    setError('');
    setValidate((pre:any)=>({...pre,editCertificationStages_v1:{...pre?.editCertificationStages_v1,decision_comment:undefined}}));
    if(dynamicStateandType.type=="number"){
    setstage_group_24dcf0((prev: any) => ({ ...prev, decision_comment: +e?.target?.value }));
    }
    else{
    setstage_group_24dcf0((prev: any) => ({ ...prev, decision_comment: e?.target?.value }));
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
  if (decision_comment4dd53?.isHidden) {
    return <></>
  }
return (
  <div 
  style={{gridColumn: `1 / 25`,gridRow: `23 / 46`, gap:``, height: `100%`}} >
    <TextArea
      require={isRequredData}
      className=""
      onFocus={handleFocus}
      onChange={handleChange}
      onBlur={handleBlur}
      disabled={ true }
      readOnly={ true }
      placeholder = {'type here...'}
      contentAlign={"left"}
      headerPosition='top'
      headerText="Decision Comment"
      pin = {'brick-brick'}
      value = { stage_group_24dcf0?.decision_comment != null && typeof stage_group_24dcf0?.decision_comment =='object' ? Object.keys(stage_group_24dcf0?.decision_comment)?.length ?  JSON.stringify(stage_group_24dcf0?.decision_comment,null ,2):"" : stage_group_24dcf0?.decision_comment||""}
      errorMessage={error}
      validationState={validate?.editCertificationStages_v1?.decision_comment ? "invalid" : undefined}
    />
  </div>
  )
}

export default TextAreadecision_comment
