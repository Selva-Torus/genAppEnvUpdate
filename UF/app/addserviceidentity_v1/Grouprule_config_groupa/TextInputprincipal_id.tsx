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

const TextInputprincipal_id = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
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
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'principal_id',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {info_group9d912, setinfo_group9d912}= useContext(TotalContext) as TotalContextProps;
  const {info_group9d912Props, setinfo_group9d912Props}= useContext(TotalContext) as TotalContextProps;
  const {groupe6728, setgroupe6728}= useContext(TotalContext) as TotalContextProps;
  const {groupe6728Props, setgroupe6728Props}= useContext(TotalContext) as TotalContextProps;
  const {rule_config_groupa7e53e, setrule_config_groupa7e53e}= useContext(TotalContext) as TotalContextProps;
  const {rule_config_groupa7e53eProps, setrule_config_groupa7e53eProps}= useContext(TotalContext) as TotalContextProps;
  const {info_rule8c9ca, setinfo_rule8c9ca}= useContext(TotalContext) as TotalContextProps;
  const {asset_name7bcd2, setasset_name7bcd2}= useContext(TotalContext) as TotalContextProps;
  const {principal_typee2125, setprincipal_typee2125}= useContext(TotalContext) as TotalContextProps;
  const {principal_id014c3, setprincipal_id014c3}= useContext(TotalContext) as TotalContextProps;
  const {identity_provider06648, setidentity_provider06648}= useContext(TotalContext) as TotalContextProps;
  const {rule_config_group98282, setrule_config_group98282}= useContext(TotalContext) as TotalContextProps;
  const {rule_config_group98282Props, setrule_config_group98282Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions5796b, setdynamicactions5796b}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions5796bProps, setdynamicactions5796bProps}= useContext(TotalContext) as TotalContextProps;
  

  // Validation  
    const [error, setError] = useState<string>('');

  schemaArray = [
  "v.string()",
  "v.nonEmpty('This field is required.')"
] ;
    const schema : any  = v.pipe(    v.string(),
    v.nonEmpty('This field is required.'),
)
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
    if(e.target.value=="")
    {
      setIsRequredData(true)
    }else{
      setIsRequredData(false)
    }
      let validate:any;    
      setError('');
      setValidate((pre:any)=>({...pre,addServiceIdentity_v1:{...pre?.addServiceIdentity_v1,principal_id:undefined}}));
    if(dynamicStateandType.type=="number"){
    setrule_config_groupa7e53e((prev: any) => ({ ...prev, principal_id: +e.target.value }));
    validate = v.safeParse(schema, +e.target.value);
    }
    else{
    setrule_config_groupa7e53e((prev: any) => ({ ...prev, principal_id: e.target.value }));
    validate = v.safeParse(schema, e.target.value);
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['info_group'] = info_group9d912,
        codeStates['setinfo_group'] = setinfo_group9d912,
        codeStates['info_group9d912'] = info_group9d912Props,
        codeStates['setinfo_group9d912'] = setinfo_group9d912Props,
        codeStates['group'] = groupe6728,
        codeStates['setgroup'] = setgroupe6728,
        codeStates['groupe6728'] = groupe6728Props,
        codeStates['setgroupe6728'] = setgroupe6728Props,
        codeStates['rule_config_groupa'] = rule_config_groupa7e53e,
        codeStates['setrule_config_groupa'] = setrule_config_groupa7e53e,
        codeStates['rule_config_groupa7e53e'] = rule_config_groupa7e53eProps,
        codeStates['setrule_config_groupa7e53e'] = setrule_config_groupa7e53eProps,
        codeStates['info_rule'] = info_rule8c9ca,
        codeStates['setinfo_rule'] = setinfo_rule8c9ca,
        codeStates['asset_name'] = asset_name7bcd2,
        codeStates['setasset_name'] = setasset_name7bcd2,
        codeStates['principal_type'] = principal_typee2125,
        codeStates['setprincipal_type'] = setprincipal_typee2125,
        codeStates['principal_id'] = principal_id014c3,
        codeStates['setprincipal_id'] = setprincipal_id014c3,
        codeStates['identity_provider'] = identity_provider06648,
        codeStates['setidentity_provider'] = setidentity_provider06648,
        codeStates['rule_config_group'] = rule_config_group98282,
        codeStates['setrule_config_group'] = setrule_config_group98282,
        codeStates['rule_config_group98282'] = rule_config_group98282Props,
        codeStates['setrule_config_group98282'] = setrule_config_group98282Props,
        codeStates['dynamicactions'] = dynamicactions5796b,
        codeStates['setdynamicactions'] = setdynamicactions5796b,
        codeStates['dynamicactions5796b'] = dynamicactions5796bProps,
        codeStates['setdynamicactions5796b'] = setdynamicactions5796bProps,
    codeExecution(code,codeStates);
    }  
    if(!validate?.success){
      return
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
      if(rule_config_groupa7e53e?.principal_id == "" || rule_config_groupa7e53e?.principal_id == undefined){
      rule_config_groupa7e53e.principal_id = "";
     if(dynamicStateandType.type=="number"){
          validate = v.safeParse(schema, NaN);
        }
        else{
          validate = v.safeParse(schema, rule_config_groupa7e53e?.principal_id);
        }
        if(!validate.success){
          setError(validate?.issues[0]?.message);
          setValidate((pre:any)=>({...pre,addServiceIdentity_v1:{...pre?.addServiceIdentity_v1,principal_id:"invalid"}}));
        }
    }else if(rule_config_groupa7e53e?.principal_id !== ""){
   if(dynamicStateandType.type=="number"){
          validate = v.safeParse(schema, +rule_config_groupa7e53e?.principal_id);
        }
        else{
          validate = v.safeParse(schema, rule_config_groupa7e53e?.principal_id);
        }
    if(!validate.success){
      setError(validate?.issues[0]?.message);
      setValidate((pre:any)=>({...pre,addServiceIdentity_v1:{...pre?.addServiceIdentity_v1,principal_id:"invalid"}}));
    }else{
      setError('');
      setValidate((pre:any)=>({...pre,addServiceIdentity_v1:{...pre?.addServiceIdentity_v1,principal_id:undefined}}));
    }
    }
    if(!validate?.success){
      return
    }
  }
  const handleBlur=async (e?:any) => {
      let validate:any
      if(rule_config_groupa7e53e?.principal_id == "" || rule_config_groupa7e53e?.principal_id == undefined){
      rule_config_groupa7e53e.principal_id = "";
     if(dynamicStateandType.type=="number"){
          validate = v.safeParse(schema, NaN);
        }
        else{
          validate = v.safeParse(schema, rule_config_groupa7e53e?.principal_id);
        }
        if(!validate.success){
          setError(validate?.issues[0]?.message);
          setValidate((pre:any)=>({...pre,addServiceIdentity_v1:{...pre?.addServiceIdentity_v1,principal_id:"invalid"}}));
        }
    }else if(rule_config_groupa7e53e?.principal_id !== ""){
   if(dynamicStateandType.type=="number"){
          validate = v.safeParse(schema, +rule_config_groupa7e53e?.principal_id);
        }
        else{
          validate = v.safeParse(schema, rule_config_groupa7e53e?.principal_id);
        }
    if(!validate.success){
      setError(validate?.issues[0]?.message);
      setValidate((pre:any)=>({...pre,addServiceIdentity_v1:{...pre?.addServiceIdentity_v1,principal_id:"invalid"}}));
    }else{
      setError('');
      setValidate((pre:any)=>({...pre,addServiceIdentity_v1:{...pre?.addServiceIdentity_v1,principal_id:undefined}}));
    }
    }
    if(!validate?.success){
      return
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
  const handleMapperValue=async()=>{
    try{
      const orchestrationData:any = getControlOrchestrationData(
        controlData,
        "2625f75e8e7d98ce085e0d93bb67e53e",
        "6df8d9aa3a1c48f9a41f639b674014c3"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:addServiceIdentity:AFVK:v1",
      //     componentId: "2625f75e8e7d98ce085e0d93bb67e53e",
      //     controlId: "6df8d9aa3a1c48f9a41f639b674014c3",
      //     isTable: false,
      //     from:"TextInputprincipal_id",
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
        setDynamicStateandType({name:'principal_id', type: 'number'});
      }
      // if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      // if(orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties){
      //   let type:any={name:'principal_id',type:'text'};
      //   type={
      //     name:'principal_id',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.principal_id.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.principal_id.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.principal_id.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
      //   if(orchestrationData?.data?.schemaData?.at(0)?.schema.properties){
      //   let type:any={name:'principal_id',type:'text'};
      //   type={
      //     name:'principal_id',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.properties.principal_id.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.principal_id.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.principal_id.type
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
  const rule_config_groupa7e53eRef = useRef<any>(rule_config_groupa7e53e);
  useEffect(() => { rule_config_groupa7e53eRef.current = rule_config_groupa7e53e; }, [rule_config_groupa7e53e]);
  useEffect(()=>{
      handleMapperValue();
      if(!rule_config_groupa7e53e?.principal_id)
      {
        setrule_config_groupa7e53eProps((pre:any)=>({...pre,required:true}));
        setIsRequredData(true);
      }
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "6df8d9aa3a1c48f9a41f639b674014c3") {
        handleChange({target:{value:rule_config_groupa7e53eRef?.current?.principal_id||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "6df8d9aa3a1c48f9a41f639b674014c3") {
        handleBlur({target:{value:rule_config_groupa7e53eRef?.current?.principal_id||""}});
      }
    };
    eventBus.on("triggerElement|onChange", handlerChange);
    eventBus.on("triggerElement|onBlur", handlerBlur);
    return () => {
      eventBus.off("triggerElement|onChange", handlerChange);
      eventBus.off("triggerElement|onBlur", handlerBlur);
    };
  },[validateRefetch.value])
  if (principal_id014c3?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `1 / 13`,gridRow: `24 / 36`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className=""
        label={keyset("")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={false}
        type={dynamicStateandType.type}
        value={rule_config_groupa7e53e?.principal_id||""}
         disabled= {principal_id014c3?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='Enter principal id'      
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="Principal Id"
      errorMessage={error}
        validationState={validate?.addServiceIdentity_v1?.principal_id ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputprincipal_id
