
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
  const {overall_group4e905, setoverall_group4e905}= useContext(TotalContext) as TotalContextProps;
  const {overall_group4e905Props, setoverall_group4e905Props}= useContext(TotalContext) as TotalContextProps;
  const {action_details_group3e7e8, setaction_details_group3e7e8}= useContext(TotalContext) as TotalContextProps;
  const {action_details_group3e7e8Props, setaction_details_group3e7e8Props}= useContext(TotalContext) as TotalContextProps;
  const {action_detail_groupa24ba, setaction_detail_groupa24ba}= useContext(TotalContext) as TotalContextProps;
  const {action_detail_groupa24baProps, setaction_detail_groupa24baProps}= useContext(TotalContext) as TotalContextProps;
  const {risk_conf_groupfa4d5, setrisk_conf_groupfa4d5}= useContext(TotalContext) as TotalContextProps;
  const {risk_conf_groupfa4d5Props, setrisk_conf_groupfa4d5Props}= useContext(TotalContext) as TotalContextProps;
  const {lifecycle_text24825, setlifecycle_text24825}= useContext(TotalContext) as TotalContextProps;
  const {is_critical399c3, setis_critical399c3}= useContext(TotalContext) as TotalContextProps;
  const {is_activee42e8, setis_activee42e8}= useContext(TotalContext) as TotalContextProps;
  const {notesda4d6, setnotesda4d6}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsf9e9a, setdynamicactionsf9e9a}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsf9e9aProps, setdynamicactionsf9e9aProps}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
    try{
      const orchestrationData:any = getControlOrchestrationData(
        controlData,
        "71ca3c8fe31aab16a0eea3e3c5efa4d5",
        "18bc333a38104defa74f742b824da4d6"
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
  },[notesda4d6?.refresh])
  
  useEffect(()=>{
    if (prevRefreshRef.current) {
      setrisk_conf_groupfa4d5((pre:any)=>({...pre,notes:""}))
    }else 
      prevRefreshRef.current= true
  },[notesda4d6?.refresh])

  const risk_conf_groupfa4d5Ref = useRef<any>(risk_conf_groupfa4d5);
  useEffect(() => { risk_conf_groupfa4d5Ref.current = risk_conf_groupfa4d5; }, [risk_conf_groupfa4d5]);
  useEffect(()=>{
      handleMapperValue();
    if(validateRefetch.init!=0)
      handleValidate();
    const handlerChange = (id:any) => {
      if (id === "18bc333a38104defa74f742b824da4d6") {
        handleChange({target:{value:risk_conf_groupfa4d5Ref?.current?.notes||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "18bc333a38104defa74f742b824da4d6") {
        handleBlur({target:{value:risk_conf_groupfa4d5Ref?.current?.notes||""}});
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
        codeStates['overall_group'] = overall_group4e905,
        codeStates['setoverall_group'] = setoverall_group4e905,
        codeStates['overall_group4e905'] = overall_group4e905Props,
        codeStates['setoverall_group4e905'] = setoverall_group4e905Props,
        codeStates['action_details_group'] = action_details_group3e7e8,
        codeStates['setaction_details_group'] = setaction_details_group3e7e8,
        codeStates['action_details_group3e7e8'] = action_details_group3e7e8Props,
        codeStates['setaction_details_group3e7e8'] = setaction_details_group3e7e8Props,
        codeStates['action_detail_group'] = action_detail_groupa24ba,
        codeStates['setaction_detail_group'] = setaction_detail_groupa24ba,
        codeStates['action_detail_groupa24ba'] = action_detail_groupa24baProps,
        codeStates['setaction_detail_groupa24ba'] = setaction_detail_groupa24baProps,
        codeStates['risk_conf_group'] = risk_conf_groupfa4d5,
        codeStates['setrisk_conf_group'] = setrisk_conf_groupfa4d5,
        codeStates['risk_conf_groupfa4d5'] = risk_conf_groupfa4d5Props,
        codeStates['setrisk_conf_groupfa4d5'] = setrisk_conf_groupfa4d5Props,
        codeStates['lifecycle_text'] = lifecycle_text24825,
        codeStates['setlifecycle_text'] = setlifecycle_text24825,
        codeStates['is_critical'] = is_critical399c3,
        codeStates['setis_critical'] = setis_critical399c3,
        codeStates['is_active'] = is_activee42e8,
        codeStates['setis_active'] = setis_activee42e8,
        codeStates['notes'] = notesda4d6,
        codeStates['setnotes'] = setnotesda4d6,
        codeStates['dynamicactions'] = dynamicactionsf9e9a,
        codeStates['setdynamicactions'] = setdynamicactionsf9e9a,
        codeStates['dynamicactionsf9e9a'] = dynamicactionsf9e9aProps,
        codeStates['setdynamicactionsf9e9a'] = setdynamicactionsf9e9aProps,
    codeExecution(code,codeStates)
    }
  }
  const handleChange = async(e: any) => {
    let validate:any;
    setError('');
    setValidate((pre:any)=>({...pre,addAiAssetDependency_v1:{...pre?.addAiAssetDependency_v1,notes:undefined}}));
    if(dynamicStateandType.type=="number"){
    setrisk_conf_groupfa4d5((prev: any) => ({ ...prev, notes: +e?.target?.value }));
    }
    else{
    setrisk_conf_groupfa4d5((prev: any) => ({ ...prev, notes: e?.target?.value }));
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
  if (notesda4d6?.isHidden) {
    return <></>
  }
return (
  <div 
  style={{gridColumn: `1 / 25`,gridRow: `15 / 37`, gap:``, height: `100%`}} >
    <TextArea
      require={isRequredData}
      className=""
      onFocus={handleFocus}
      onChange={handleChange}
      onBlur={handleBlur}
      disabled= {notesda4d6?.isDisabled ? true : false}
      placeholder = {'type here...'}
      contentAlign={"left"}
      headerPosition='top'
      headerText="Notes"
      pin = {'brick-brick'}
      value = { risk_conf_groupfa4d5?.notes != null && typeof risk_conf_groupfa4d5?.notes =='object' ? Object.keys(risk_conf_groupfa4d5?.notes)?.length ?  JSON.stringify(risk_conf_groupfa4d5?.notes,null ,2):"" : risk_conf_groupfa4d5?.notes||""}
      errorMessage={error}
      validationState={validate?.addAiAssetDependency_v1?.notes ? "invalid" : undefined}
    />
  </div>
  )
}

export default TextAreanotes
