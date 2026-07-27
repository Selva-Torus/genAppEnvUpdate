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
import { getCookie } from '@/app/components/cookieMgment';
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

const TextInputrevoked_by = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
  const token: string = getCookie('token');
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
        "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:addAccessRequestModify:AFVK:v1|21d269e30ee840848c3f8d33112a6ffd|properties.revoked_by"
      ],
      "targetKey": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:viewAccessRequest:AFVK:v1|014b84d6884d2b1d1ff85b64e4bbee08|5cc3d0046e0588a0bf62d5bf6b1fe056"
    }
  ],
  "dfdKey": "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:addAccessRequestModify:AFVK:v1:",
  "schemaData": {
    "type": "null"
  },
  "dataType": "null"
}
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_addaccessrequestmodify_v1Props, setdfd_addaccessrequestmodify_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  const toast : Function = useInfoMsg()
  const keyset : Function = i18n.keyset("language");
  const [allCode,setAllCode]=useState<string>("");
  let schemaArray :string[] =[];
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'revoked_by',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {new_access_group99475, setnew_access_group99475}= useContext(TotalContext) as TotalContextProps;
  const {new_access_group99475Props, setnew_access_group99475Props}= useContext(TotalContext) as TotalContextProps;
  const {access_req__group580cf, setaccess_req__group580cf}= useContext(TotalContext) as TotalContextProps;
  const {access_req__group580cfProps, setaccess_req__group580cfProps}= useContext(TotalContext) as TotalContextProps;
  const {business_just__group2c68d, setbusiness_just__group2c68d}= useContext(TotalContext) as TotalContextProps;
  const {business_just__group2c68dProps, setbusiness_just__group2c68dProps}= useContext(TotalContext) as TotalContextProps;
  const {valid_group6c83b, setvalid_group6c83b}= useContext(TotalContext) as TotalContextProps;
  const {valid_group6c83bProps, setvalid_group6c83bProps}= useContext(TotalContext) as TotalContextProps;
  const {app_inf_group5ad5c, setapp_inf_group5ad5c}= useContext(TotalContext) as TotalContextProps;
  const {app_inf_group5ad5cProps, setapp_inf_group5ad5cProps}= useContext(TotalContext) as TotalContextProps;
  const {provision_groupe166a, setprovision_groupe166a}= useContext(TotalContext) as TotalContextProps;
  const {provision_groupe166aProps, setprovision_groupe166aProps}= useContext(TotalContext) as TotalContextProps;
  const {prov_groupce05f, setprov_groupce05f}= useContext(TotalContext) as TotalContextProps;
  const {prov_groupce05fProps, setprov_groupce05fProps}= useContext(TotalContext) as TotalContextProps;
  const {revocation_groupbee08, setrevocation_groupbee08}= useContext(TotalContext) as TotalContextProps;
  const {revocation_groupbee08Props, setrevocation_groupbee08Props}= useContext(TotalContext) as TotalContextProps;
  const {rev_group1cf92, setrev_group1cf92}= useContext(TotalContext) as TotalContextProps;
  const {rev_group1cf92Props, setrev_group1cf92Props}= useContext(TotalContext) as TotalContextProps;
  const {revoked_byfe056, setrevoked_byfe056}= useContext(TotalContext) as TotalContextProps;
  const {revok_atdf48b, setrevok_atdf48b}= useContext(TotalContext) as TotalContextProps;
  const {revoked_reason86407, setrevoked_reason86407}= useContext(TotalContext) as TotalContextProps;
  const {audit_groupdea6a, setaudit_groupdea6a}= useContext(TotalContext) as TotalContextProps;
  const {audit_groupdea6aProps, setaudit_groupdea6aProps}= useContext(TotalContext) as TotalContextProps;
  

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
      setValidate((pre:any)=>({...pre,viewAccessRequest_v1:{...pre?.viewAccessRequest_v1,revoked_by:undefined}}));
    if(dynamicStateandType.type=="number"){
    setrevocation_groupbee08((prev: any) => ({ ...prev, revoked_by: +e.target.value }));
    }
    else{
    setrevocation_groupbee08((prev: any) => ({ ...prev, revoked_by: e.target.value }));
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['new_access_group'] = new_access_group99475,
        codeStates['setnew_access_group'] = setnew_access_group99475,
        codeStates['new_access_group99475'] = new_access_group99475Props,
        codeStates['setnew_access_group99475'] = setnew_access_group99475Props,
        codeStates['access_req__group'] = access_req__group580cf,
        codeStates['setaccess_req__group'] = setaccess_req__group580cf,
        codeStates['access_req__group580cf'] = access_req__group580cfProps,
        codeStates['setaccess_req__group580cf'] = setaccess_req__group580cfProps,
        codeStates['business_just__group'] = business_just__group2c68d,
        codeStates['setbusiness_just__group'] = setbusiness_just__group2c68d,
        codeStates['business_just__group2c68d'] = business_just__group2c68dProps,
        codeStates['setbusiness_just__group2c68d'] = setbusiness_just__group2c68dProps,
        codeStates['valid_group'] = valid_group6c83b,
        codeStates['setvalid_group'] = setvalid_group6c83b,
        codeStates['valid_group6c83b'] = valid_group6c83bProps,
        codeStates['setvalid_group6c83b'] = setvalid_group6c83bProps,
        codeStates['app_inf_group'] = app_inf_group5ad5c,
        codeStates['setapp_inf_group'] = setapp_inf_group5ad5c,
        codeStates['app_inf_group5ad5c'] = app_inf_group5ad5cProps,
        codeStates['setapp_inf_group5ad5c'] = setapp_inf_group5ad5cProps,
        codeStates['provision_group'] = provision_groupe166a,
        codeStates['setprovision_group'] = setprovision_groupe166a,
        codeStates['provision_groupe166a'] = provision_groupe166aProps,
        codeStates['setprovision_groupe166a'] = setprovision_groupe166aProps,
        codeStates['prov_group'] = prov_groupce05f,
        codeStates['setprov_group'] = setprov_groupce05f,
        codeStates['prov_groupce05f'] = prov_groupce05fProps,
        codeStates['setprov_groupce05f'] = setprov_groupce05fProps,
        codeStates['revocation_group'] = revocation_groupbee08,
        codeStates['setrevocation_group'] = setrevocation_groupbee08,
        codeStates['revocation_groupbee08'] = revocation_groupbee08Props,
        codeStates['setrevocation_groupbee08'] = setrevocation_groupbee08Props,
        codeStates['rev_group'] = rev_group1cf92,
        codeStates['setrev_group'] = setrev_group1cf92,
        codeStates['rev_group1cf92'] = rev_group1cf92Props,
        codeStates['setrev_group1cf92'] = setrev_group1cf92Props,
        codeStates['revoked_by'] = revoked_byfe056,
        codeStates['setrevoked_by'] = setrevoked_byfe056,
        codeStates['revok_at'] = revok_atdf48b,
        codeStates['setrevok_at'] = setrevok_atdf48b,
        codeStates['revoked_reason'] = revoked_reason86407,
        codeStates['setrevoked_reason'] = setrevoked_reason86407,
        codeStates['audit_group'] = audit_groupdea6a,
        codeStates['setaudit_group'] = setaudit_groupdea6a,
        codeStates['audit_groupdea6a'] = audit_groupdea6aProps,
        codeStates['setaudit_groupdea6a'] = setaudit_groupdea6aProps,
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
        "014b84d6884d2b1d1ff85b64e4bbee08",
        "5cc3d0046e0588a0bf62d5bf6b1fe056"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:viewAccessRequest:AFVK:v1",
      //     componentId: "014b84d6884d2b1d1ff85b64e4bbee08",
      //     controlId: "5cc3d0046e0588a0bf62d5bf6b1fe056",
      //     isTable: false,
      //     from:"TextInputrevoked_by",
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
        setDynamicStateandType({name:'revoked_by', type: 'number'});
      }
      // if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      // if(orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties){
      //   let type:any={name:'revoked_by',type:'text'};
      //   type={
      //     name:'revoked_by',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.revoked_by.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.revoked_by.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.revoked_by.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
      //   if(orchestrationData?.data?.schemaData?.at(0)?.schema.properties){
      //   let type:any={name:'revoked_by',type:'text'};
      //   type={
      //     name:'revoked_by',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.properties.revoked_by.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.revoked_by.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.revoked_by.type
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
  const revocation_groupbee08Ref = useRef<any>(revocation_groupbee08);
  useEffect(() => { revocation_groupbee08Ref.current = revocation_groupbee08; }, [revocation_groupbee08]);
  useEffect(()=>{
      handleMapperValue();
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "5cc3d0046e0588a0bf62d5bf6b1fe056") {
        handleChange({target:{value:revocation_groupbee08Ref?.current?.revoked_by||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "5cc3d0046e0588a0bf62d5bf6b1fe056") {
        handleBlur({target:{value:revocation_groupbee08Ref?.current?.revoked_by||""}});
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
  if(dfd_addaccessrequestmodify_v1Props?.setSearchFilters && dfd_addaccessrequestmodify_v1Props?.data)
  {
    if(Array.isArray(dfd_addaccessrequestmodify_v1Props.data) && dfd_addaccessrequestmodify_v1Props.data.length > 0){
      setrevocation_groupbee08((pre:any)=>({...pre,revoked_by:dfd_addaccessrequestmodify_v1Props.data[0]?.revoked_by}));
    }
  }
  },[dfd_addaccessrequestmodify_v1Props?.setSearchFilters])
  if (revoked_byfe056?.isHidden) {
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
        value={revocation_groupbee08?.revoked_by||""}
         disabled= {revoked_byfe056?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='--'      
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="Revoked By"
      errorMessage={error}
        validationState={validate?.viewAccessRequest_v1?.revoked_by ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputrevoked_by
