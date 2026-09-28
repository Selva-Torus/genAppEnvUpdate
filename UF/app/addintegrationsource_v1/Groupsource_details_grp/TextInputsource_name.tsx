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

const TextInputsource_name = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
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
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:integrationSource:AFVK:v1|00451184fbfc4a2b8af19d45b97c9512|properties.source_name"
      ],
      "targetKey": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:addIntegrationSource:AFVK:v1|1db44e8af89f4ac7aec2c096fa723dfd|97ee025a5542483588b782484e1ec826"
    }
  ],
  "dfdKey": "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:integrationSource:AFVK:v1:",
  "schemaData": {
    "type": "string"
  },
  "dataType": "string"
}
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_integrationsource_v1Props, setdfd_integrationsource_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  const toast : Function = useInfoMsg()
  const keyset : Function = i18n.keyset("language");
  const [allCode,setAllCode]=useState<string>("");
  let schemaArray :string[] =[];
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'source_name',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {add_group9cddc, setadd_group9cddc}= useContext(TotalContext) as TotalContextProps;
  const {add_group9cddcProps, setadd_group9cddcProps}= useContext(TotalContext) as TotalContextProps;
  const {source_details_grp23dfd, setsource_details_grp23dfd}= useContext(TotalContext) as TotalContextProps;
  const {source_details_grp23dfdProps, setsource_details_grp23dfdProps}= useContext(TotalContext) as TotalContextProps;
  const {source_detail_textaaaf2, setsource_detail_textaaaf2}= useContext(TotalContext) as TotalContextProps;
  const {source_code94d5a, setsource_code94d5a}= useContext(TotalContext) as TotalContextProps;
  const {source_nameec826, setsource_nameec826}= useContext(TotalContext) as TotalContextProps;
  const {source_category_codefd590, setsource_category_codefd590}= useContext(TotalContext) as TotalContextProps;
  const {connector_type_code9620d, setconnector_type_code9620d}= useContext(TotalContext) as TotalContextProps;
  const {connect_group3616a, setconnect_group3616a}= useContext(TotalContext) as TotalContextProps;
  const {connect_group3616aProps, setconnect_group3616aProps}= useContext(TotalContext) as TotalContextProps;
  const {scheduler_retry_grp90aeb, setscheduler_retry_grp90aeb}= useContext(TotalContext) as TotalContextProps;
  const {scheduler_retry_grp90aebProps, setscheduler_retry_grp90aebProps}= useContext(TotalContext) as TotalContextProps;
  const {ownership_ststus_grp32249, setownership_ststus_grp32249}= useContext(TotalContext) as TotalContextProps;
  const {ownership_ststus_grp32249Props, setownership_ststus_grp32249Props}= useContext(TotalContext) as TotalContextProps;
  const {last_run_grpa6d98, setlast_run_grpa6d98}= useContext(TotalContext) as TotalContextProps;
  const {last_run_grpa6d98Props, setlast_run_grpa6d98Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions2cac6, setdynamicactions2cac6}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions2cac6Props, setdynamicactions2cac6Props}= useContext(TotalContext) as TotalContextProps;
  

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
      setValidate((pre:any)=>({...pre,addIntegrationSource_v1:{...pre?.addIntegrationSource_v1,source_name:undefined}}));
    if(dynamicStateandType.type=="number"){
    setsource_details_grp23dfd((prev: any) => ({ ...prev, source_name: +e.target.value }));
    }
    else{
    setsource_details_grp23dfd((prev: any) => ({ ...prev, source_name: e.target.value }));
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['add_group'] = add_group9cddc,
        codeStates['setadd_group'] = setadd_group9cddc,
        codeStates['add_group9cddc'] = add_group9cddcProps,
        codeStates['setadd_group9cddc'] = setadd_group9cddcProps,
        codeStates['source_details_grp'] = source_details_grp23dfd,
        codeStates['setsource_details_grp'] = setsource_details_grp23dfd,
        codeStates['source_details_grp23dfd'] = source_details_grp23dfdProps,
        codeStates['setsource_details_grp23dfd'] = setsource_details_grp23dfdProps,
        codeStates['source_detail_text'] = source_detail_textaaaf2,
        codeStates['setsource_detail_text'] = setsource_detail_textaaaf2,
        codeStates['source_code'] = source_code94d5a,
        codeStates['setsource_code'] = setsource_code94d5a,
        codeStates['source_name'] = source_nameec826,
        codeStates['setsource_name'] = setsource_nameec826,
        codeStates['source_category_code'] = source_category_codefd590,
        codeStates['setsource_category_code'] = setsource_category_codefd590,
        codeStates['connector_type_code'] = connector_type_code9620d,
        codeStates['setconnector_type_code'] = setconnector_type_code9620d,
        codeStates['connect_group'] = connect_group3616a,
        codeStates['setconnect_group'] = setconnect_group3616a,
        codeStates['connect_group3616a'] = connect_group3616aProps,
        codeStates['setconnect_group3616a'] = setconnect_group3616aProps,
        codeStates['scheduler_retry_grp'] = scheduler_retry_grp90aeb,
        codeStates['setscheduler_retry_grp'] = setscheduler_retry_grp90aeb,
        codeStates['scheduler_retry_grp90aeb'] = scheduler_retry_grp90aebProps,
        codeStates['setscheduler_retry_grp90aeb'] = setscheduler_retry_grp90aebProps,
        codeStates['ownership_ststus_grp'] = ownership_ststus_grp32249,
        codeStates['setownership_ststus_grp'] = setownership_ststus_grp32249,
        codeStates['ownership_ststus_grp32249'] = ownership_ststus_grp32249Props,
        codeStates['setownership_ststus_grp32249'] = setownership_ststus_grp32249Props,
        codeStates['last_run_grp'] = last_run_grpa6d98,
        codeStates['setlast_run_grp'] = setlast_run_grpa6d98,
        codeStates['last_run_grpa6d98'] = last_run_grpa6d98Props,
        codeStates['setlast_run_grpa6d98'] = setlast_run_grpa6d98Props,
        codeStates['dynamicactions'] = dynamicactions2cac6,
        codeStates['setdynamicactions'] = setdynamicactions2cac6,
        codeStates['dynamicactions2cac6'] = dynamicactions2cac6Props,
        codeStates['setdynamicactions2cac6'] = setdynamicactions2cac6Props,
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
        "1db44e8af89f4ac7aec2c096fa723dfd",
        "97ee025a5542483588b782484e1ec826"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:addIntegrationSource:AFVK:v1",
      //     componentId: "1db44e8af89f4ac7aec2c096fa723dfd",
      //     controlId: "97ee025a5542483588b782484e1ec826",
      //     isTable: false,
      //     from:"TextInputsource_name",
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
        setDynamicStateandType({name:'source_name', type: 'number'});
      }
      // if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      // if(orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties){
      //   let type:any={name:'source_name',type:'text'};
      //   type={
      //     name:'source_name',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.source_name.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.source_name.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.source_name.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
      //   if(orchestrationData?.data?.schemaData?.at(0)?.schema.properties){
      //   let type:any={name:'source_name',type:'text'};
      //   type={
      //     name:'source_name',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.properties.source_name.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.source_name.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.source_name.type
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
  const source_details_grp23dfdRef = useRef<any>(source_details_grp23dfd);
  useEffect(() => { source_details_grp23dfdRef.current = source_details_grp23dfd; }, [source_details_grp23dfd]);
  useEffect(()=>{
      handleMapperValue();
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "97ee025a5542483588b782484e1ec826") {
        handleChange({target:{value:source_details_grp23dfdRef?.current?.source_name||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "97ee025a5542483588b782484e1ec826") {
        handleBlur({target:{value:source_details_grp23dfdRef?.current?.source_name||""}});
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
  if(dfd_integrationsource_v1Props?.setSearchFilters && dfd_integrationsource_v1Props?.data)
  {
    if(Array.isArray(dfd_integrationsource_v1Props.data) && dfd_integrationsource_v1Props.data.length > 0){
      setsource_details_grp23dfd((pre:any)=>({...pre,source_name:dfd_integrationsource_v1Props.data[0]?.source_name}));
    }
  }
  },[dfd_integrationsource_v1Props?.setSearchFilters])
  if (source_nameec826?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `13 / 25`,gridRow: `9 / 19`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className=""
        label={keyset("")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={false}
        type={dynamicStateandType.type}
        value={source_details_grp23dfd?.source_name||""}
         disabled= {source_nameec826?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='Enter Source Name'      
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="Source Name"
      errorMessage={error}
        validationState={validate?.addIntegrationSource_v1?.source_name ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputsource_name
