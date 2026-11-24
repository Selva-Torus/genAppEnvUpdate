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

const TextInputreason_description = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
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
        "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfTranMainTransaction:AFVK:v1|f8a3cc18e5be43e493b48b711eda2b2d|properties.product_basic.properties.reason_description"
      ],
      "targetKey": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:nfCancelRequestCamt055:AFVK:v1|489dfdfd3c6b26ca7c134bfeb3e5ac44|c619d8443f73db706add9c53b175420a"
    }
  ],
  "dfdKey": "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfTranMainTransaction:AFVK:v1:",
  "dataType": "string"
}
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_nftranmaintransaction_v1Props, setdfd_nftranmaintransaction_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  const toast : Function = useInfoMsg()
  const keyset : Function = i18n.keyset("language");
  const [allCode,setAllCode]=useState<string>("");
  let schemaArray :string[] =[];
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'reason_description',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {cancelrequestcamt055maingroupbf232, setcancelrequestcamt055maingroupbf232}= useContext(TotalContext) as TotalContextProps;
  const {cancelrequestcamt055maingroupbf232Props, setcancelrequestcamt055maingroupbf232Props}= useContext(TotalContext) as TotalContextProps;
  const {cancelrequestcamt055subgroup5ac44, setcancelrequestcamt055subgroup5ac44}= useContext(TotalContext) as TotalContextProps;
  const {cancelrequestcamt055subgroup5ac44Props, setcancelrequestcamt055subgroup5ac44Props}= useContext(TotalContext) as TotalContextProps;
  const {tran_date5d7c0, settran_date5d7c0}= useContext(TotalContext) as TotalContextProps;
  const {message_code5df7d, setmessage_code5df7d}= useContext(TotalContext) as TotalContextProps;
  const {cancel_reason1d34e, setcancel_reason1d34e}= useContext(TotalContext) as TotalContextProps;
  const {reason_description5420a, setreason_description5420a}= useContext(TotalContext) as TotalContextProps;
  const {cancelrequestcamt055dynamicactions2a75a, setcancelrequestcamt055dynamicactions2a75a}= useContext(TotalContext) as TotalContextProps;
  const {cancelrequestcamt055dynamicactions2a75aProps, setcancelrequestcamt055dynamicactions2a75aProps}= useContext(TotalContext) as TotalContextProps;
  

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
      setValidate((pre:any)=>({...pre,nfCancelRequestCamt055_v1:{...pre?.nfCancelRequestCamt055_v1,reason_description:undefined}}));
    if(dynamicStateandType.type=="number"){
    setcancelrequestcamt055subgroup5ac44((prev: any) => ({ ...prev, reason_description: +e.target.value }));
    }
    else{
    setcancelrequestcamt055subgroup5ac44((prev: any) => ({ ...prev, reason_description: e.target.value }));
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['cancelrequestcamt055maingroup'] = cancelrequestcamt055maingroupbf232,
        codeStates['setcancelrequestcamt055maingroup'] = setcancelrequestcamt055maingroupbf232,
        codeStates['cancelrequestcamt055maingroupbf232'] = cancelrequestcamt055maingroupbf232Props,
        codeStates['setcancelrequestcamt055maingroupbf232'] = setcancelrequestcamt055maingroupbf232Props,
        codeStates['cancelrequestcamt055subgroup'] = cancelrequestcamt055subgroup5ac44,
        codeStates['setcancelrequestcamt055subgroup'] = setcancelrequestcamt055subgroup5ac44,
        codeStates['cancelrequestcamt055subgroup5ac44'] = cancelrequestcamt055subgroup5ac44Props,
        codeStates['setcancelrequestcamt055subgroup5ac44'] = setcancelrequestcamt055subgroup5ac44Props,
        codeStates['tran_date'] = tran_date5d7c0,
        codeStates['settran_date'] = settran_date5d7c0,
        codeStates['message_code'] = message_code5df7d,
        codeStates['setmessage_code'] = setmessage_code5df7d,
        codeStates['cancel_reason'] = cancel_reason1d34e,
        codeStates['setcancel_reason'] = setcancel_reason1d34e,
        codeStates['reason_description'] = reason_description5420a,
        codeStates['setreason_description'] = setreason_description5420a,
        codeStates['cancelrequestcamt055dynamicactions'] = cancelrequestcamt055dynamicactions2a75a,
        codeStates['setcancelrequestcamt055dynamicactions'] = setcancelrequestcamt055dynamicactions2a75a,
        codeStates['cancelrequestcamt055dynamicactions2a75a'] = cancelrequestcamt055dynamicactions2a75aProps,
        codeStates['setcancelrequestcamt055dynamicactions2a75a'] = setcancelrequestcamt055dynamicactions2a75aProps,
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
        "489dfdfd3c6b26ca7c134bfeb3e5ac44",
        "c619d8443f73db706add9c53b175420a"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:nfCancelRequestCamt055:AFVK:v1",
      //     componentId: "489dfdfd3c6b26ca7c134bfeb3e5ac44",
      //     controlId: "c619d8443f73db706add9c53b175420a",
      //     isTable: false,
      //     from:"TextInputreason_description",
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
        setDynamicStateandType({name:'reason_description', type: 'number'});
      }
      // if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      // if(orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties){
      //   let type:any={name:'reason_description',type:'text'};
      //   type={
      //     name:'reason_description',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.reason_description.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.reason_description.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.reason_description.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
      //   if(orchestrationData?.data?.schemaData?.at(0)?.schema.properties){
      //   let type:any={name:'reason_description',type:'text'};
      //   type={
      //     name:'reason_description',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.properties.reason_description.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.reason_description.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.reason_description.type
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
  const cancelrequestcamt055subgroup5ac44Ref = useRef<any>(cancelrequestcamt055subgroup5ac44);
  useEffect(() => { cancelrequestcamt055subgroup5ac44Ref.current = cancelrequestcamt055subgroup5ac44; }, [cancelrequestcamt055subgroup5ac44]);
  useEffect(()=>{
      handleMapperValue();
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "c619d8443f73db706add9c53b175420a") {
        handleChange({target:{value:cancelrequestcamt055subgroup5ac44Ref?.current?.reason_description||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "c619d8443f73db706add9c53b175420a") {
        handleBlur({target:{value:cancelrequestcamt055subgroup5ac44Ref?.current?.reason_description||""}});
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
  if(dfd_nftranmaintransaction_v1Props?.setSearchFilters && dfd_nftranmaintransaction_v1Props?.data)
  {
    if(Array.isArray(dfd_nftranmaintransaction_v1Props.data) && dfd_nftranmaintransaction_v1Props.data.length > 0){
      setcancelrequestcamt055subgroup5ac44((pre:any)=>({...pre,reason_description:dfd_nftranmaintransaction_v1Props.data[0]?.reason_description}));
    }
  }
  },[dfd_nftranmaintransaction_v1Props?.setSearchFilters])
  if (reason_description5420a?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `1 / 25`,gridRow: `60 / 74`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className="!rounded-lg"
        label={keyset("")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={false}
        type={dynamicStateandType.type}
        value={cancelrequestcamt055subgroup5ac44?.reason_description||""}
         disabled= {reason_description5420a?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='type here....'      
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="Additional Info"
      errorMessage={error}
        validationState={validate?.nfCancelRequestCamt055_v1?.reason_description ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputreason_description
