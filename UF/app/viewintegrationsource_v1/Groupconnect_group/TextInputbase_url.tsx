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

const TextInputbase_url = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
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
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'base_url',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {add_group37fbc, setadd_group37fbc}= useContext(TotalContext) as TotalContextProps;
  const {add_group37fbcProps, setadd_group37fbcProps}= useContext(TotalContext) as TotalContextProps;
  const {source_details_grp9bff6, setsource_details_grp9bff6}= useContext(TotalContext) as TotalContextProps;
  const {source_details_grp9bff6Props, setsource_details_grp9bff6Props}= useContext(TotalContext) as TotalContextProps;
  const {connect_group1b893, setconnect_group1b893}= useContext(TotalContext) as TotalContextProps;
  const {connect_group1b893Props, setconnect_group1b893Props}= useContext(TotalContext) as TotalContextProps;
  const {connect_texta17c3, setconnect_texta17c3}= useContext(TotalContext) as TotalContextProps;
  const {base_url6bf66, setbase_url6bf66}= useContext(TotalContext) as TotalContextProps;
  const {auth_method_code23ae1, setauth_method_code23ae1}= useContext(TotalContext) as TotalContextProps;
  const {credential_ref6ee3f, setcredential_ref6ee3f}= useContext(TotalContext) as TotalContextProps;
  const {scheduler_retry_grp8ca28, setscheduler_retry_grp8ca28}= useContext(TotalContext) as TotalContextProps;
  const {scheduler_retry_grp8ca28Props, setscheduler_retry_grp8ca28Props}= useContext(TotalContext) as TotalContextProps;
  const {ownership_ststus_grpbc00a, setownership_ststus_grpbc00a}= useContext(TotalContext) as TotalContextProps;
  const {ownership_ststus_grpbc00aProps, setownership_ststus_grpbc00aProps}= useContext(TotalContext) as TotalContextProps;
  const {last_run_grpc3967, setlast_run_grpc3967}= useContext(TotalContext) as TotalContextProps;
  const {last_run_grpc3967Props, setlast_run_grpc3967Props}= useContext(TotalContext) as TotalContextProps;
  

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
      setValidate((pre:any)=>({...pre,viewIntegrationSource_v1:{...pre?.viewIntegrationSource_v1,base_url:undefined}}));
    if(dynamicStateandType.type=="number"){
    setconnect_group1b893((prev: any) => ({ ...prev, base_url: +e.target.value }));
    }
    else{
    setconnect_group1b893((prev: any) => ({ ...prev, base_url: e.target.value }));
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['add_group'] = add_group37fbc,
        codeStates['setadd_group'] = setadd_group37fbc,
        codeStates['add_group37fbc'] = add_group37fbcProps,
        codeStates['setadd_group37fbc'] = setadd_group37fbcProps,
        codeStates['source_details_grp'] = source_details_grp9bff6,
        codeStates['setsource_details_grp'] = setsource_details_grp9bff6,
        codeStates['source_details_grp9bff6'] = source_details_grp9bff6Props,
        codeStates['setsource_details_grp9bff6'] = setsource_details_grp9bff6Props,
        codeStates['connect_group'] = connect_group1b893,
        codeStates['setconnect_group'] = setconnect_group1b893,
        codeStates['connect_group1b893'] = connect_group1b893Props,
        codeStates['setconnect_group1b893'] = setconnect_group1b893Props,
        codeStates['connect_text'] = connect_texta17c3,
        codeStates['setconnect_text'] = setconnect_texta17c3,
        codeStates['base_url'] = base_url6bf66,
        codeStates['setbase_url'] = setbase_url6bf66,
        codeStates['auth_method_code'] = auth_method_code23ae1,
        codeStates['setauth_method_code'] = setauth_method_code23ae1,
        codeStates['credential_ref'] = credential_ref6ee3f,
        codeStates['setcredential_ref'] = setcredential_ref6ee3f,
        codeStates['scheduler_retry_grp'] = scheduler_retry_grp8ca28,
        codeStates['setscheduler_retry_grp'] = setscheduler_retry_grp8ca28,
        codeStates['scheduler_retry_grp8ca28'] = scheduler_retry_grp8ca28Props,
        codeStates['setscheduler_retry_grp8ca28'] = setscheduler_retry_grp8ca28Props,
        codeStates['ownership_ststus_grp'] = ownership_ststus_grpbc00a,
        codeStates['setownership_ststus_grp'] = setownership_ststus_grpbc00a,
        codeStates['ownership_ststus_grpbc00a'] = ownership_ststus_grpbc00aProps,
        codeStates['setownership_ststus_grpbc00a'] = setownership_ststus_grpbc00aProps,
        codeStates['last_run_grp'] = last_run_grpc3967,
        codeStates['setlast_run_grp'] = setlast_run_grpc3967,
        codeStates['last_run_grpc3967'] = last_run_grpc3967Props,
        codeStates['setlast_run_grpc3967'] = setlast_run_grpc3967Props,
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
        "32ff723c36636ca1014c7e0b44f1b893",
        "068387c34c44de3f44e990a8e496bf66"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:viewIntegrationSource:AFVK:v1",
      //     componentId: "32ff723c36636ca1014c7e0b44f1b893",
      //     controlId: "068387c34c44de3f44e990a8e496bf66",
      //     isTable: false,
      //     from:"TextInputbase_url",
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
        setDynamicStateandType({name:'base_url', type: 'number'});
      }
      // if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      // if(orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties){
      //   let type:any={name:'base_url',type:'text'};
      //   type={
      //     name:'base_url',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.base_url.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.base_url.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.base_url.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
      //   if(orchestrationData?.data?.schemaData?.at(0)?.schema.properties){
      //   let type:any={name:'base_url',type:'text'};
      //   type={
      //     name:'base_url',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.properties.base_url.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.base_url.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.base_url.type
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
  const connect_group1b893Ref = useRef<any>(connect_group1b893);
  useEffect(() => { connect_group1b893Ref.current = connect_group1b893; }, [connect_group1b893]);
  useEffect(()=>{
      handleMapperValue();
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "068387c34c44de3f44e990a8e496bf66") {
        handleChange({target:{value:connect_group1b893Ref?.current?.base_url||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "068387c34c44de3f44e990a8e496bf66") {
        handleBlur({target:{value:connect_group1b893Ref?.current?.base_url||""}});
      }
    };
    eventBus.on("triggerElement|onChange", handlerChange);
    eventBus.on("triggerElement|onBlur", handlerBlur);
    return () => {
      eventBus.off("triggerElement|onChange", handlerChange);
      eventBus.off("triggerElement|onBlur", handlerBlur);
    };
  },[validateRefetch.value])
  if (base_url6bf66?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `1 / 13`,gridRow: `9 / 21`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className=""
        label={keyset("")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={false}
        type={dynamicStateandType.type}
        value={connect_group1b893?.base_url||""}
         disabled= {base_url6bf66?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='Enter Url'      
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="Base Url"
      errorMessage={error}
        validationState={validate?.viewIntegrationSource_v1?.base_url ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputbase_url
