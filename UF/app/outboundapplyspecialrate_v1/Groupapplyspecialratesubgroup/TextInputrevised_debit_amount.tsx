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

const TextInputrevised_debit_amount = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
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
  "mapper": [
    {
      "sourceKey": [
        "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transactionDetailQuery:AFVK:v1|cdd1acacd5db4448a3cae5881ab0c117|properties.product_additional.properties.revised_debit_amount"
      ],
      "targetKey": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:outboundApplySpecialRate:AFVK:v1|f3f1201a701ab6abac505f255692d2fd|fa05ddb7b2bbae73b63bdea52ea6130b"
    }
  ],
  "dfdKey": "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transactionDetailQuery:AFVK:v1:",
  "dataType": "string"
}
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_transactiondetailquery_v1Props, setdfd_transactiondetailquery_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  const toast : Function = useInfoMsg()
  const keyset : Function = i18n.keyset("language");
  const [allCode,setAllCode]=useState<string>("");
  let schemaArray :string[] =[];
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'revised_debit_amount',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {applyspecialratemaingroupe0950, setapplyspecialratemaingroupe0950}= useContext(TotalContext) as TotalContextProps;
  const {applyspecialratemaingroupe0950Props, setapplyspecialratemaingroupe0950Props}= useContext(TotalContext) as TotalContextProps;
  const {applyspecialratesubgroup2d2fd, setapplyspecialratesubgroup2d2fd}= useContext(TotalContext) as TotalContextProps;
  const {applyspecialratesubgroup2d2fdProps, setapplyspecialratesubgroup2d2fdProps}= useContext(TotalContext) as TotalContextProps;
  const {dr_account4eafa, setdr_account4eafa}= useContext(TotalContext) as TotalContextProps;
  const {dr_currencyf9a11, setdr_currencyf9a11}= useContext(TotalContext) as TotalContextProps;
  const {dr_amount3c1d4, setdr_amount3c1d4}= useContext(TotalContext) as TotalContextProps;
  const {cr_currencya5017, setcr_currencya5017}= useContext(TotalContext) as TotalContextProps;
  const {cr_amountac0e3, setcr_amountac0e3}= useContext(TotalContext) as TotalContextProps;
  const {exchange_rate42ef6, setexchange_rate42ef6}= useContext(TotalContext) as TotalContextProps;
  const {revised_exchange_rate18eff, setrevised_exchange_rate18eff}= useContext(TotalContext) as TotalContextProps;
  const {revised_debit_amount6130b, setrevised_debit_amount6130b}= useContext(TotalContext) as TotalContextProps;
  const {revised_credit_amount67a97, setrevised_credit_amount67a97}= useContext(TotalContext) as TotalContextProps;
  const {applyspecialratedynamicactionsc09cc, setapplyspecialratedynamicactionsc09cc}= useContext(TotalContext) as TotalContextProps;
  const {applyspecialratedynamicactionsc09ccProps, setapplyspecialratedynamicactionsc09ccProps}= useContext(TotalContext) as TotalContextProps;
  

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
      setValidate((pre:any)=>({...pre,outboundApplySpecialRate_v1:{...pre?.outboundApplySpecialRate_v1,revised_debit_amount:undefined}}));
    if(dynamicStateandType.type=="number"){
    setapplyspecialratesubgroup2d2fd((prev: any) => ({ ...prev, revised_debit_amount: +e.target.value }));
    }
    else{
    setapplyspecialratesubgroup2d2fd((prev: any) => ({ ...prev, revised_debit_amount: e.target.value }));
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['applyspecialratemaingroup'] = applyspecialratemaingroupe0950,
        codeStates['setapplyspecialratemaingroup'] = setapplyspecialratemaingroupe0950,
        codeStates['applyspecialratemaingroupe0950'] = applyspecialratemaingroupe0950Props,
        codeStates['setapplyspecialratemaingroupe0950'] = setapplyspecialratemaingroupe0950Props,
        codeStates['applyspecialratesubgroup'] = applyspecialratesubgroup2d2fd,
        codeStates['setapplyspecialratesubgroup'] = setapplyspecialratesubgroup2d2fd,
        codeStates['applyspecialratesubgroup2d2fd'] = applyspecialratesubgroup2d2fdProps,
        codeStates['setapplyspecialratesubgroup2d2fd'] = setapplyspecialratesubgroup2d2fdProps,
        codeStates['dr_account'] = dr_account4eafa,
        codeStates['setdr_account'] = setdr_account4eafa,
        codeStates['dr_currency'] = dr_currencyf9a11,
        codeStates['setdr_currency'] = setdr_currencyf9a11,
        codeStates['dr_amount'] = dr_amount3c1d4,
        codeStates['setdr_amount'] = setdr_amount3c1d4,
        codeStates['cr_currency'] = cr_currencya5017,
        codeStates['setcr_currency'] = setcr_currencya5017,
        codeStates['cr_amount'] = cr_amountac0e3,
        codeStates['setcr_amount'] = setcr_amountac0e3,
        codeStates['exchange_rate'] = exchange_rate42ef6,
        codeStates['setexchange_rate'] = setexchange_rate42ef6,
        codeStates['revised_exchange_rate'] = revised_exchange_rate18eff,
        codeStates['setrevised_exchange_rate'] = setrevised_exchange_rate18eff,
        codeStates['revised_debit_amount'] = revised_debit_amount6130b,
        codeStates['setrevised_debit_amount'] = setrevised_debit_amount6130b,
        codeStates['revised_credit_amount'] = revised_credit_amount67a97,
        codeStates['setrevised_credit_amount'] = setrevised_credit_amount67a97,
        codeStates['applyspecialratedynamicactions'] = applyspecialratedynamicactionsc09cc,
        codeStates['setapplyspecialratedynamicactions'] = setapplyspecialratedynamicactionsc09cc,
        codeStates['applyspecialratedynamicactionsc09cc'] = applyspecialratedynamicactionsc09ccProps,
        codeStates['setapplyspecialratedynamicactionsc09cc'] = setapplyspecialratedynamicactionsc09ccProps,
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
        "f3f1201a701ab6abac505f255692d2fd",
        "fa05ddb7b2bbae73b63bdea52ea6130b"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:outboundApplySpecialRate:AFVK:v1",
      //     componentId: "f3f1201a701ab6abac505f255692d2fd",
      //     controlId: "fa05ddb7b2bbae73b63bdea52ea6130b",
      //     isTable: false,
      //     from:"TextInputrevised_debit_amount",
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
        setDynamicStateandType({name:'revised_debit_amount', type: 'number'});
      }
      // if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      // if(orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties){
      //   let type:any={name:'revised_debit_amount',type:'text'};
      //   type={
      //     name:'revised_debit_amount',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.revised_debit_amount.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.revised_debit_amount.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.revised_debit_amount.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
      //   if(orchestrationData?.data?.schemaData?.at(0)?.schema.properties){
      //   let type:any={name:'revised_debit_amount',type:'text'};
      //   type={
      //     name:'revised_debit_amount',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.properties.revised_debit_amount.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.revised_debit_amount.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.revised_debit_amount.type
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
  const applyspecialratesubgroup2d2fdRef = useRef<any>(applyspecialratesubgroup2d2fd);
  useEffect(() => { applyspecialratesubgroup2d2fdRef.current = applyspecialratesubgroup2d2fd; }, [applyspecialratesubgroup2d2fd]);
  useEffect(()=>{
      handleMapperValue();
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "fa05ddb7b2bbae73b63bdea52ea6130b") {
        handleChange({target:{value:applyspecialratesubgroup2d2fdRef?.current?.revised_debit_amount||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "fa05ddb7b2bbae73b63bdea52ea6130b") {
        handleBlur({target:{value:applyspecialratesubgroup2d2fdRef?.current?.revised_debit_amount||""}});
      }
    };
    eventBus.on("triggerElement|onChange", handlerChange);
    eventBus.on("triggerElement|onBlur", handlerBlur);
    return () => {
      eventBus.off("triggerElement|onChange", handlerChange);
      eventBus.off("triggerElement|onBlur", handlerBlur);
    };
  },[validateRefetch.value])
  useEffect(() => {
  if(dfd_transactiondetailquery_v1Props?.setSearchFilters && dfd_transactiondetailquery_v1Props?.data)
  {
    if(Array.isArray(dfd_transactiondetailquery_v1Props.data) && dfd_transactiondetailquery_v1Props.data.length > 0){
      setapplyspecialratesubgroup2d2fd((pre:any)=>({...pre,revised_debit_amount:dfd_transactiondetailquery_v1Props.data[0]?.revised_debit_amount}));
    }
  }
  },[dfd_transactiondetailquery_v1Props?.setSearchFilters])
  if (revised_debit_amount6130b?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `1 / 25`,gridRow: `111 / 125`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className="!rounded-lg"
        label={keyset("")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={true}
        type={dynamicStateandType.type}
        value={applyspecialratesubgroup2d2fd?.revised_debit_amount||""}
        disabled={ true }
        pin='brick-brick'     
        placeholder='type here....'      
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="Revised Debit Amount"
      errorMessage={error}
        validationState={validate?.outboundApplySpecialRate_v1?.revised_debit_amount ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputrevised_debit_amount
