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

const TextInputsource_field_path = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
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
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'source_field_path',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {add_field_map_grp9e14b, setadd_field_map_grp9e14b}= useContext(TotalContext) as TotalContextProps;
  const {add_field_map_grp9e14bProps, setadd_field_map_grp9e14bProps}= useContext(TotalContext) as TotalContextProps;
  const {source_mapping_grp4af45, setsource_mapping_grp4af45}= useContext(TotalContext) as TotalContextProps;
  const {source_mapping_grp4af45Props, setsource_mapping_grp4af45Props}= useContext(TotalContext) as TotalContextProps;
  const {source_mappingdbdb2, setsource_mappingdbdb2}= useContext(TotalContext) as TotalContextProps;
  const {source_name4a9d8, setsource_name4a9d8}= useContext(TotalContext) as TotalContextProps;
  const {source_field_path2b239, setsource_field_path2b239}= useContext(TotalContext) as TotalContextProps;
  const {target_mapping_grpa2fc8, settarget_mapping_grpa2fc8}= useContext(TotalContext) as TotalContextProps;
  const {target_mapping_grpa2fc8Props, settarget_mapping_grpa2fc8Props}= useContext(TotalContext) as TotalContextProps;
  const {transformation_grp78a0e, settransformation_grp78a0e}= useContext(TotalContext) as TotalContextProps;
  const {transformation_grp78a0eProps, settransformation_grp78a0eProps}= useContext(TotalContext) as TotalContextProps;
  const {field_rules_grp65d55, setfield_rules_grp65d55}= useContext(TotalContext) as TotalContextProps;
  const {field_rules_grp65d55Props, setfield_rules_grp65d55Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsd2b2c, setdynamicactionsd2b2c}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsd2b2cProps, setdynamicactionsd2b2cProps}= useContext(TotalContext) as TotalContextProps;
  

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
      setValidate((pre:any)=>({...pre,addIntegrationFieldMap_v1:{...pre?.addIntegrationFieldMap_v1,source_field_path:undefined}}));
    if(dynamicStateandType.type=="number"){
    setsource_mapping_grp4af45((prev: any) => ({ ...prev, source_field_path: +e.target.value }));
    }
    else{
    setsource_mapping_grp4af45((prev: any) => ({ ...prev, source_field_path: e.target.value }));
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['add_field_map_grp'] = add_field_map_grp9e14b,
        codeStates['setadd_field_map_grp'] = setadd_field_map_grp9e14b,
        codeStates['add_field_map_grp9e14b'] = add_field_map_grp9e14bProps,
        codeStates['setadd_field_map_grp9e14b'] = setadd_field_map_grp9e14bProps,
        codeStates['source_mapping_grp'] = source_mapping_grp4af45,
        codeStates['setsource_mapping_grp'] = setsource_mapping_grp4af45,
        codeStates['source_mapping_grp4af45'] = source_mapping_grp4af45Props,
        codeStates['setsource_mapping_grp4af45'] = setsource_mapping_grp4af45Props,
        codeStates['source_mapping'] = source_mappingdbdb2,
        codeStates['setsource_mapping'] = setsource_mappingdbdb2,
        codeStates['source_name'] = source_name4a9d8,
        codeStates['setsource_name'] = setsource_name4a9d8,
        codeStates['source_field_path'] = source_field_path2b239,
        codeStates['setsource_field_path'] = setsource_field_path2b239,
        codeStates['target_mapping_grp'] = target_mapping_grpa2fc8,
        codeStates['settarget_mapping_grp'] = settarget_mapping_grpa2fc8,
        codeStates['target_mapping_grpa2fc8'] = target_mapping_grpa2fc8Props,
        codeStates['settarget_mapping_grpa2fc8'] = settarget_mapping_grpa2fc8Props,
        codeStates['transformation_grp'] = transformation_grp78a0e,
        codeStates['settransformation_grp'] = settransformation_grp78a0e,
        codeStates['transformation_grp78a0e'] = transformation_grp78a0eProps,
        codeStates['settransformation_grp78a0e'] = settransformation_grp78a0eProps,
        codeStates['field_rules_grp'] = field_rules_grp65d55,
        codeStates['setfield_rules_grp'] = setfield_rules_grp65d55,
        codeStates['field_rules_grp65d55'] = field_rules_grp65d55Props,
        codeStates['setfield_rules_grp65d55'] = setfield_rules_grp65d55Props,
        codeStates['dynamicactions'] = dynamicactionsd2b2c,
        codeStates['setdynamicactions'] = setdynamicactionsd2b2c,
        codeStates['dynamicactionsd2b2c'] = dynamicactionsd2b2cProps,
        codeStates['setdynamicactionsd2b2c'] = setdynamicactionsd2b2cProps,
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
        "bd6ca0e0415a4b3ebf1931107754af45",
        "2b606eaac0564419a28838108932b239"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:addIntegrationFieldMap:AFVK:v1",
      //     componentId: "bd6ca0e0415a4b3ebf1931107754af45",
      //     controlId: "2b606eaac0564419a28838108932b239",
      //     isTable: false,
      //     from:"TextInputsource_field_path",
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
        setDynamicStateandType({name:'source_field_path', type: 'number'});
      }
      // if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      // if(orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties){
      //   let type:any={name:'source_field_path',type:'text'};
      //   type={
      //     name:'source_field_path',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.source_field_path.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.source_field_path.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.source_field_path.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
      //   if(orchestrationData?.data?.schemaData?.at(0)?.schema.properties){
      //   let type:any={name:'source_field_path',type:'text'};
      //   type={
      //     name:'source_field_path',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.properties.source_field_path.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.source_field_path.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.source_field_path.type
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
  const source_mapping_grp4af45Ref = useRef<any>(source_mapping_grp4af45);
  useEffect(() => { source_mapping_grp4af45Ref.current = source_mapping_grp4af45; }, [source_mapping_grp4af45]);
  useEffect(()=>{
      handleMapperValue();
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "2b606eaac0564419a28838108932b239") {
        handleChange({target:{value:source_mapping_grp4af45Ref?.current?.source_field_path||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "2b606eaac0564419a28838108932b239") {
        handleBlur({target:{value:source_mapping_grp4af45Ref?.current?.source_field_path||""}});
      }
    };
    eventBus.on("triggerElement|onChange", handlerChange);
    eventBus.on("triggerElement|onBlur", handlerBlur);
    return () => {
      eventBus.off("triggerElement|onChange", handlerChange);
      eventBus.off("triggerElement|onBlur", handlerBlur);
    };
  },[validateRefetch.value])
  if (source_field_path2b239?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `13 / 25`,gridRow: `12 / 25`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className=""
        label={keyset("")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={false}
        type={dynamicStateandType.type}
        value={source_mapping_grp4af45?.source_field_path||""}
         disabled= {source_field_path2b239?.isDisabled ? true : false}
        pin='brick-brick'     
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="Source Field Path"
      errorMessage={error}
        validationState={validate?.addIntegrationFieldMap_v1?.source_field_path ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputsource_field_path
