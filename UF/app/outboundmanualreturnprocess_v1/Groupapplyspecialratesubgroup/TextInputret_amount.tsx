'use client'




import React, { useState,useContext,useEffect, useRef } from 'react'
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { Modal } from "@/components/Modal";
import { Text } from "@/components/Text";
import { TextInput } from '@/components/TextInput';
import { uf_getPFDetailsDto,uf_initiatePfDto,te_eventEmitterDto,uf_ifoDto,te_updateDto, te_refreshDto } from '@/app/interfaces/interfaces';
import i18n from '@/app/components/i18n';
import decodeToken from '@/app/components/decodeToken';
import {commonSepareteDataFromTheObject, eventFunction } from '@/app/utils/eventFunction';
import { eventDecisionTable } from '@/app/utils/evaluateDecisionTable';
import { codeExecution } from '@/app/utils/codeExecution';
import { AxiosService } from '@/app/components/axiosService';
import { useGlobal } from '@/context/GlobalContext'
import { useRouter } from 'next/navigation';
import UOmapperData from '@/context/dfdmapperContolnames.json'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { eventBus } from '@/app/eventBus';
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
import { useHandleDfdRefresh } from '@/context/dfdRefreshContext';
import { nullFilter } from '@/app/utils/nullDataFilter';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import * as v from 'valibot';
///////////////
////////////

