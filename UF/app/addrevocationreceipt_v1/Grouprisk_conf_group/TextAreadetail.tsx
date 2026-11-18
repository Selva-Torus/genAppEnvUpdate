
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


const TextAreadetail = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
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
  const [dynamicStateandType,setDynamicStateandType]=useState<any>({name:'detail',type:"string"})
  const [allCode,setAllCode] = useState<string>("")
  const toast : Function = useInfoMsg()
  const routes : AppRouterInstance = useRouter()
  const [error, setError] = useState<string>('');
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  let schemaArray :string[] =[];
  schemaArray = [] ;
 /////////////
   //another screen
  const {overall_group4dbd5, setoverall_group4dbd5}= useContext(TotalContext) as TotalContextProps;
  const {overall_group4dbd5Props, setoverall_group4dbd5Props}= useContext(TotalContext) as TotalContextProps;
  const {action_details_group8c83a, setaction_details_group8c83a}= useContext(TotalContext) as TotalContextProps;
  const {action_details_group8c83aProps, setaction_details_group8c83aProps}= useContext(TotalContext) as TotalContextProps;
  const {action_detail_group71892, setaction_detail_group71892}= useContext(TotalContext) as TotalContextProps;
  const {action_detail_group71892Props, setaction_detail_group71892Props}= useContext(TotalContext) as TotalContextProps;
  const {risk_conf_groupe5642, setrisk_conf_groupe5642}= useContext(TotalContext) as TotalContextProps;
  const {risk_conf_groupe5642Props, setrisk_conf_groupe5642Props}= useContext(TotalContext) as TotalContextProps;
  const {lifecycle_textbd096, setlifecycle_textbd096}= useContext(TotalContext) as TotalContextProps;
  const {datepickerf70e5, setdatepickerf70e5}= useContext(TotalContext) as TotalContextProps;
  const {ack_status0e020, setack_status0e020}= useContext(TotalContext) as TotalContextProps;
  const {detailefde3, setdetailefde3}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsc7861, setdynamicactionsc7861}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsc7861Props, setdynamicactionsc7861Props}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
    try{
      const orchestrationData:any = getControlOrchestrationData(
        controlData,
        "48fde300650b0ffaf9ee4f1bb1ce5642",
        "cd0aa04ed6d94641b37cecf4e63efde3"
      );
      if(Array.isArray(orchestrationData?.data?.schemaData?.at(0)?.schema)){
        let allSchemas:any[]=orchestrationData?.data?.schemaData?.at(0)?.schema||[]
        let type:any={name:'detail',type:'text'}
        allSchemas.map((item:any)=>{
          if(item.name=='detail')
          {
            type=item
  
          }
        })
        setDynamicStateandType(type)       
      }
      if(orchestrationData?.data?.schemaData?.at(0).schema.responses["200"].content["application/json"].schema.items.properties){
        let type:any={name:'detail',type:'text'}
        type={
          name:'detail',
          type: orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.detail.type == 'string' ? 'text' : orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.detail.type =='integer' ? 'number' : orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.detail.type
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
  },[detailefde3?.refresh])
  
  useEffect(()=>{
    if (prevRefreshRef.current) {
      setrisk_conf_groupe5642((pre:any)=>({...pre,detail:""}))
    }else 
      prevRefreshRef.current= true
  },[detailefde3?.refresh])

  const risk_conf_groupe5642Ref = useRef<any>(risk_conf_groupe5642);
  useEffect(() => { risk_conf_groupe5642Ref.current = risk_conf_groupe5642; }, [risk_conf_groupe5642]);
  useEffect(()=>{
      handleMapperValue();
    if(validateRefetch.init!=0)
      handleValidate();
    const handlerChange = (id:any) => {
      if (id === "cd0aa04ed6d94641b37cecf4e63efde3") {
        handleChange({target:{value:risk_conf_groupe5642Ref?.current?.detail||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "cd0aa04ed6d94641b37cecf4e63efde3") {
        handleBlur({target:{value:risk_conf_groupe5642Ref?.current?.detail||""}});
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
        codeStates['overall_group'] = overall_group4dbd5,
        codeStates['setoverall_group'] = setoverall_group4dbd5,
        codeStates['overall_group4dbd5'] = overall_group4dbd5Props,
        codeStates['setoverall_group4dbd5'] = setoverall_group4dbd5Props,
        codeStates['action_details_group'] = action_details_group8c83a,
        codeStates['setaction_details_group'] = setaction_details_group8c83a,
        codeStates['action_details_group8c83a'] = action_details_group8c83aProps,
        codeStates['setaction_details_group8c83a'] = setaction_details_group8c83aProps,
        codeStates['action_detail_group'] = action_detail_group71892,
        codeStates['setaction_detail_group'] = setaction_detail_group71892,
        codeStates['action_detail_group71892'] = action_detail_group71892Props,
        codeStates['setaction_detail_group71892'] = setaction_detail_group71892Props,
        codeStates['risk_conf_group'] = risk_conf_groupe5642,
        codeStates['setrisk_conf_group'] = setrisk_conf_groupe5642,
        codeStates['risk_conf_groupe5642'] = risk_conf_groupe5642Props,
        codeStates['setrisk_conf_groupe5642'] = setrisk_conf_groupe5642Props,
        codeStates['lifecycle_text'] = lifecycle_textbd096,
        codeStates['setlifecycle_text'] = setlifecycle_textbd096,
        codeStates['datepicker'] = datepickerf70e5,
        codeStates['setdatepicker'] = setdatepickerf70e5,
        codeStates['ack_status'] = ack_status0e020,
        codeStates['setack_status'] = setack_status0e020,
        codeStates['detail'] = detailefde3,
        codeStates['setdetail'] = setdetailefde3,
        codeStates['dynamicactions'] = dynamicactionsc7861,
        codeStates['setdynamicactions'] = setdynamicactionsc7861,
        codeStates['dynamicactionsc7861'] = dynamicactionsc7861Props,
        codeStates['setdynamicactionsc7861'] = setdynamicactionsc7861Props,
    codeExecution(code,codeStates)
    }
  }
  const handleChange = async(e: any) => {
    let validate:any;
    setError('');
    setValidate((pre:any)=>({...pre,addRevocationReceipt_v1:{...pre?.addRevocationReceipt_v1,detail:undefined}}));
    if(dynamicStateandType.type=="number"){
    setrisk_conf_groupe5642((prev: any) => ({ ...prev, detail: +e?.target?.value }));
    }
    else{
    setrisk_conf_groupe5642((prev: any) => ({ ...prev, detail: e?.target?.value }));
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
  if (detailefde3?.isHidden) {
    return <></>
  }
return (
  <div 
  style={{gridColumn: `1 / 25`,gridRow: `23 / 42`, gap:``, height: `100%`}} >
    <TextArea
      require={isRequredData}
      className=""
      onFocus={handleFocus}
      onChange={handleChange}
      onBlur={handleBlur}
      disabled= {detailefde3?.isDisabled ? true : false}
      placeholder = {'Enter the resason for this containment'}
      contentAlign={"left"}
      headerPosition='top'
      headerText="Details"
      pin = {'brick-brick'}
      value = { risk_conf_groupe5642?.detail != null && typeof risk_conf_groupe5642?.detail =='object' ? Object.keys(risk_conf_groupe5642?.detail)?.length ?  JSON.stringify(risk_conf_groupe5642?.detail,null ,2):"" : risk_conf_groupe5642?.detail||""}
      errorMessage={error}
      validationState={validate?.addRevocationReceipt_v1?.detail ? "invalid" : undefined}
    />
  </div>
  )
}

export default TextAreadetail
