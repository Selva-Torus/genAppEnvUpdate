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

const TextInputvault_path = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
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
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:credentialRef:AFVK:v1|73c4e1e40ca240658574afa99cade004|properties.vault_path"
      ],
      "targetKey": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:addCredentialRef:AFVK:v1|a95baa59e6c98d0cf1ca8ba6d79383de|f917145fc1e66c390ce09f1b9d79e7b6"
    }
  ],
  "dfdKey": "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:credentialRef:AFVK:v1:",
  "schemaData": {
    "type": "string"
  },
  "dataType": "string"
}
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_credentialref_v1Props, setdfd_credentialref_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  const toast : Function = useInfoMsg()
  const keyset : Function = i18n.keyset("language");
  const [allCode,setAllCode]=useState<string>("");
  let schemaArray :string[] =[];
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'vault_path',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {overall_group28e6a, setoverall_group28e6a}= useContext(TotalContext) as TotalContextProps;
  const {overall_group28e6aProps, setoverall_group28e6aProps}= useContext(TotalContext) as TotalContextProps;
  const {action_details_group24206, setaction_details_group24206}= useContext(TotalContext) as TotalContextProps;
  const {action_details_group24206Props, setaction_details_group24206Props}= useContext(TotalContext) as TotalContextProps;
  const {action_detail_group383de, setaction_detail_group383de}= useContext(TotalContext) as TotalContextProps;
  const {action_detail_group383deProps, setaction_detail_group383deProps}= useContext(TotalContext) as TotalContextProps;
  const {asset_identity_text33aac, setasset_identity_text33aac}= useContext(TotalContext) as TotalContextProps;
  const {ref_named954f, setref_named954f}= useContext(TotalContext) as TotalContextProps;
  const {vault_path9e7b6, setvault_path9e7b6}= useContext(TotalContext) as TotalContextProps;
  const {credential_typea9a6a, setcredential_typea9a6a}= useContext(TotalContext) as TotalContextProps;
  const {status7b256, setstatus7b256}= useContext(TotalContext) as TotalContextProps;
  const {risk_conf_group5fe07, setrisk_conf_group5fe07}= useContext(TotalContext) as TotalContextProps;
  const {risk_conf_group5fe07Props, setrisk_conf_group5fe07Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions9ea03, setdynamicactions9ea03}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions9ea03Props, setdynamicactions9ea03Props}= useContext(TotalContext) as TotalContextProps;
  

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
      setValidate((pre:any)=>({...pre,addCredentialRef_v1:{...pre?.addCredentialRef_v1,vault_path:undefined}}));
    if(dynamicStateandType.type=="number"){
    setaction_detail_group383de((prev: any) => ({ ...prev, vault_path: +e.target.value }));
    validate = v.safeParse(schema, +e.target.value);
    }
    else{
    setaction_detail_group383de((prev: any) => ({ ...prev, vault_path: e.target.value }));
    validate = v.safeParse(schema, e.target.value);
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['overall_group'] = overall_group28e6a,
        codeStates['setoverall_group'] = setoverall_group28e6a,
        codeStates['overall_group28e6a'] = overall_group28e6aProps,
        codeStates['setoverall_group28e6a'] = setoverall_group28e6aProps,
        codeStates['action_details_group'] = action_details_group24206,
        codeStates['setaction_details_group'] = setaction_details_group24206,
        codeStates['action_details_group24206'] = action_details_group24206Props,
        codeStates['setaction_details_group24206'] = setaction_details_group24206Props,
        codeStates['action_detail_group'] = action_detail_group383de,
        codeStates['setaction_detail_group'] = setaction_detail_group383de,
        codeStates['action_detail_group383de'] = action_detail_group383deProps,
        codeStates['setaction_detail_group383de'] = setaction_detail_group383deProps,
        codeStates['asset_identity_text'] = asset_identity_text33aac,
        codeStates['setasset_identity_text'] = setasset_identity_text33aac,
        codeStates['ref_name'] = ref_named954f,
        codeStates['setref_name'] = setref_named954f,
        codeStates['vault_path'] = vault_path9e7b6,
        codeStates['setvault_path'] = setvault_path9e7b6,
        codeStates['credential_type'] = credential_typea9a6a,
        codeStates['setcredential_type'] = setcredential_typea9a6a,
        codeStates['status'] = status7b256,
        codeStates['setstatus'] = setstatus7b256,
        codeStates['risk_conf_group'] = risk_conf_group5fe07,
        codeStates['setrisk_conf_group'] = setrisk_conf_group5fe07,
        codeStates['risk_conf_group5fe07'] = risk_conf_group5fe07Props,
        codeStates['setrisk_conf_group5fe07'] = setrisk_conf_group5fe07Props,
        codeStates['dynamicactions'] = dynamicactions9ea03,
        codeStates['setdynamicactions'] = setdynamicactions9ea03,
        codeStates['dynamicactions9ea03'] = dynamicactions9ea03Props,
        codeStates['setdynamicactions9ea03'] = setdynamicactions9ea03Props,
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
      if(action_detail_group383de?.vault_path == "" || action_detail_group383de?.vault_path == undefined){
      action_detail_group383de.vault_path = "";
     if(dynamicStateandType.type=="number"){
          validate = v.safeParse(schema, NaN);
        }
        else{
          validate = v.safeParse(schema, action_detail_group383de?.vault_path);
        }
        if(!validate.success){
          setError(validate?.issues[0]?.message);
          setValidate((pre:any)=>({...pre,addCredentialRef_v1:{...pre?.addCredentialRef_v1,vault_path:"invalid"}}));
        }
    }else if(action_detail_group383de?.vault_path !== ""){
   if(dynamicStateandType.type=="number"){
          validate = v.safeParse(schema, +action_detail_group383de?.vault_path);
        }
        else{
          validate = v.safeParse(schema, action_detail_group383de?.vault_path);
        }
    if(!validate.success){
      setError(validate?.issues[0]?.message);
      setValidate((pre:any)=>({...pre,addCredentialRef_v1:{...pre?.addCredentialRef_v1,vault_path:"invalid"}}));
    }else{
      setError('');
      setValidate((pre:any)=>({...pre,addCredentialRef_v1:{...pre?.addCredentialRef_v1,vault_path:undefined}}));
    }
    }
    if(!validate?.success){
      return
    }
  }
  const handleBlur=async (e?:any) => {
      let validate:any
      if(action_detail_group383de?.vault_path == "" || action_detail_group383de?.vault_path == undefined){
      action_detail_group383de.vault_path = "";
     if(dynamicStateandType.type=="number"){
          validate = v.safeParse(schema, NaN);
        }
        else{
          validate = v.safeParse(schema, action_detail_group383de?.vault_path);
        }
        if(!validate.success){
          setError(validate?.issues[0]?.message);
          setValidate((pre:any)=>({...pre,addCredentialRef_v1:{...pre?.addCredentialRef_v1,vault_path:"invalid"}}));
        }
    }else if(action_detail_group383de?.vault_path !== ""){
   if(dynamicStateandType.type=="number"){
          validate = v.safeParse(schema, +action_detail_group383de?.vault_path);
        }
        else{
          validate = v.safeParse(schema, action_detail_group383de?.vault_path);
        }
    if(!validate.success){
      setError(validate?.issues[0]?.message);
      setValidate((pre:any)=>({...pre,addCredentialRef_v1:{...pre?.addCredentialRef_v1,vault_path:"invalid"}}));
    }else{
      setError('');
      setValidate((pre:any)=>({...pre,addCredentialRef_v1:{...pre?.addCredentialRef_v1,vault_path:undefined}}));
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
        "a95baa59e6c98d0cf1ca8ba6d79383de",
        "f917145fc1e66c390ce09f1b9d79e7b6"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:addCredentialRef:AFVK:v1",
      //     componentId: "a95baa59e6c98d0cf1ca8ba6d79383de",
      //     controlId: "f917145fc1e66c390ce09f1b9d79e7b6",
      //     isTable: false,
      //     from:"TextInputvault_path",
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
        setDynamicStateandType({name:'vault_path', type: 'number'});
      }
      // if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      // if(orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties){
      //   let type:any={name:'vault_path',type:'text'};
      //   type={
      //     name:'vault_path',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.vault_path.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.vault_path.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.vault_path.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
      //   if(orchestrationData?.data?.schemaData?.at(0)?.schema.properties){
      //   let type:any={name:'vault_path',type:'text'};
      //   type={
      //     name:'vault_path',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.properties.vault_path.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.vault_path.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.vault_path.type
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
  const action_detail_group383deRef = useRef<any>(action_detail_group383de);
  useEffect(() => { action_detail_group383deRef.current = action_detail_group383de; }, [action_detail_group383de]);
  useEffect(()=>{
      handleMapperValue();
      if(!action_detail_group383de?.vault_path)
      {
        setaction_detail_group383deProps((pre:any)=>({...pre,required:true}));
        setIsRequredData(true);
      }
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "f917145fc1e66c390ce09f1b9d79e7b6") {
        handleChange({target:{value:action_detail_group383deRef?.current?.vault_path||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "f917145fc1e66c390ce09f1b9d79e7b6") {
        handleBlur({target:{value:action_detail_group383deRef?.current?.vault_path||""}});
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
  if(dfd_credentialref_v1Props?.setSearchFilters && dfd_credentialref_v1Props?.data)
  {
    if(Array.isArray(dfd_credentialref_v1Props.data) && dfd_credentialref_v1Props.data.length > 0){
      setaction_detail_group383de((pre:any)=>({...pre,vault_path:dfd_credentialref_v1Props.data[0]?.vault_path}));
    }
  }
  },[dfd_credentialref_v1Props?.setSearchFilters])
  if (vault_path9e7b6?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `13 / 25`,gridRow: `9 / 21`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className=""
        label={keyset("")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={false}
        type={dynamicStateandType.type}
        value={action_detail_group383de?.vault_path||""}
         disabled= {vault_path9e7b6?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='type here....'      
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="Vault Path"
      errorMessage={error}
        validationState={validate?.addCredentialRef_v1?.vault_path ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputvault_path