const TextInputret_amount = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
  const { token } = useGlobal();
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {validateRefetch , setValidateRefetch} = useContext(TotalContext) as TotalContextProps;
  const {validate , setValidate} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const handleDfdRefresh = useHandleDfdRefresh();
  const allState:any = useContext(TotalContext) as TotalContextProps
  const actionDetails : any = {
  "action": {
    "lock": {
      "lockMode": "",
      "name": "",
      "ttl": ""
    },
    "stateTransition": {
      "sourceQueue": "",
      "sourceStatus": "",
      "targetQueue": "",
      "targetStatus": ""
    },
    "pagination": {
      "page": "1",
      "count": "10"
    },
    "encryption": {
      "isEnabled": false,
      "selectedDpd": "",
      "encryptionMethod": ""
    },
    "events": {}
  },
  "code": "",
  "rule": {},
  "events": {},
  "mapper": [],
  "dfdKey": "undefined:"
}
  const decodedTokenObj:any = decodeToken(token);
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  const toast : Function = useInfoMsg()
  const keyset : Function = i18n.keyset("language");
  const [allCode,setAllCode]=useState<string>("");
  let schemaArray :string[] =[];
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'ret_amount',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {applyspecialratemaingroup6cd35, setapplyspecialratemaingroup6cd35}= useContext(TotalContext) as TotalContextProps;
  const {applyspecialratemaingroup6cd35Props, setapplyspecialratemaingroup6cd35Props}= useContext(TotalContext) as TotalContextProps;
  const {applyspecialratesubgroupd7745, setapplyspecialratesubgroupd7745}= useContext(TotalContext) as TotalContextProps;
  const {applyspecialratesubgroupd7745Props, setapplyspecialratesubgroupd7745Props}= useContext(TotalContext) as TotalContextProps;
  const {dr_account8ccf1, setdr_account8ccf1}= useContext(TotalContext) as TotalContextProps;
  const {dr_currency6b8f0, setdr_currency6b8f0}= useContext(TotalContext) as TotalContextProps;
  const {debit_exchange_rate710eb, setdebit_exchange_rate710eb}= useContext(TotalContext) as TotalContextProps;
  const {ret_amountb0252, setret_amountb0252}= useContext(TotalContext) as TotalContextProps;
  const {ret_currencye06ce, setret_currencye06ce}= useContext(TotalContext) as TotalContextProps;
  const {exchange_rate71ca9, setexchange_rate71ca9}= useContext(TotalContext) as TotalContextProps;
  const {calculated_ret_amountdc5ca, setcalculated_ret_amountdc5ca}= useContext(TotalContext) as TotalContextProps;
  const {applyspecialratedynamicactions8ee48, setapplyspecialratedynamicactions8ee48}= useContext(TotalContext) as TotalContextProps;
  const {applyspecialratedynamicactions8ee48Props, setapplyspecialratedynamicactions8ee48Props}= useContext(TotalContext) as TotalContextProps;
  

  // Validation  
    const [error, setError] = useState<string>('');
  schemaArray = [] ;
    function SourceIdFilter(eventProperty:any,matchingSequence?:string){
    let ans : any[] = [];
    let id : string = "";
    if(eventProperty.name=='saveHandler' && eventProperty.sequence == matchingSequence)
    {
      return [eventProperty.id]
    }
    if(eventProperty.name=='eventEmitter' && eventProperty.sequence == matchingSequence)
    {
      return [eventProperty.id]
    }
    for(let i=0;i<eventProperty?.children?.length;i++)
    {
      let temp:any=SourceIdFilter(eventProperty?.children[i],matchingSequence)
      if(temp.length)
      {
        ans.push(eventProperty?.children[i].id)
        id=id+"|"+eventProperty?.children[i].id
        ans.push(...temp)
      }
    }
    return ans
  }
  const handleChange = async(e: any) => {
      let validate:any;    
      setError('');
      setValidate((pre:any)=>({...pre,outboundManualReturnProcess_v1:{...pre?.outboundManualReturnProcess_v1,ret_amount:undefined}}));
    if(dynamicStateandType.type=="number"){
    setapplyspecialratesubgroupd7745((prev: any) => ({ ...prev, ret_amount: +e.target.value }));
    }
    else{
    setapplyspecialratesubgroupd7745((prev: any) => ({ ...prev, ret_amount: e.target.value }));
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['applyspecialratemaingroup'] = applyspecialratemaingroup6cd35,
        codeStates['setapplyspecialratemaingroup'] = setapplyspecialratemaingroup6cd35,
        codeStates['applyspecialratemaingroup6cd35'] = applyspecialratemaingroup6cd35Props,
        codeStates['setapplyspecialratemaingroup6cd35'] = setapplyspecialratemaingroup6cd35Props,
        codeStates['applyspecialratesubgroup'] = applyspecialratesubgroupd7745,
        codeStates['setapplyspecialratesubgroup'] = setapplyspecialratesubgroupd7745,
        codeStates['applyspecialratesubgroupd7745'] = applyspecialratesubgroupd7745Props,
        codeStates['setapplyspecialratesubgroupd7745'] = setapplyspecialratesubgroupd7745Props,
        codeStates['dr_account'] = dr_account8ccf1,
        codeStates['setdr_account'] = setdr_account8ccf1,
        codeStates['dr_currency'] = dr_currency6b8f0,
        codeStates['setdr_currency'] = setdr_currency6b8f0,
        codeStates['debit_exchange_rate'] = debit_exchange_rate710eb,
        codeStates['setdebit_exchange_rate'] = setdebit_exchange_rate710eb,
        codeStates['ret_amount'] = ret_amountb0252,
        codeStates['setret_amount'] = setret_amountb0252,
        codeStates['ret_currency'] = ret_currencye06ce,
        codeStates['setret_currency'] = setret_currencye06ce,
        codeStates['exchange_rate'] = exchange_rate71ca9,
        codeStates['setexchange_rate'] = setexchange_rate71ca9,
        codeStates['calculated_ret_amount'] = calculated_ret_amountdc5ca,
        codeStates['setcalculated_ret_amount'] = setcalculated_ret_amountdc5ca,
        codeStates['applyspecialratedynamicactions'] = applyspecialratedynamicactions8ee48,
        codeStates['setapplyspecialratedynamicactions'] = setapplyspecialratedynamicactions8ee48,
        codeStates['applyspecialratedynamicactions8ee48'] = applyspecialratedynamicactions8ee48Props,
        codeStates['setapplyspecialratedynamicactions8ee48'] = setapplyspecialratedynamicactions8ee48Props,
    codeExecution(code,codeStates);
    }  
     try{
      setIsProcessing(true);
        let copyFormhandlerData :any = {}

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

  const handleValidate=async (e?:any) => {
      let validate:any
  }
  const handleBlur=async (e?:any) => {
      let validate:any

    try{
      setIsProcessing(true);
        let copyFormhandlerData :any = {}

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
  const handleMapperValue=async()=>{
    try{
      const orchestrationData:any = getControlOrchestrationData(
        controlData,
        "caa7a90344fcb98d6f8d0fda126d7745",
        "f20848e5a7252240d03ec6433b0b0252"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:outboundManualReturnProcess:AFVK:v1",
      //     componentId: "caa7a90344fcb98d6f8d0fda126d7745",
      //     controlId: "f20848e5a7252240d03ec6433b0b0252",
      //     isTable: false,
      //     from:"TextInputret_amount",
      //     accessProfile:accessProfile
      //   },
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`
      //     }
      //   }
      // )
      // if(orchestrationData?.data?.error == true){
       
      //   return
      // }
      setAllCode(orchestrationData?.data?.code);
      if (orchestrationData?.data?.dataType ==='integer' || orchestrationData?.data?.dataType ==='number') {
        setDynamicStateandType({name:'ret_amount', type: 'number'});
      }
      // if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      // if(orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties){
      //   let type:any={name:'ret_amount',type:'text'};
      //   type={
      //     name:'ret_amount',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.ret_amount.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.ret_amount.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.ret_amount.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
      //   if(orchestrationData?.data?.schemaData?.at(0)?.schema.properties){
      //   let type:any={name:'ret_amount',type:'text'};
      //   type={
      //     name:'ret_amount',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.properties.ret_amount.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.ret_amount.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.ret_amount.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }
    }
    catch(err)
    {
      console.log(err);
    }
  }
  const applyspecialratesubgroupd7745Ref = useRef<any>(applyspecialratesubgroupd7745);
  useEffect(() => { applyspecialratesubgroupd7745Ref.current = applyspecialratesubgroupd7745; }, [applyspecialratesubgroupd7745]);
  useEffect(()=>{
      handleMapperValue();
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "f20848e5a7252240d03ec6433b0b0252") {
        handleChange({target:{value:applyspecialratesubgroupd7745Ref?.current?.ret_amount||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "f20848e5a7252240d03ec6433b0b0252") {
        handleBlur({target:{value:applyspecialratesubgroupd7745Ref?.current?.ret_amount||""}});
      }
    };
    eventBus.on("triggerElement|onChange", handlerChange);
    eventBus.on("triggerElement|onBlur", handlerBlur);
    return () => {
      eventBus.off("triggerElement|onChange", handlerChange);
      eventBus.off("triggerElement|onBlur", handlerBlur);
    };
  },[validateRefetch.value])
  if (ret_amountb0252?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `1 / 25`,gridRow: `49 / 63`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className="!rounded-lg"
        label={keyset("")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={false}
        type={dynamicStateandType.type}
        value={applyspecialratesubgroupd7745?.ret_amount||""}
        disabled={ true }
        pin='brick-brick'     
        placeholder='type here....'      
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="Return Amount"
      errorMessage={error}
        validationState={validate?.outboundManualReturnProcess_v1?.ret_amount ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputret_amount
