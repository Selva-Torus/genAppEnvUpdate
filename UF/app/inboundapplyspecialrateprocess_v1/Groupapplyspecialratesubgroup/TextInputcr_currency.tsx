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

const TextInputcr_currency = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
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
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'cr_currency',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {applyspecialratemaingroup5736c, setapplyspecialratemaingroup5736c}= useContext(TotalContext) as TotalContextProps;
  const {applyspecialratemaingroup5736cProps, setapplyspecialratemaingroup5736cProps}= useContext(TotalContext) as TotalContextProps;
  const {applyspecialratesubgroup36462, setapplyspecialratesubgroup36462}= useContext(TotalContext) as TotalContextProps;
  const {applyspecialratesubgroup36462Props, setapplyspecialratesubgroup36462Props}= useContext(TotalContext) as TotalContextProps;
  const {cr_accountede53, setcr_accountede53}= useContext(TotalContext) as TotalContextProps;
  const {cr_currency233af, setcr_currency233af}= useContext(TotalContext) as TotalContextProps;
  const {cr_amount807dd, setcr_amount807dd}= useContext(TotalContext) as TotalContextProps;
  const {account_currency8e273, setaccount_currency8e273}= useContext(TotalContext) as TotalContextProps;
  const {current_exchange_rateb1fbe, setcurrent_exchange_rateb1fbe}= useContext(TotalContext) as TotalContextProps;
  const {credit_amountda91c, setcredit_amountda91c}= useContext(TotalContext) as TotalContextProps;
  const {revised_exchange_ratedb974, setrevised_exchange_ratedb974}= useContext(TotalContext) as TotalContextProps;
  const {revised_credit_amount747be, setrevised_credit_amount747be}= useContext(TotalContext) as TotalContextProps;
  const {applyspecialratedynamicactionsd8714, setapplyspecialratedynamicactionsd8714}= useContext(TotalContext) as TotalContextProps;
  const {applyspecialratedynamicactionsd8714Props, setapplyspecialratedynamicactionsd8714Props}= useContext(TotalContext) as TotalContextProps;
  

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
      setValidate((pre:any)=>({...pre,inboundApplySpecialRateProcess_v1:{...pre?.inboundApplySpecialRateProcess_v1,cr_currency:undefined}}));
    if(dynamicStateandType.type=="number"){
    setapplyspecialratesubgroup36462((prev: any) => ({ ...prev, cr_currency: +e.target.value }));
    }
    else{
    setapplyspecialratesubgroup36462((prev: any) => ({ ...prev, cr_currency: e.target.value }));
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['applyspecialratemaingroup'] = applyspecialratemaingroup5736c,
        codeStates['setapplyspecialratemaingroup'] = setapplyspecialratemaingroup5736c,
        codeStates['applyspecialratemaingroup5736c'] = applyspecialratemaingroup5736cProps,
        codeStates['setapplyspecialratemaingroup5736c'] = setapplyspecialratemaingroup5736cProps,
        codeStates['applyspecialratesubgroup'] = applyspecialratesubgroup36462,
        codeStates['setapplyspecialratesubgroup'] = setapplyspecialratesubgroup36462,
        codeStates['applyspecialratesubgroup36462'] = applyspecialratesubgroup36462Props,
        codeStates['setapplyspecialratesubgroup36462'] = setapplyspecialratesubgroup36462Props,
        codeStates['cr_account'] = cr_accountede53,
        codeStates['setcr_account'] = setcr_accountede53,
        codeStates['cr_currency'] = cr_currency233af,
        codeStates['setcr_currency'] = setcr_currency233af,
        codeStates['cr_amount'] = cr_amount807dd,
        codeStates['setcr_amount'] = setcr_amount807dd,
        codeStates['account_currency'] = account_currency8e273,
        codeStates['setaccount_currency'] = setaccount_currency8e273,
        codeStates['current_exchange_rate'] = current_exchange_rateb1fbe,
        codeStates['setcurrent_exchange_rate'] = setcurrent_exchange_rateb1fbe,
        codeStates['credit_amount'] = credit_amountda91c,
        codeStates['setcredit_amount'] = setcredit_amountda91c,
        codeStates['revised_exchange_rate'] = revised_exchange_ratedb974,
        codeStates['setrevised_exchange_rate'] = setrevised_exchange_ratedb974,
        codeStates['revised_credit_amount'] = revised_credit_amount747be,
        codeStates['setrevised_credit_amount'] = setrevised_credit_amount747be,
        codeStates['applyspecialratedynamicactions'] = applyspecialratedynamicactionsd8714,
        codeStates['setapplyspecialratedynamicactions'] = setapplyspecialratedynamicactionsd8714,
        codeStates['applyspecialratedynamicactionsd8714'] = applyspecialratedynamicactionsd8714Props,
        codeStates['setapplyspecialratedynamicactionsd8714'] = setapplyspecialratedynamicactionsd8714Props,
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
        "a38b8b08a926d1ee5006cd7800936462",
        "6ed034b3ae632496ba443111fc0233af"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:inboundApplySpecialRateProcess:AFVK:v1",
      //     componentId: "a38b8b08a926d1ee5006cd7800936462",
      //     controlId: "6ed034b3ae632496ba443111fc0233af",
      //     isTable: false,
      //     from:"TextInputcr_currency",
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
        setDynamicStateandType({name:'cr_currency', type: 'number'});
      }
      // if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      // if(orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties){
      //   let type:any={name:'cr_currency',type:'text'};
      //   type={
      //     name:'cr_currency',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.cr_currency.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.cr_currency.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.cr_currency.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
      //   if(orchestrationData?.data?.schemaData?.at(0)?.schema.properties){
      //   let type:any={name:'cr_currency',type:'text'};
      //   type={
      //     name:'cr_currency',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.properties.cr_currency.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.cr_currency.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.cr_currency.type
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
  const applyspecialratesubgroup36462Ref = useRef<any>(applyspecialratesubgroup36462);
  useEffect(() => { applyspecialratesubgroup36462Ref.current = applyspecialratesubgroup36462; }, [applyspecialratesubgroup36462]);
  useEffect(()=>{
      handleMapperValue();
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "6ed034b3ae632496ba443111fc0233af") {
        handleChange({target:{value:applyspecialratesubgroup36462Ref?.current?.cr_currency||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "6ed034b3ae632496ba443111fc0233af") {
        handleBlur({target:{value:applyspecialratesubgroup36462Ref?.current?.cr_currency||""}});
      }
    };
    eventBus.on("triggerElement|onChange", handlerChange);
    eventBus.on("triggerElement|onBlur", handlerBlur);
    return () => {
      eventBus.off("triggerElement|onChange", handlerChange);
      eventBus.off("triggerElement|onBlur", handlerBlur);
    };
  },[validateRefetch.value])
  if (cr_currency233af?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `1 / 25`,gridRow: `17 / 31`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className="!rounded-lg"
        label={keyset("")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={false}
        type={dynamicStateandType.type}
        value={applyspecialratesubgroup36462?.cr_currency||""}
        disabled={ true }
        pin='brick-brick'     
        placeholder='type here....'      
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="Payment Currency"
      errorMessage={error}
        validationState={validate?.inboundApplySpecialRateProcess_v1?.cr_currency ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputcr_currency
