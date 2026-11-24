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

const TextInputmessage_code = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
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
        "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfTranMainTransaction:AFVK:v1|f8a3cc18e5be43e493b48b711eda2b2d|properties.message_code"
      ],
      "targetKey": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:nfInvestigationResponseCamt111:AFVK:v1|dcf99be43c68bc746c27e738db2afab5|9be34af5069f83444f23a6f6f2c3e093"
    }
  ],
  "dfdKey": "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfTranMainTransaction:AFVK:v1:",
  "schemaData": {
    "type": "string"
  },
  "dataType": "string"
}
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_nftranmaintransaction_v1Props, setdfd_nftranmaintransaction_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  const toast : Function = useInfoMsg()
  const keyset : Function = i18n.keyset("language");
  const [allCode,setAllCode]=useState<string>("");
  let schemaArray :string[] =[];
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'message_code',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {investigationresponsecamt111maingroup058ec, setinvestigationresponsecamt111maingroup058ec}= useContext(TotalContext) as TotalContextProps;
  const {investigationresponsecamt111maingroup058ecProps, setinvestigationresponsecamt111maingroup058ecProps}= useContext(TotalContext) as TotalContextProps;
  const {investigationresponsecamt111subgroupafab5, setinvestigationresponsecamt111subgroupafab5}= useContext(TotalContext) as TotalContextProps;
  const {investigationresponsecamt111subgroupafab5Props, setinvestigationresponsecamt111subgroupafab5Props}= useContext(TotalContext) as TotalContextProps;
  const {tran_date51032, settran_date51032}= useContext(TotalContext) as TotalContextProps;
  const {message_code3e093, setmessage_code3e093}= useContext(TotalContext) as TotalContextProps;
  const {response_type65b90, setresponse_type65b90}= useContext(TotalContext) as TotalContextProps;
  const {response_reason7039a, setresponse_reason7039a}= useContext(TotalContext) as TotalContextProps;
  const {reason_descriptiond33de, setreason_descriptiond33de}= useContext(TotalContext) as TotalContextProps;
  const {investigationresponsecamt111dynamicactionsceeed, setinvestigationresponsecamt111dynamicactionsceeed}= useContext(TotalContext) as TotalContextProps;
  const {investigationresponsecamt111dynamicactionsceeedProps, setinvestigationresponsecamt111dynamicactionsceeedProps}= useContext(TotalContext) as TotalContextProps;
  

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
      setValidate((pre:any)=>({...pre,nfInvestigationResponseCamt111_v1:{...pre?.nfInvestigationResponseCamt111_v1,message_code:undefined}}));
    if(dynamicStateandType.type=="number"){
    setinvestigationresponsecamt111subgroupafab5((prev: any) => ({ ...prev, message_code: +e.target.value }));
    }
    else{
    setinvestigationresponsecamt111subgroupafab5((prev: any) => ({ ...prev, message_code: e.target.value }));
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['investigationresponsecamt111maingroup'] = investigationresponsecamt111maingroup058ec,
        codeStates['setinvestigationresponsecamt111maingroup'] = setinvestigationresponsecamt111maingroup058ec,
        codeStates['investigationresponsecamt111maingroup058ec'] = investigationresponsecamt111maingroup058ecProps,
        codeStates['setinvestigationresponsecamt111maingroup058ec'] = setinvestigationresponsecamt111maingroup058ecProps,
        codeStates['investigationresponsecamt111subgroup'] = investigationresponsecamt111subgroupafab5,
        codeStates['setinvestigationresponsecamt111subgroup'] = setinvestigationresponsecamt111subgroupafab5,
        codeStates['investigationresponsecamt111subgroupafab5'] = investigationresponsecamt111subgroupafab5Props,
        codeStates['setinvestigationresponsecamt111subgroupafab5'] = setinvestigationresponsecamt111subgroupafab5Props,
        codeStates['tran_date'] = tran_date51032,
        codeStates['settran_date'] = settran_date51032,
        codeStates['message_code'] = message_code3e093,
        codeStates['setmessage_code'] = setmessage_code3e093,
        codeStates['response_type'] = response_type65b90,
        codeStates['setresponse_type'] = setresponse_type65b90,
        codeStates['response_reason'] = response_reason7039a,
        codeStates['setresponse_reason'] = setresponse_reason7039a,
        codeStates['reason_description'] = reason_descriptiond33de,
        codeStates['setreason_description'] = setreason_descriptiond33de,
        codeStates['investigationresponsecamt111dynamicactions'] = investigationresponsecamt111dynamicactionsceeed,
        codeStates['setinvestigationresponsecamt111dynamicactions'] = setinvestigationresponsecamt111dynamicactionsceeed,
        codeStates['investigationresponsecamt111dynamicactionsceeed'] = investigationresponsecamt111dynamicactionsceeedProps,
        codeStates['setinvestigationresponsecamt111dynamicactionsceeed'] = setinvestigationresponsecamt111dynamicactionsceeedProps,
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
        "dcf99be43c68bc746c27e738db2afab5",
        "9be34af5069f83444f23a6f6f2c3e093"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:nfInvestigationResponseCamt111:AFVK:v1",
      //     componentId: "dcf99be43c68bc746c27e738db2afab5",
      //     controlId: "9be34af5069f83444f23a6f6f2c3e093",
      //     isTable: false,
      //     from:"TextInputmessage_code",
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
        setDynamicStateandType({name:'message_code', type: 'number'});
      }
      // if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      // if(orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties){
      //   let type:any={name:'message_code',type:'text'};
      //   type={
      //     name:'message_code',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.message_code.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.message_code.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.message_code.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
      //   if(orchestrationData?.data?.schemaData?.at(0)?.schema.properties){
      //   let type:any={name:'message_code',type:'text'};
      //   type={
      //     name:'message_code',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.properties.message_code.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.message_code.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.message_code.type
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
  const investigationresponsecamt111subgroupafab5Ref = useRef<any>(investigationresponsecamt111subgroupafab5);
  useEffect(() => { investigationresponsecamt111subgroupafab5Ref.current = investigationresponsecamt111subgroupafab5; }, [investigationresponsecamt111subgroupafab5]);
  useEffect(()=>{
      handleMapperValue();
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "9be34af5069f83444f23a6f6f2c3e093") {
        handleChange({target:{value:investigationresponsecamt111subgroupafab5Ref?.current?.message_code||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "9be34af5069f83444f23a6f6f2c3e093") {
        handleBlur({target:{value:investigationresponsecamt111subgroupafab5Ref?.current?.message_code||""}});
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
      setinvestigationresponsecamt111subgroupafab5((pre:any)=>({...pre,message_code:dfd_nftranmaintransaction_v1Props.data[0]?.message_code}));
    }
  }
  },[dfd_nftranmaintransaction_v1Props?.setSearchFilters])
  if (message_code3e093?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `1 / 25`,gridRow: `20 / 34`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className="!rounded-lg"
        label={keyset("")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={false}
        type={dynamicStateandType.type}
        value={investigationresponsecamt111subgroupafab5?.message_code||""}
        disabled={ true }
        pin='brick-brick'     
        placeholder='camt.111'      
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="Message Code"
      errorMessage={error}
        validationState={validate?.nfInvestigationResponseCamt111_v1?.message_code ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputmessage_code
