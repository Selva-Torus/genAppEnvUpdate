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

const TextInputreturn_currency = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
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
        "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1|c2a320f6a30140a487ed20c46f1763dd|properties.cr_currency"
      ],
      "targetKey": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:inboundReturnProcess:AFVK:v1|f6337c10339c4bc78695377e90863981|a763692df11147278a58ac473275d707"
    }
  ],
  "dfdKey": "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1:",
  "schemaData": {
    "type": "string"
  },
  "dataType": "string"
}
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_transaction_v1Props, setdfd_transaction_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const {returnreasonmaingroup60037, setreturnreasonmaingroup60037}= useContext(TotalContext) as TotalContextProps;
  const {returnreasonmaingroup60037Props, setreturnreasonmaingroup60037Props}= useContext(TotalContext) as TotalContextProps;
  const {returnreasonsubgroup63981, setreturnreasonsubgroup63981}= useContext(TotalContext) as TotalContextProps;
  const {returnreasonsubgroup63981Props, setreturnreasonsubgroup63981Props}= useContext(TotalContext) as TotalContextProps;
  const {return_reason38055, setreturn_reason38055}= useContext(TotalContext) as TotalContextProps;
  const {return_reason_code06fe7, setreturn_reason_code06fe7}= useContext(TotalContext) as TotalContextProps;
  const {return_currency5d707, setreturn_currency5d707}= useContext(TotalContext) as TotalContextProps;
  const {return_amount7f000, setreturn_amount7f000}= useContext(TotalContext) as TotalContextProps;
  const {returndynamicactions87eb7, setreturndynamicactions87eb7}= useContext(TotalContext) as TotalContextProps;
  const {returndynamicactions87eb7Props, setreturndynamicactions87eb7Props}= useContext(TotalContext) as TotalContextProps;
  

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
      setValidate((pre:any)=>({...pre,inboundReturnProcess_v1:{...pre?.inboundReturnProcess_v1,cr_currency:undefined}}));
    if(dynamicStateandType.type=="number"){
    setreturnreasonsubgroup63981((prev: any) => ({ ...prev, cr_currency: +e.target.value }));
    }
    else{
    setreturnreasonsubgroup63981((prev: any) => ({ ...prev, cr_currency: e.target.value }));
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['returnreasonmaingroup'] = returnreasonmaingroup60037,
        codeStates['setreturnreasonmaingroup'] = setreturnreasonmaingroup60037,
        codeStates['returnreasonmaingroup60037'] = returnreasonmaingroup60037Props,
        codeStates['setreturnreasonmaingroup60037'] = setreturnreasonmaingroup60037Props,
        codeStates['returnreasonsubgroup'] = returnreasonsubgroup63981,
        codeStates['setreturnreasonsubgroup'] = setreturnreasonsubgroup63981,
        codeStates['returnreasonsubgroup63981'] = returnreasonsubgroup63981Props,
        codeStates['setreturnreasonsubgroup63981'] = setreturnreasonsubgroup63981Props,
        codeStates['return_reason'] = return_reason38055,
        codeStates['setreturn_reason'] = setreturn_reason38055,
        codeStates['return_reason_code'] = return_reason_code06fe7,
        codeStates['setreturn_reason_code'] = setreturn_reason_code06fe7,
        codeStates['return_currency'] = return_currency5d707,
        codeStates['setreturn_currency'] = setreturn_currency5d707,
        codeStates['return_amount'] = return_amount7f000,
        codeStates['setreturn_amount'] = setreturn_amount7f000,
        codeStates['returndynamicactions'] = returndynamicactions87eb7,
        codeStates['setreturndynamicactions'] = setreturndynamicactions87eb7,
        codeStates['returndynamicactions87eb7'] = returndynamicactions87eb7Props,
        codeStates['setreturndynamicactions87eb7'] = setreturndynamicactions87eb7Props,
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
        "f6337c10339c4bc78695377e90863981",
        "a763692df11147278a58ac473275d707"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:inboundReturnProcess:AFVK:v1",
      //     componentId: "f6337c10339c4bc78695377e90863981",
      //     controlId: "a763692df11147278a58ac473275d707",
      //     isTable: false,
      //     from:"TextInputreturn_currency",
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
  const returnreasonsubgroup63981Ref = useRef<any>(returnreasonsubgroup63981);
  useEffect(() => { returnreasonsubgroup63981Ref.current = returnreasonsubgroup63981; }, [returnreasonsubgroup63981]);
  useEffect(()=>{
      handleMapperValue();
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "a763692df11147278a58ac473275d707") {
        handleChange({target:{value:returnreasonsubgroup63981Ref?.current?.cr_currency||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "a763692df11147278a58ac473275d707") {
        handleBlur({target:{value:returnreasonsubgroup63981Ref?.current?.cr_currency||""}});
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
      setreturnreasonsubgroup63981((pre:any)=>({...pre,cr_currency:dfd_transaction_v1Props.data[0]?.cr_currency}));
    }
  }
  },[dfd_transaction_v1Props?.setSearchFilters])
  if (return_currency5d707?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `1 / 25`,gridRow: `38 / 52`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className="!rounded-lg"
        label={keyset("")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={false}
        type={dynamicStateandType.type}
        value={returnreasonsubgroup63981?.cr_currency||""}
        disabled={ true }
        pin='brick-brick'     
        placeholder='type here....'      
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="Return Currency"
      errorMessage={error}
        validationState={validate?.inboundReturnProcess_v1?.cr_currency ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputreturn_currency
