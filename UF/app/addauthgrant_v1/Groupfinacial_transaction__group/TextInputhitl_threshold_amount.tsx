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

const TextInputhitl_threshold_amount = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
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
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:authorityGrant:AFVK:v1|afb5b154f0054e88ac5cf9a8e577864d|properties.hitl_threshold_amount"
      ],
      "targetKey": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:addAuthGrant:AFVK:v1|00962534e6d0a589bc83577cad56585c|f26f404a12104abf982955978b8c7af3"
    }
  ],
  "dfdKey": "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:authorityGrant:AFVK:v1:",
  "schemaData": {
    "type": "integer"
  },
  "dataType": "integer"
}
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_authoritygrant_v1Props, setdfd_authoritygrant_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  const toast : Function = useInfoMsg()
  const keyset : Function = i18n.keyset("language");
  const [allCode,setAllCode]=useState<string>("");
  let schemaArray :string[] =[];
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'hitl_threshold_amount',type:"number"})
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
  const {finacial_transaction__group6585c, setfinacial_transaction__group6585c}= useContext(TotalContext) as TotalContextProps;
  const {finacial_transaction__group6585cProps, setfinacial_transaction__group6585cProps}= useContext(TotalContext) as TotalContextProps;
  const {financial_transaction__text80fed, setfinancial_transaction__text80fed}= useContext(TotalContext) as TotalContextProps;
  const {max_amount_per_txndf14b, setmax_amount_per_txndf14b}= useContext(TotalContext) as TotalContextProps;
  const {currency7f91e, setcurrency7f91e}= useContext(TotalContext) as TotalContextProps;
  const {daily_amount_limit2e0d0, setdaily_amount_limit2e0d0}= useContext(TotalContext) as TotalContextProps;
  const {max_txn_per_daya7f5c, setmax_txn_per_daya7f5c}= useContext(TotalContext) as TotalContextProps;
  const {hitl_threshold_amountc7af3, sethitl_threshold_amountc7af3}= useContext(TotalContext) as TotalContextProps;
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
      setValidate((pre:any)=>({...pre,addAuthGrant_v1:{...pre?.addAuthGrant_v1,hitl_threshold_amount:undefined}}));
    if(dynamicStateandType.type=="number"){
    setfinacial_transaction__group6585c((prev: any) => ({ ...prev, hitl_threshold_amount: +e.target.value }));
    }
    else{
    setfinacial_transaction__group6585c((prev: any) => ({ ...prev, hitl_threshold_amount: e.target.value }));
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
        codeStates['finacial_transaction__group'] = finacial_transaction__group6585c,
        codeStates['setfinacial_transaction__group'] = setfinacial_transaction__group6585c,
        codeStates['finacial_transaction__group6585c'] = finacial_transaction__group6585cProps,
        codeStates['setfinacial_transaction__group6585c'] = setfinacial_transaction__group6585cProps,
        codeStates['financial_transaction__text'] = financial_transaction__text80fed,
        codeStates['setfinancial_transaction__text'] = setfinancial_transaction__text80fed,
        codeStates['max_amount_per_txn'] = max_amount_per_txndf14b,
        codeStates['setmax_amount_per_txn'] = setmax_amount_per_txndf14b,
        codeStates['currency'] = currency7f91e,
        codeStates['setcurrency'] = setcurrency7f91e,
        codeStates['daily_amount_limit'] = daily_amount_limit2e0d0,
        codeStates['setdaily_amount_limit'] = setdaily_amount_limit2e0d0,
        codeStates['max_txn_per_day'] = max_txn_per_daya7f5c,
        codeStates['setmax_txn_per_day'] = setmax_txn_per_daya7f5c,
        codeStates['hitl_threshold_amount'] = hitl_threshold_amountc7af3,
        codeStates['sethitl_threshold_amount'] = sethitl_threshold_amountc7af3,
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
        "00962534e6d0a589bc83577cad56585c",
        "f26f404a12104abf982955978b8c7af3"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:addAuthGrant:AFVK:v1",
      //     componentId: "00962534e6d0a589bc83577cad56585c",
      //     controlId: "f26f404a12104abf982955978b8c7af3",
      //     isTable: false,
      //     from:"TextInputhitl_threshold_amount",
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
        setDynamicStateandType({name:'hitl_threshold_amount', type: 'number'});
      }
      // if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      // if(orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties){
      //   let type:any={name:'hitl_threshold_amount',type:'text'};
      //   type={
      //     name:'hitl_threshold_amount',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.hitl_threshold_amount.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.hitl_threshold_amount.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.hitl_threshold_amount.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
      //   if(orchestrationData?.data?.schemaData?.at(0)?.schema.properties){
      //   let type:any={name:'hitl_threshold_amount',type:'text'};
      //   type={
      //     name:'hitl_threshold_amount',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.properties.hitl_threshold_amount.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.hitl_threshold_amount.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.hitl_threshold_amount.type
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
  const finacial_transaction__group6585cRef = useRef<any>(finacial_transaction__group6585c);
  useEffect(() => { finacial_transaction__group6585cRef.current = finacial_transaction__group6585c; }, [finacial_transaction__group6585c]);
  useEffect(()=>{
      handleMapperValue();
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "f26f404a12104abf982955978b8c7af3") {
        handleChange({target:{value:finacial_transaction__group6585cRef?.current?.hitl_threshold_amount||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "f26f404a12104abf982955978b8c7af3") {
        handleBlur({target:{value:finacial_transaction__group6585cRef?.current?.hitl_threshold_amount||""}});
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
      setfinacial_transaction__group6585c((pre:any)=>({...pre,hitl_threshold_amount:dfd_authoritygrant_v1Props.data[0]?.hitl_threshold_amount}));
    }
  }
  },[dfd_authoritygrant_v1Props?.setSearchFilters])
  if (hitl_threshold_amountc7af3?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `1 / 25`,gridRow: `35 / 47`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className=""
        label={keyset("")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={false}
        type={dynamicStateandType.type}
        value={finacial_transaction__group6585c?.hitl_threshold_amount||""}
         disabled= {hitl_threshold_amountc7af3?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='type here....'      
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="HITL Threshold Amount"
      errorMessage={error}
        validationState={validate?.addAuthGrant_v1?.hitl_threshold_amount ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputhitl_threshold_amount
