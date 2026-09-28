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

const TextInputtarget_entity = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
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
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'target_entity',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {add_field_map_grp74a39, setadd_field_map_grp74a39}= useContext(TotalContext) as TotalContextProps;
  const {add_field_map_grp74a39Props, setadd_field_map_grp74a39Props}= useContext(TotalContext) as TotalContextProps;
  const {source_mapping_grp99571, setsource_mapping_grp99571}= useContext(TotalContext) as TotalContextProps;
  const {source_mapping_grp99571Props, setsource_mapping_grp99571Props}= useContext(TotalContext) as TotalContextProps;
  const {target_mapping_grp841a3, settarget_mapping_grp841a3}= useContext(TotalContext) as TotalContextProps;
  const {target_mapping_grp841a3Props, settarget_mapping_grp841a3Props}= useContext(TotalContext) as TotalContextProps;
  const {target_mapping_text48064, settarget_mapping_text48064}= useContext(TotalContext) as TotalContextProps;
  const {target_entity5199b, settarget_entity5199b}= useContext(TotalContext) as TotalContextProps;
  const {target_attributebbe60, settarget_attributebbe60}= useContext(TotalContext) as TotalContextProps;
  const {transformation_grp75a9a, settransformation_grp75a9a}= useContext(TotalContext) as TotalContextProps;
  const {transformation_grp75a9aProps, settransformation_grp75a9aProps}= useContext(TotalContext) as TotalContextProps;
  const {field_rules_grp2cb2f, setfield_rules_grp2cb2f}= useContext(TotalContext) as TotalContextProps;
  const {field_rules_grp2cb2fProps, setfield_rules_grp2cb2fProps}= useContext(TotalContext) as TotalContextProps;
  

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
      setValidate((pre:any)=>({...pre,viewIntegrationFieldMap_v1:{...pre?.viewIntegrationFieldMap_v1,target_entity:undefined}}));
    if(dynamicStateandType.type=="number"){
    settarget_mapping_grp841a3((prev: any) => ({ ...prev, target_entity: +e.target.value }));
    }
    else{
    settarget_mapping_grp841a3((prev: any) => ({ ...prev, target_entity: e.target.value }));
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['add_field_map_grp'] = add_field_map_grp74a39,
        codeStates['setadd_field_map_grp'] = setadd_field_map_grp74a39,
        codeStates['add_field_map_grp74a39'] = add_field_map_grp74a39Props,
        codeStates['setadd_field_map_grp74a39'] = setadd_field_map_grp74a39Props,
        codeStates['source_mapping_grp'] = source_mapping_grp99571,
        codeStates['setsource_mapping_grp'] = setsource_mapping_grp99571,
        codeStates['source_mapping_grp99571'] = source_mapping_grp99571Props,
        codeStates['setsource_mapping_grp99571'] = setsource_mapping_grp99571Props,
        codeStates['target_mapping_grp'] = target_mapping_grp841a3,
        codeStates['settarget_mapping_grp'] = settarget_mapping_grp841a3,
        codeStates['target_mapping_grp841a3'] = target_mapping_grp841a3Props,
        codeStates['settarget_mapping_grp841a3'] = settarget_mapping_grp841a3Props,
        codeStates['target_mapping_text'] = target_mapping_text48064,
        codeStates['settarget_mapping_text'] = settarget_mapping_text48064,
        codeStates['target_entity'] = target_entity5199b,
        codeStates['settarget_entity'] = settarget_entity5199b,
        codeStates['target_attribute'] = target_attributebbe60,
        codeStates['settarget_attribute'] = settarget_attributebbe60,
        codeStates['transformation_grp'] = transformation_grp75a9a,
        codeStates['settransformation_grp'] = settransformation_grp75a9a,
        codeStates['transformation_grp75a9a'] = transformation_grp75a9aProps,
        codeStates['settransformation_grp75a9a'] = settransformation_grp75a9aProps,
        codeStates['field_rules_grp'] = field_rules_grp2cb2f,
        codeStates['setfield_rules_grp'] = setfield_rules_grp2cb2f,
        codeStates['field_rules_grp2cb2f'] = field_rules_grp2cb2fProps,
        codeStates['setfield_rules_grp2cb2f'] = setfield_rules_grp2cb2fProps,
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
        "6921e26df034e1baf00d02ea803841a3",
        "ef603d86847ef8bd44ca4f24e9d5199b"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:viewIntegrationFieldMap:AFVK:v1",
      //     componentId: "6921e26df034e1baf00d02ea803841a3",
      //     controlId: "ef603d86847ef8bd44ca4f24e9d5199b",
      //     isTable: false,
      //     from:"TextInputtarget_entity",
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
        setDynamicStateandType({name:'target_entity', type: 'number'});
      }
      // if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      // if(orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties){
      //   let type:any={name:'target_entity',type:'text'};
      //   type={
      //     name:'target_entity',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.target_entity.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.target_entity.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.target_entity.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
      //   if(orchestrationData?.data?.schemaData?.at(0)?.schema.properties){
      //   let type:any={name:'target_entity',type:'text'};
      //   type={
      //     name:'target_entity',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.properties.target_entity.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.target_entity.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.target_entity.type
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
  const target_mapping_grp841a3Ref = useRef<any>(target_mapping_grp841a3);
  useEffect(() => { target_mapping_grp841a3Ref.current = target_mapping_grp841a3; }, [target_mapping_grp841a3]);
  useEffect(()=>{
      handleMapperValue();
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "ef603d86847ef8bd44ca4f24e9d5199b") {
        handleChange({target:{value:target_mapping_grp841a3Ref?.current?.target_entity||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "ef603d86847ef8bd44ca4f24e9d5199b") {
        handleBlur({target:{value:target_mapping_grp841a3Ref?.current?.target_entity||""}});
      }
    };
    eventBus.on("triggerElement|onChange", handlerChange);
    eventBus.on("triggerElement|onBlur", handlerBlur);
    return () => {
      eventBus.off("triggerElement|onChange", handlerChange);
      eventBus.off("triggerElement|onBlur", handlerBlur);
    };
  },[validateRefetch.value])
  if (target_entity5199b?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `1 / 13`,gridRow: `12 / 23`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className=""
        label={keyset("")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={false}
        type={dynamicStateandType.type}
        value={target_mapping_grp841a3?.target_entity||""}
         disabled= {target_entity5199b?.isDisabled ? true : false}
        pin='brick-brick'     
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="Target Entity"
      errorMessage={error}
        validationState={validate?.viewIntegrationFieldMap_v1?.target_entity ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputtarget_entity
