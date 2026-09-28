
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


const TextAreanotes = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
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
  const [dynamicStateandType,setDynamicStateandType]=useState<any>({name:'notes',type:"string"})
  const [allCode,setAllCode] = useState<string>("")
  const toast : Function = useInfoMsg()
  const routes : AppRouterInstance = useRouter()
  const [error, setError] = useState<string>('');
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  let schemaArray :string[] =[];
  schemaArray = [] ;
 /////////////
   //another screen
  const {overall_ai_asset_registryb99cd, setoverall_ai_asset_registryb99cd}= useContext(TotalContext) as TotalContextProps;
  const {overall_ai_asset_registryb99cdProps, setoverall_ai_asset_registryb99cdProps}= useContext(TotalContext) as TotalContextProps;
  const {register_ai_asset_group01907, setregister_ai_asset_group01907}= useContext(TotalContext) as TotalContextProps;
  const {register_ai_asset_group01907Props, setregister_ai_asset_group01907Props}= useContext(TotalContext) as TotalContextProps;
  const {asset_identity_groupfe421, setasset_identity_groupfe421}= useContext(TotalContext) as TotalContextProps;
  const {asset_identity_groupfe421Props, setasset_identity_groupfe421Props}= useContext(TotalContext) as TotalContextProps;
  const {data_classification_text0dc1f, setdata_classification_text0dc1f}= useContext(TotalContext) as TotalContextProps;
  const {asset_name44531, setasset_name44531}= useContext(TotalContext) as TotalContextProps;
  const {data_class_codeaacea, setdata_class_codeaacea}= useContext(TotalContext) as TotalContextProps;
  const {is_primary29d9f, setis_primary29d9f}= useContext(TotalContext) as TotalContextProps;
  const {notes7f668, setnotes7f668}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions92938, setdynamicactions92938}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions92938Props, setdynamicactions92938Props}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
    try{
      const orchestrationData:any = getControlOrchestrationData(
        controlData,
        "c78dbda872d202ccc1f17844800fe421",
        "a5c7fcf08d5a3af45c0907e3c487f668"
      );
      if(Array.isArray(orchestrationData?.data?.schemaData?.at(0)?.schema)){
        let allSchemas:any[]=orchestrationData?.data?.schemaData?.at(0)?.schema||[]
        let type:any={name:'notes',type:'text'}
        allSchemas.map((item:any)=>{
          if(item.name=='notes')
          {
            type=item
  
          }
        })
        setDynamicStateandType(type)       
      }
      if(orchestrationData?.data?.schemaData?.at(0).schema.responses["200"].content["application/json"].schema.items.properties){
        let type:any={name:'notes',type:'text'}
        type={
          name:'notes',
          type: orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.notes.type == 'string' ? 'text' : orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.notes.type =='integer' ? 'number' : orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.notes.type
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
  },[notes7f668?.refresh])
  
  useEffect(()=>{
    if (prevRefreshRef.current) {
      setasset_identity_groupfe421((pre:any)=>({...pre,notes:""}))
    }else 
      prevRefreshRef.current= true
  },[notes7f668?.refresh])

  const asset_identity_groupfe421Ref = useRef<any>(asset_identity_groupfe421);
  useEffect(() => { asset_identity_groupfe421Ref.current = asset_identity_groupfe421; }, [asset_identity_groupfe421]);
  useEffect(()=>{
      handleMapperValue();
    if(validateRefetch.init!=0)
      handleValidate();
    const handlerChange = (id:any) => {
      if (id === "a5c7fcf08d5a3af45c0907e3c487f668") {
        handleChange({target:{value:asset_identity_groupfe421Ref?.current?.notes||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "a5c7fcf08d5a3af45c0907e3c487f668") {
        handleBlur({target:{value:asset_identity_groupfe421Ref?.current?.notes||""}});
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
        codeStates['overall_ai_asset_registry'] = overall_ai_asset_registryb99cd,
        codeStates['setoverall_ai_asset_registry'] = setoverall_ai_asset_registryb99cd,
        codeStates['overall_ai_asset_registryb99cd'] = overall_ai_asset_registryb99cdProps,
        codeStates['setoverall_ai_asset_registryb99cd'] = setoverall_ai_asset_registryb99cdProps,
        codeStates['register_ai_asset_group'] = register_ai_asset_group01907,
        codeStates['setregister_ai_asset_group'] = setregister_ai_asset_group01907,
        codeStates['register_ai_asset_group01907'] = register_ai_asset_group01907Props,
        codeStates['setregister_ai_asset_group01907'] = setregister_ai_asset_group01907Props,
        codeStates['asset_identity_group'] = asset_identity_groupfe421,
        codeStates['setasset_identity_group'] = setasset_identity_groupfe421,
        codeStates['asset_identity_groupfe421'] = asset_identity_groupfe421Props,
        codeStates['setasset_identity_groupfe421'] = setasset_identity_groupfe421Props,
        codeStates['data_classification_text'] = data_classification_text0dc1f,
        codeStates['setdata_classification_text'] = setdata_classification_text0dc1f,
        codeStates['asset_name'] = asset_name44531,
        codeStates['setasset_name'] = setasset_name44531,
        codeStates['data_class_code'] = data_class_codeaacea,
        codeStates['setdata_class_code'] = setdata_class_codeaacea,
        codeStates['is_primary'] = is_primary29d9f,
        codeStates['setis_primary'] = setis_primary29d9f,
        codeStates['notes'] = notes7f668,
        codeStates['setnotes'] = setnotes7f668,
        codeStates['dynamicactions'] = dynamicactions92938,
        codeStates['setdynamicactions'] = setdynamicactions92938,
        codeStates['dynamicactions92938'] = dynamicactions92938Props,
        codeStates['setdynamicactions92938'] = setdynamicactions92938Props,
    codeExecution(code,codeStates)
    }
  }
  const handleChange = async(e: any) => {
    let validate:any;
    setError('');
    setValidate((pre:any)=>({...pre,AIDataClass_v1:{...pre?.AIDataClass_v1,notes:undefined}}));
    if(dynamicStateandType.type=="number"){
    setasset_identity_groupfe421((prev: any) => ({ ...prev, notes: +e?.target?.value }));
    }
    else{
    setasset_identity_groupfe421((prev: any) => ({ ...prev, notes: e?.target?.value }));
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
  if (notes7f668?.isHidden) {
    return <></>
  }
return (
  <div 
  style={{gridColumn: `1 / 25`,gridRow: `27 / 44`, gap:``, height: `100%`}} >
    <TextArea
      require={isRequredData}
      className=""
      onFocus={handleFocus}
      onChange={handleChange}
      onBlur={handleBlur}
      disabled= {notes7f668?.isDisabled ? true : false}
      placeholder = {'type here...'}
      contentAlign={"left"}
      headerPosition='top'
      headerText="Notes"
      pin = {'brick-brick'}
      value = { asset_identity_groupfe421?.notes != null && typeof asset_identity_groupfe421?.notes =='object' ? Object.keys(asset_identity_groupfe421?.notes)?.length ?  JSON.stringify(asset_identity_groupfe421?.notes,null ,2):"" : asset_identity_groupfe421?.notes||""}
      errorMessage={error}
      validationState={validate?.AIDataClass_v1?.notes ? "invalid" : undefined}
    />
  </div>
  )
}

export default TextAreanotes
