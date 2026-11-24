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

const TextInputreturn_amount = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
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
        "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1|c2a320f6a30140a487ed20c46f1763dd|properties.cr_amount"
      ],
      "targetKey": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:techInboundReturnProcess:AFVK:v1|114d37ab371e8f0381693391cc1f68e5|22044679e7ec7859626508604da9646b"
    }
  ],
  "dfdKey": "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1:",
  "schemaData": {
    "type": "number"
  },
  "dataType": "number"
}
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_transaction_v1Props, setdfd_transaction_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  const toast : Function = useInfoMsg()
  const keyset : Function = i18n.keyset("language");
  const [allCode,setAllCode]=useState<string>("");
  let schemaArray :string[] =[];
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'cr_amount',type:"number"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {returnreasonmaingroup382bc, setreturnreasonmaingroup382bc}= useContext(TotalContext) as TotalContextProps;
  const {returnreasonmaingroup382bcProps, setreturnreasonmaingroup382bcProps}= useContext(TotalContext) as TotalContextProps;
  const {returnreasonsubgroupf68e5, setreturnreasonsubgroupf68e5}= useContext(TotalContext) as TotalContextProps;
  const {returnreasonsubgroupf68e5Props, setreturnreasonsubgroupf68e5Props}= useContext(TotalContext) as TotalContextProps;
  const {return_reasonac630, setreturn_reasonac630}= useContext(TotalContext) as TotalContextProps;
  const {return_reason_code6797b, setreturn_reason_code6797b}= useContext(TotalContext) as TotalContextProps;
  const {return_currency378ac, setreturn_currency378ac}= useContext(TotalContext) as TotalContextProps;
  const {return_amount9646b, setreturn_amount9646b}= useContext(TotalContext) as TotalContextProps;
  const {returndynamicactionsc7672, setreturndynamicactionsc7672}= useContext(TotalContext) as TotalContextProps;
  const {returndynamicactionsc7672Props, setreturndynamicactionsc7672Props}= useContext(TotalContext) as TotalContextProps;
  

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
      setValidate((pre:any)=>({...pre,techInboundReturnProcess_v1:{...pre?.techInboundReturnProcess_v1,cr_amount:undefined}}));
    if(dynamicStateandType.type=="number"){
    setreturnreasonsubgroupf68e5((prev: any) => ({ ...prev, cr_amount: +e.target.value }));
    }
    else{
    setreturnreasonsubgroupf68e5((prev: any) => ({ ...prev, cr_amount: e.target.value }));
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['returnreasonmaingroup'] = returnreasonmaingroup382bc,
        codeStates['setreturnreasonmaingroup'] = setreturnreasonmaingroup382bc,
        codeStates['returnreasonmaingroup382bc'] = returnreasonmaingroup382bcProps,
        codeStates['setreturnreasonmaingroup382bc'] = setreturnreasonmaingroup382bcProps,
        codeStates['returnreasonsubgroup'] = returnreasonsubgroupf68e5,
        codeStates['setreturnreasonsubgroup'] = setreturnreasonsubgroupf68e5,
        codeStates['returnreasonsubgroupf68e5'] = returnreasonsubgroupf68e5Props,
        codeStates['setreturnreasonsubgroupf68e5'] = setreturnreasonsubgroupf68e5Props,
        codeStates['return_reason'] = return_reasonac630,
        codeStates['setreturn_reason'] = setreturn_reasonac630,
        codeStates['return_reason_code'] = return_reason_code6797b,
        codeStates['setreturn_reason_code'] = setreturn_reason_code6797b,
        codeStates['return_currency'] = return_currency378ac,
        codeStates['setreturn_currency'] = setreturn_currency378ac,
        codeStates['return_amount'] = return_amount9646b,
        codeStates['setreturn_amount'] = setreturn_amount9646b,
        codeStates['returndynamicactions'] = returndynamicactionsc7672,
        codeStates['setreturndynamicactions'] = setreturndynamicactionsc7672,
        codeStates['returndynamicactionsc7672'] = returndynamicactionsc7672Props,
        codeStates['setreturndynamicactionsc7672'] = setreturndynamicactionsc7672Props,
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
        "114d37ab371e8f0381693391cc1f68e5",
        "22044679e7ec7859626508604da9646b"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:techInboundReturnProcess:AFVK:v1",
      //     componentId: "114d37ab371e8f0381693391cc1f68e5",
      //     controlId: "22044679e7ec7859626508604da9646b",
      //     isTable: false,
      //     from:"TextInputreturn_amount",
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
        setDynamicStateandType({name:'cr_amount', type: 'number'});
      }
      // if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      // if(orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties){
      //   let type:any={name:'cr_amount',type:'text'};
      //   type={
      //     name:'cr_amount',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.cr_amount.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.cr_amount.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.cr_amount.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
      //   if(orchestrationData?.data?.schemaData?.at(0)?.schema.properties){
      //   let type:any={name:'cr_amount',type:'text'};
      //   type={
      //     name:'cr_amount',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.properties.cr_amount.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.cr_amount.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.cr_amount.type
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
  const returnreasonsubgroupf68e5Ref = useRef<any>(returnreasonsubgroupf68e5);
  useEffect(() => { returnreasonsubgroupf68e5Ref.current = returnreasonsubgroupf68e5; }, [returnreasonsubgroupf68e5]);
  useEffect(()=>{
      handleMapperValue();
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "22044679e7ec7859626508604da9646b") {
        handleChange({target:{value:returnreasonsubgroupf68e5Ref?.current?.cr_amount||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "22044679e7ec7859626508604da9646b") {
        handleBlur({target:{value:returnreasonsubgroupf68e5Ref?.current?.cr_amount||""}});
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
  if(dfd_transaction_v1Props?.setSearchFilters && dfd_transaction_v1Props?.data)
  {
    if(Array.isArray(dfd_transaction_v1Props.data) && dfd_transaction_v1Props.data.length > 0){
      setreturnreasonsubgroupf68e5((pre:any)=>({...pre,cr_amount:dfd_transaction_v1Props.data[0]?.cr_amount}));
    }
  }
  },[dfd_transaction_v1Props?.setSearchFilters])
  if (return_amount9646b?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `1 / 25`,gridRow: `57 / 71`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className="!rounded-lg"
        label={keyset("")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={false}
        type={dynamicStateandType.type}
        value={returnreasonsubgroupf68e5?.cr_amount||""}
        disabled={ true }
        pin='brick-brick'     
        placeholder='type here....'      
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="Return Amount"
      errorMessage={error}
        validationState={validate?.techInboundReturnProcess_v1?.cr_amount ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputreturn_amount
