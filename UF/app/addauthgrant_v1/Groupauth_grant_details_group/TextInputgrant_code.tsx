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

const TextInputgrant_code = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
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
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:authorityGrant:AFVK:v1|afb5b154f0054e88ac5cf9a8e577864d|properties.grant_code"
      ],
      "targetKey": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:addAuthGrant:AFVK:v1|7ab9188e5f3a6b4b600fa714fc4d026c|9af44b205b862e29582d11efcc315931"
    }
  ],
  "dfdKey": "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:authorityGrant:AFVK:v1:",
  "schemaData": {
    "type": "string"
  },
  "dataType": "string"
}
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_authoritygrant_v1Props, setdfd_authoritygrant_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  const toast : Function = useInfoMsg()
  const keyset : Function = i18n.keyset("language");
  const [allCode,setAllCode]=useState<string>("");
  let schemaArray :string[] =[];
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'grant_code',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {overall_auth_grant_grpba23f, setoverall_auth_grant_grpba23f}= useContext(TotalContext) as TotalContextProps;
  const {overall_auth_grant_grpba23fProps, setoverall_auth_grant_grpba23fProps}= useContext(TotalContext) as TotalContextProps;
  const {revocat_info_group2037f, setrevocat_info_group2037f}= useContext(TotalContext) as TotalContextProps;
  const {revocat_info_group2037fProps, setrevocat_info_group2037fProps}= useContext(TotalContext) as TotalContextProps;
  const {auth_grant_details_groupd026c, setauth_grant_details_groupd026c}= useContext(TotalContext) as TotalContextProps;
  const {auth_grant_details_groupd026cProps, setauth_grant_details_groupd026cProps}= useContext(TotalContext) as TotalContextProps;
  const {auth_grant_details_textc2e1d, setauth_grant_details_textc2e1d}= useContext(TotalContext) as TotalContextProps;
  const {asset_name50a66, setasset_name50a66}= useContext(TotalContext) as TotalContextProps;
  const {grant_code15931, setgrant_code15931}= useContext(TotalContext) as TotalContextProps;
  const {delegator_user_id7e51a, setdelegator_user_id7e51a}= useContext(TotalContext) as TotalContextProps;
  const {action_type313d6, setaction_type313d6}= useContext(TotalContext) as TotalContextProps;
  const {resource_scope139d4, setresource_scope139d4}= useContext(TotalContext) as TotalContextProps;
  const {finacial_transaction__group6585c, setfinacial_transaction__group6585c}= useContext(TotalContext) as TotalContextProps;
  const {finacial_transaction__group6585cProps, setfinacial_transaction__group6585cProps}= useContext(TotalContext) as TotalContextProps;
  const {condition_validity_group3e45f, setcondition_validity_group3e45f}= useContext(TotalContext) as TotalContextProps;
  const {condition_validity_group3e45fProps, setcondition_validity_group3e45fProps}= useContext(TotalContext) as TotalContextProps;
  const {certification_group91bfd, setcertification_group91bfd}= useContext(TotalContext) as TotalContextProps;
  const {certification_group91bfdProps, setcertification_group91bfdProps}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions401a9, setdynamicactions401a9}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions401a9Props, setdynamicactions401a9Props}= useContext(TotalContext) as TotalContextProps;
  

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
      setValidate((pre:any)=>({...pre,addAuthGrant_v1:{...pre?.addAuthGrant_v1,grant_code:undefined}}));
    if(dynamicStateandType.type=="number"){
    setauth_grant_details_groupd026c((prev: any) => ({ ...prev, grant_code: +e.target.value }));
    }
    else{
    setauth_grant_details_groupd026c((prev: any) => ({ ...prev, grant_code: e.target.value }));
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['overall_auth_grant_grp'] = overall_auth_grant_grpba23f,
        codeStates['setoverall_auth_grant_grp'] = setoverall_auth_grant_grpba23f,
        codeStates['overall_auth_grant_grpba23f'] = overall_auth_grant_grpba23fProps,
        codeStates['setoverall_auth_grant_grpba23f'] = setoverall_auth_grant_grpba23fProps,
        codeStates['revocat_info_group'] = revocat_info_group2037f,
        codeStates['setrevocat_info_group'] = setrevocat_info_group2037f,
        codeStates['revocat_info_group2037f'] = revocat_info_group2037fProps,
        codeStates['setrevocat_info_group2037f'] = setrevocat_info_group2037fProps,
        codeStates['auth_grant_details_group'] = auth_grant_details_groupd026c,
        codeStates['setauth_grant_details_group'] = setauth_grant_details_groupd026c,
        codeStates['auth_grant_details_groupd026c'] = auth_grant_details_groupd026cProps,
        codeStates['setauth_grant_details_groupd026c'] = setauth_grant_details_groupd026cProps,
        codeStates['auth_grant_details_text'] = auth_grant_details_textc2e1d,
        codeStates['setauth_grant_details_text'] = setauth_grant_details_textc2e1d,
        codeStates['asset_name'] = asset_name50a66,
        codeStates['setasset_name'] = setasset_name50a66,
        codeStates['grant_code'] = grant_code15931,
        codeStates['setgrant_code'] = setgrant_code15931,
        codeStates['delegator_user_id'] = delegator_user_id7e51a,
        codeStates['setdelegator_user_id'] = setdelegator_user_id7e51a,
        codeStates['action_type'] = action_type313d6,
        codeStates['setaction_type'] = setaction_type313d6,
        codeStates['resource_scope'] = resource_scope139d4,
        codeStates['setresource_scope'] = setresource_scope139d4,
        codeStates['finacial_transaction__group'] = finacial_transaction__group6585c,
        codeStates['setfinacial_transaction__group'] = setfinacial_transaction__group6585c,
        codeStates['finacial_transaction__group6585c'] = finacial_transaction__group6585cProps,
        codeStates['setfinacial_transaction__group6585c'] = setfinacial_transaction__group6585cProps,
        codeStates['condition_validity_group'] = condition_validity_group3e45f,
        codeStates['setcondition_validity_group'] = setcondition_validity_group3e45f,
        codeStates['condition_validity_group3e45f'] = condition_validity_group3e45fProps,
        codeStates['setcondition_validity_group3e45f'] = setcondition_validity_group3e45fProps,
        codeStates['certification_group'] = certification_group91bfd,
        codeStates['setcertification_group'] = setcertification_group91bfd,
        codeStates['certification_group91bfd'] = certification_group91bfdProps,
        codeStates['setcertification_group91bfd'] = setcertification_group91bfdProps,
        codeStates['dynamicactions'] = dynamicactions401a9,
        codeStates['setdynamicactions'] = setdynamicactions401a9,
        codeStates['dynamicactions401a9'] = dynamicactions401a9Props,
        codeStates['setdynamicactions401a9'] = setdynamicactions401a9Props,
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
        "7ab9188e5f3a6b4b600fa714fc4d026c",
        "9af44b205b862e29582d11efcc315931"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:addAuthGrant:AFVK:v1",
      //     componentId: "7ab9188e5f3a6b4b600fa714fc4d026c",
      //     controlId: "9af44b205b862e29582d11efcc315931",
      //     isTable: false,
      //     from:"TextInputgrant_code",
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
        setDynamicStateandType({name:'grant_code', type: 'number'});
      }
      // if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      // if(orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties){
      //   let type:any={name:'grant_code',type:'text'};
      //   type={
      //     name:'grant_code',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.grant_code.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.grant_code.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.grant_code.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
      //   if(orchestrationData?.data?.schemaData?.at(0)?.schema.properties){
      //   let type:any={name:'grant_code',type:'text'};
      //   type={
      //     name:'grant_code',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.properties.grant_code.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.grant_code.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.grant_code.type
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
  const auth_grant_details_groupd026cRef = useRef<any>(auth_grant_details_groupd026c);
  useEffect(() => { auth_grant_details_groupd026cRef.current = auth_grant_details_groupd026c; }, [auth_grant_details_groupd026c]);
  useEffect(()=>{
      handleMapperValue();
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "9af44b205b862e29582d11efcc315931") {
        handleChange({target:{value:auth_grant_details_groupd026cRef?.current?.grant_code||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "9af44b205b862e29582d11efcc315931") {
        handleBlur({target:{value:auth_grant_details_groupd026cRef?.current?.grant_code||""}});
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
  if(dfd_authoritygrant_v1Props?.setSearchFilters && dfd_authoritygrant_v1Props?.data)
  {
    if(Array.isArray(dfd_authoritygrant_v1Props.data) && dfd_authoritygrant_v1Props.data.length > 0){
      setauth_grant_details_groupd026c((pre:any)=>({...pre,grant_code:dfd_authoritygrant_v1Props.data[0]?.grant_code}));
    }
  }
  },[dfd_authoritygrant_v1Props?.setSearchFilters])
  if (grant_code15931?.isHidden) {
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
        value={auth_grant_details_groupd026c?.grant_code||""}
         disabled= {grant_code15931?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='type here....'      
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="Grant Code"
      errorMessage={error}
        validationState={validate?.addAuthGrant_v1?.grant_code ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputgrant_code
